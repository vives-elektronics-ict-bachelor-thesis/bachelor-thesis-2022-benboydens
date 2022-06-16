# Test Starwind vSAN

Starwind vSAN is een bekende speler op de markt van Hyper Converged Infrastructure. Hun oplossing voor vSAN zou ideaal zijn voor Dataline aangezien we geen dure VMWare lisenties nodig hebben. Maar de vraag is natuurlijk hoe goed is Starwind vSAN. Als we kijken naar de reviews dan zien we dat vele bedrijven tevreden zijn met Starwind vSAN. Om dit zeker te zijn maken we een test opstelling, hier testen we dan de performance en kwaliteit van starwind vSAN. 


## Opstelling

Als opstelling gebruiken we 2 gebruikte desktop computers die Dataline nog liggen had. Die breiden we dan uit met een gloed nieuwe snelle netwerkkaart met 2 poorten (25 Gbps) en een 250 GB SSD.

Starwind heeft een 30 day free trial waarmee we een 2 node setup kunnen testen. Twee nodes is het absolute minimum dat nodig is om een vSAN te gebruiken. De setup die zal gevolgd worden is de volgende.

![2 node setup](./img/starwind-virtual-san-for-vsphere.png)

In totaal zullen er 3 NIC's of netwerkkaarten nodig zijn. Eén wordt gebruikt voor management bedoelt als aanspreekpunt voor het beheren van de ESXi host en Virtuele machines. De andere 2 NIC's worden gebruikt om data en commando's door te geven tussen de hosts. Hiervoor gebruiken we de nieuwe snelle netwerkkaarten omdat de synchronisatie tussen de hosts best zo snel en efficient mogelijk gebeurt.



## Failover strategie

Bij het geval dat de verbinding tussen 2 nodes zou weg vallen door een netwerk problemen dan hebben we een zogenaamde netwerk partitie, dit kan leiden tot een **split brain** scenario. Dit kan zeer erge gevolgen hebben zoals het verliezen van data en het moet absoluut vermeden worden. 

**Split brain** kan zich voordoen als de actieve nodes alle verbindingen verliezen tegelijkertijd en ze niet meer kunnen communiceren met elkaar om de status van elkaar te vergelijken.

![splitbrain](./img/splitbrain.png)

In deze situatie zal elke node naar zijn eigen storage schrijven. Zo ontstaan er data inconsistenties tussen de 2 nodes waardoor ze steeds meer van elkaar gaan verschillen. Uiteindelijk gaan ze zoveel met elkaar verschillen dat de data niet meer gesynchroniseerd kan worden.

Als je dan wilt je data herstellen dan zul je een node moeten kiezen om verder op te werken. Alle wijzigingen van de andere node worden daardoor ongedaan gemaakt. Het risico van een split brain scenario moet daarom zo laag mogelijk zijn. Starwind vSAN geeft ons 2 manieren om zo'n scenario te vermijden. 

### Heartbeat

Er wordt een zogenaamde heartbeat verbinding opgesteld tussen nodes. Wanneer een node merkt dat de synchronisatie verbinding niet meer werkt tussen een partner node dan zal er een ping gestuurd worden via het heartbeat kanaal. Als de partner node antwoord dan zal Starwind de node blokkeren met een lagere prioriteit totdat de synchronisatie verbinding terugkomt.
Als de partner node niet antwoord dan gaat Starwind vSAN er vanuit dat die offline is. Starwind vSAN markeert de partner node dan als niet gesynchroniseerd. Dit is het split brain scenario die we juist willen vermijden. 

![heartbeat](./img/heartbeat.png)

Stel bijvoorbeeld dat er 2 nodes zijn zoals in de figuur en de data kan niet verzonden worden via de synchronisatie verbinding. Dan kunnen de 2 nodes niet gaan synchroniseren met elkaar. Via het heartbeat kanaal checkt de primary node de status van de 2 systemen. Het ziet dat beide systemen nog in sync zijn en zal de secundaire node blokkeren zodat het niet meer reageert op requests. De secundaire node check regelmatig de verbinding van het synchronisatie kanaal. Vanaf dat er terug verbinding is, zal het synchronisatie process terug starten en wordt de secundaire node weer actief.

#### Nadeel:

Indien alle verbindingen (heartbeat + synchronisatie) verbroken worden tussen de 2 hosts dan zal er een split brain situatie ontstaan. Starwind vSAN probeert dit probleem te minimaliseren door toe te laten dat de heartbeat verbinding over het management netwerk gaat. Starwind gaat er vanuit dat deze aanpak enkel gebruikt wordt wanneer er meerdere heartbeat verbindingen zijn.

> To summarize, this kind of strategy is mostly applicable to the systems where you have enough network links that can be used as the additional heartbeat channels and are physically separated from the primary ones. [Starwind](https://www.starwindsoftware.com/blog/whats-split-brain-and-how-to-avoid-it)

### Node majority

Een andere manier om split brain te gaan vermijden is door een **Witness node** te gaan toevoegen. Het is een gekende strategie en wordt ook door VMWare gebruikt. De witness houd informatie bij van beide nodes en wanneer de synchronisatie zou weg vallen dan zal de witness mee beslissen over welke node de primaire node is.

<img src="./img/node_majority.png" height="450" style="display: block;margin: 0 auto;"/>

Om te beslissen wie de primaire node wordt zal er een stemming gedaan worden. De node met de meeste stemmen wordt dan de primaire node. Maar elke node zal voor zichzelf stemmen waardoor en geen meerderheid zal zijn, daarom moet er een derde node zijn genaamd de witness. De witness zelf houd gewoon meta data bij en heeft dus zelf niet veel storage en resources nodig.

<img src="./img/failover_witness.png" height="450" style="display: block;margin: 0 auto;"/>

Stel we hebben bovenstaande configuratie en de synchronisatie valt weg. Dan zal de witness node die verbonden is met beide nodes, een meerderheid vormen met de node die de meest relevante data heeft (in dit voorbeeld node 1). Daardoor zal node 2 gemarkeerd worden als niet gesynchroniseerd en zal die niet meer luisteren naar requests. Het grootte voordeel van deze aanpak is dat split brain zich niet meer kan voordoen, maar je hebt wel een extra node nodig.


#### Voordelen

- Het split brain scenario is volledig uitgesloten
- Een extra heartbeat verbinding is niet nodig

#### Nadelen

- Bij 2 node setup is een derde witness node nodig
- met 3 nodes mag er maar 1 failure voorkomen



## Synchronisatie test

Om te kijken of de synchronisatie tussen de nodes gebeurt moeten we eens kijken als de wel degelijk gerepliceerd wordt over de nodes. Om dit te doen kunnen we een simpele test uitvoeren.
1. We maken een bestand aan op één node. 
2. We sluiten de vm af
3. We starten een nieuwe VM op een andere node
4. We kijken of dit bestand ook op de andere node zich bevindt

Dit lukt zonder problemen.

## Performance Test

Storage is de traagste factor van elke computer, daarom is de performance van storage zeer belangrijk voor virtuele machines. Om te kijken of Starwind vSAN een goede optie zou zijn, moeten we weten hoe efficient Starwind omgaat met storage. Een heleboel factoren hebben invloed hebben op de performance van vSAN, dus het is belangrijk om vele verschillende instellingen te testen en te kijken wat het beste optie is. 

Hoe gaan we precies de performance testen? We moeten hiervoor een workload gaan simuleren op de vSAN Datastore. We doen dit door een aantal virtuele machines aan te maken op de datastore en elke VM wat werkt te laten uitvoeren.

<img src="./img/performance_test_vsan.png" height="400" style="display: block;margin: 0 auto;"/>

<br />

Terwijl de VM's bezig zijn meten we statistieken op van de storage zoals:
- Het aantal IOPS  (Input/Output operaties per seconde)
- De bandbreedte van de data stroom (in Mib/s of Gib/s)
- Hoe snel de storage antwoord op IO requests (latency)

### Workload

De manier waarop we een workload zullen simuleren is door gebruik te maken van een Disk IO test tool genaamd **fio**. Het is een command line tool die zeer veel parameters heeft om dingen te gaan testen. De gebruikte parameters zijn gebaseerd op een artikel van Oracle over het testen van Block storage [Oracle](https://docs.oracle.com/en-us/iaas/Content/Block/References/samplefiocommandslinux.htm).

We gaan 4 soorten test gaan uitvoeren:
- Random reads
- File random reads
- Random read/writes
- Sequentiële reads

### Baseline

Eerst stellen we een baseline op waarmee we volgende testen mee zullen vergelijken. Als baseline veranderen we geen enkele opties, we laten alles op default instellingen van Starwind vSAN. Eens we alle statistieken hebben verzameld en een overzicht hebben over hoe goed de performance is van de vSAN dan beginnen we met instellingen aanpassen en kijken we wat er verandert.

## Resultaten
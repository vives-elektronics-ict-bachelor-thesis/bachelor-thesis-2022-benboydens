# Test Starwind vSAN

Starwind vSAN is een bekende speler op de markt van Hyper Converged Infrastructure. Hun oplossing voor vSAN zou ideaal zijn voor Dataline aangezien we geen dure VMWare lisenties nodig hebben. Maar de vraag is natuurlijk hoe goed is Starwind vSAN. Als we kijken naar de reviews dan zien we dat vele bedrijven tevreden zijn met Starwind vSAN. Om dit zeker te zijn maken we een test opstelling, hier testen we dan de performance en kwaliteit van starwind vSAN. 

## Opstelling

Als opstelling gebruiken we 2 gebruikte desktop computers die Dataline nog liggen had. Die breiden we dan uit met een gloed nieuwe snelle netwerkkaart met 2 poorten (25 Gbps) en een 250 GB SSD.

Starwind heeft een 30 day free trial waarmee we een 2 node setup kunnen testen. Twee nodes is het absolute minimum dat nodig is om een vSAN te gebruiken. De setup die zal gevolgd worden is de volgende.

![2 node setup](./img/starwind-virtual-san-for-vsphere.png)

In totaal zullen er 3 NIC's of netwerkkaarten nodig zijn. Eén wordt gebruikt voor management bedoelt als aanspreekpunt voor het beheren van de ESXi host en Virtuele machines. De andere 2 NIC's worden gebruikt om data en commando's door te geven tussen de hosts. Hiervoor gebruiken we de nieuwe snelle netwerkkaarten omdat de synchronisatie tussen de hosts best zo snel en efficient mogelijk gebeurt.


## Failover strategie

Bij het geval dat de verbinding tussen 2 nodes zou weg vallen door een netwerk problemen dan hebben we een zogenaamde netwerk partitie, dit kan leiden tot een **split brain** scenario. Dit kan zeer erge gevolgen hebben zoals het verliezen van data en het moet absoluut vermeden worden. 

**Split brain** kan zich voordoen als de actieve nodes all hun synchronisatie en heartbeat verbindingen verliezen tegelijkertijd en ze niet meer kunnen communiceren met elkaar om de status van elkaar te vergelijken. Het kan leiden tot zware, onherstelbare fouten.

![splitbrain](./img/splitbrain.png)

In deze situatie zal elke node denken dat het de primaire node is, en zal het transacties doen die de andere nodes niet doen. Er ontstaan data inconsistenties tussen de 2 nodes waardoor ze steeds meer van elkaar gaan verschillen. Uiteindelijk gaan ze zoveel met elkaar verschillen dat ze niet meer gesynchroniseerd kunnen worden.

Als je dan wilt je data herstellen dan zul je een node moeten kiezen om verder op te werken. Alle wijzigingen van de andere node worden daardoor ongedaan gemaakt. Het risico van een split brain scenario moet daarom zo laag mogelijk zijn. Starwind vSAN geeft ons 2 manieren om zo'n scenario te vermijden. 

### Heartbeat

Er wordt een zogenaamde heartbeat verbinding opgesteld tussen nodes. Wanneer een node merkt dat de synchronisatie verbinding niet meer werkt tussen een partner node dan zal er een ping gestuurd worden via de heartbeat verbinding. Als de partner node niet antwoord dan gaat Starwind vSAN er vanuit dat die offline is. In dat geval markeert Starwind vSAN de andere node als niet gesynchroniseerd, dit is het split brain scenario die we juist willen vermijden. Wanneer de partner node wel antwoord dan zal Starwind de nodes blokkeren met een lagere prioriteit totdat de synchronisatie verbinding terugkomt.

![heartbeat](./img/heartbeat.png)

Stel bijvoorbeeld dat er 2 nodes zijn zoals in de figuur. 

####

### Node majority

![node majority](./img/node_majority.png)

![witness](./img/failover_witness.png)

## Synchronisatie Test

## Performance Test

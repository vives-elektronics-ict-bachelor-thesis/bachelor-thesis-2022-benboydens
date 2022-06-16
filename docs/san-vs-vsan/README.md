# SAN vs vSAN



## SAN

Een SAN of een Storage Area Network is een netwerk dat specifiek gebruikt wordt om grote hoeveelheden data te gaan opslaan. Een SAN bestaat uit 3 grote delen. De **servers**, het **netwerk** en de **storage**. De servers zijn allemaal verbonden via het netwerk. Het netwerk zelf bestaat uit een aantal switches die allemaal verbonden zijn met hoge snelheid verbindingen, dit zodat de data zo snel mogelijk kan doorgegeven worden naar de servers. De storage zal de data meerdere malen gaan opslaan voor redundancy.

![img](./img/SAN-diagram.png)

### SAN Netwerk

Zoals al gezegd bestaat het SAN netwerk uit een aantal switches die verbonden worden met hoge snelheid verbindingen. Zoals je kan zien hieronder worden de switches verbonden met alles in het netwerk! Dit om te zorgen voor redundancy. Er kunnen zoveel servers en storage units gebruikt worden als je wilt.

![img2](./img/SAN-structuur.jpg)

### SAN Fiber

De verbindingen in een SAN ...

In een SAN worden speciale protocollen gebruikt voor de verbindingen tussen de apparaten en de switches. Hier worden de 2 meest gebruikte uitgelegd.

| Protocol | Beschrijving |
| :---: | :--- |
| Fibre Channel Protocol (FCP) | Dit protocol is de snelste optie en geeft verbindingen van 2 GBit/s tot 128 GBit/s. Werkt enkel op fiber verbindingen. Special netwerk kaarten zijn nodig om dit te ondersteunen. |
| Internet Small Computer System Interface (iSCSI) | Dit is een goedkoper alternatief dan FCP. Maar het is ook trager. Werkt op gewone ethernet verbindingen. |

### SAN Use Cases

Hier enkele voorbeelden van hoe een SAN wordt gebruikt in het echt:

| Use Case | Uitleg |
| :--- | :--- |
| Oracle databases | Worden veel gebruikt en hebben hoge performance + availability nodig |
| Microsoft SQL Server databases | Bevatten vaak kritische data dus hoge performance + availability nodig |
| Large virtualization deployments using VMware, KVM, or Microsoft Hyper-V | Meestal bevatten deze omgevingen vele verschillende virtuele machines. Vele verschillende Operatiing systemen en applicaties draaien op deze virtuele servers. Daarom dat het belangrijk is dat de infrasturtuur betrouwbaar is en fout tolerant. Want een enkele failure kan meerdere applicaties beïnvloeden. |
| Large virtual desktop infrastructures (VDIs) | Vele vrituele desktops kunnen lastig zijn om te beheren. Een SAN zorgt dat alle data gecentraliseerd is en makkelijker te beheren. |
| SAP or other large ERP or CRM environments | SAN architectures are ideal for enterprise resource planning and customer resource management workloads |

### Voor en nadelen

Deze manier van werken heeft een aantal voordelen.

- SAN's zijn fout tolerant en verwijderen de single point of failure. Zelf als er een server, een switch of een storage unit zou weg vallen zijn er nog andere apparaten in het netwerk die de taak kunnen overnemen.
- Deze manier is ook enorm schaalbaar omdat er gemakkelijk meer storage en servers kunnen toegevoegd worden.

De nadelen van SAN zijn:

- Een fysieke SAN aanmaken kan enorm duur zijn.
- Het is complex om te realiseren



## VSAN

Een vSAN is een alternatief voor een gewone SAN. Het is een virtuele versie van een SAN. Een vSAN abstraheert de opslag en zorgt dat applicaties en virtuele machines toegang hebben tot een virtuele datastore. Het combineert de storage van verschillende virtuele servers tot **1 algemene datastore**.

Een vSAN is dus een soort **virtueel netwerk** die gebruikt wordt om de storage af te handelen. Het voordeel hiervan is dat de storage door software zal worden beheert en dat we meer vrijheid en opties hebben. We kunnen bijvoorbeeld data gaan abstraheren en verdelen over verschillende harde schijven. Zo kunnen we redundancy gaan introduceren met RAID 1, 5 of 6.

Soms wil je verschillende data anders behandelen. Bijvoorbeeld als je 2 virtuele machines hebt. Stel op VM1 wil simpele RAID 1 bescherming, terwijl de data op VM2 RAID 5 bescherming nodig heeft. Op de traditionele manier zou je niet met 1 datastore kunnen werken je zou er 2 nodig hebben aangezien ze verschillende RAID methoden gebruiken.

![img3](./img/datastore-vSAN-1.png)

Maar met vSAN kun je de storage gaan abstraheren zodat je een enkele centrale datastore hebt. In die datastore wordt er dan gezorgd dat de RAID 1 en 5 bescherming geïmplementeerd worden. Dit gebeurt allemaal automatisch en je moet dit gewoon instellen.

![img4](./img/datastore-vSAN-2.png)

Er zijn een heleboel vSAN opties waaruit we kunnen kiezen. Veel gebruikte opties zijn bijvoorbeeld: **VMWare vSAN, Starwind vSAN en Microsoft Storage Spaces Direct**. Voorkeur gaat naar VMWare aangezien deze gemakkelijk te gebruiken is, maar Starwind vSAN werkt ook met ESXi. Microsoft Storage Spaces Direct (S2D) werkt dan weer met Hyper-V en Windows datacenter. We bekijken eens de verschillende opties.


## VMWare vSAN

Hier komt een heleboel uitleg over hoe VMWare vSAN nu eigenlijk werkt.

### Objecten

VMWare vSAN zet files in de datastore als objecten die opgeslagen worden over de verschillende disk groups. De verschillende file van een ESXi host kun je vinden [hier](../data-storage/#esxi).

Meestal gaan we voor elke file een object gaan maken. Kleine files worden soms ook samen gevoegd tot 1 enkel object. Zoals je kan zien hieronder worden de VMX, NVRAM en logs samen gevoegd tot 1 object. VMWare noemt deze files samen het VM Home object. Deze bevat allerlei meta data van de VM.

![img5](./img/objects.png)

### Disk Groups

Disk groups is een verzamel naam voor verschillende harde schijven. Elke ESXi host kan een maximum van **5 disk groups** hebben. Elke disk group bestaat dan weer uit maximum 8 storage devices. Er zal 1 storage device gebruikt worden als cache, en de andere 7 kunnen gebruikt worden als **capacity**. De capacity bevat de eigenlijke data en de cache wordt gebruikt om READS en WRITES te versnellen.

Je hebt hier 2 opstellingen voor. **Hybrid** en **All Flash**. In een cluster kan maar 1 soort Disk Group bevatten! Het is dus niet mogelijk om een mengeling te hebben van all flash en Hybrid.

#### Hybrid

Bij een hybride oplossing word er gebruikt gemaakt van SSD's en HDD's. Als cache word er een enkele SSD gebruikt, voor capacity worden enkel HDD's gebruikt. De cache wordt als volgt verdeeld 70% ruimte word gebruikt voor READS en 30% voor WRITES.

#### All Flash

Bij een all flash oplossing word er enkel gebruikt gemaakt van SSD's. Dezelfde verdeling geld als bij een Hybride Disk Group alleen word de cache nu enkel nog maar gebruikt om te schrijven naar de capacity. De cache wordt dus enkel gebruikt voor WRITES in een all flash set up.

---

### Data placement

Hoe precies wordt de data verdeeld in een vmware vSAN? Hier zal ik even de verschillende stappen overlopen die gebeuren als er data ingelezen of geschreven wordt. 

#### Stappen:

1. VM stuurt een write naar de VMDK file
2. Die write word opgevangen door de Kernel
3. De kernel roept dan het vSAN process op om de write af te handelen
4. Het vSAN process weet waar in het netwerk de write naar toe moet en stuurt het naar de juiste ESXi host
5. Het vSAN process van de andere host stuurt de write dan naar de Disk Group van de host zelf en past die toe
6. De disk group reageert met een success of fail acknowledgement
7. Het vSAN process stuurt die acknowledgement door naar de originele host
8. Het process licht de kernel in
9. De VM krijgt de acknowledgement van de kernel wat evenwaardig is als een acknowledgement van de VMDK

![img6](./img/data-placement.png)

Waar precies het vSAN process de Reads en Writes naar toe stuurt hangt er van af. Het vSAN process zal de blocken data van de VMDK file gaan verspreiden over het netwerk. Het kan dus zijn dat er een blocken data op verschillende disk groups zitten. Het vSAN process onthoud waar alles bewaard wordt. Zodat wanneer een read of write zich voort doet het process weet naar welke host het moet sturen.

---

### Failures to tolerate

FTT of Failures To Tolerate staat voor het aantal fouten die zich mogen voordoen in een vSAN. Wanneer de FTT bijvoorbeeld gelijk is aan 1 dan wil dat zeggen dat zelf als er 1 fysieke component weg valt de virtuele machine nog steeds toegang heeft tot die component.

Hoe zou de data verspreid worden over het netwerk als we een FTT gelijk aan 1 zouden hebben? We zouden een raid 1 set up kunnen gebruiken. Dit wil zeggen dat de data gewoon 2 maal wordt opgeslagen op verschillende locaties. Dit wordt ook een **2 node setup** genoemd aangezien we slechts op 2 plekken opslaan. Voor een 2 node setup hebben ook nog een derde host nodig die de Witness zal zijn.


#### Witness

Waarom is de witness nodig? Omdat anders kan het zijn dat de 2 hosts out of sync zijn en de verschillen bij elkaar niet zien. Dan krijgen we een **split brain** situatie. In zo een situatie weet het vSAN process niet meer welke van de 2 hosts nu de correcte data bevat. Daarom moet er een derde host zijn die de verschillen bijhoud van beide om zo de beste beslissing te kunnen maken.

De witness zelf slaat geen data op van de virtuele machine maar zal enkel metadata gaan opslaan. Deze data wordt ook de **Witness Component** genoemd in een vSAN en is ongeveer 4 MB groot.


#### Schema

Op de afbeelding kun je de verschillende hosts zien en wat er precies gebeurt als de VM wil schrijven of lezen naar de VMDK file. Het is gelijkaardig met de afbeelding van data placement maar er zijn nog een paar kleine verschillen.

1. De stappen van de VM tot het vSAN process zijn identiek
2. Het vSAN process stuurt de WRITE of READ door naar **alle hosts** die de data bevatten.
3. Elke host stuurt dan een acknowledgement terug naar de host die de VM bevat
4. Pas wanneer elke host terug stuurt zal het vSAN process de acknowledgement doorgeven aan de kernel

![img7](./img/ftt.png)

---

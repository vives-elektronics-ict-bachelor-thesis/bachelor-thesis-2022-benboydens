# Huidige omgeving

In de eerste fase kijken we eens naar de huidige omgeving van Dataline. Hier wordt bekeken wat de applicaties en services zijn die nu in gebruikt zijn. We stellen een lijst op van alles die naar de cloud mag en alles die juist lokaal moet blijven.  

<!-- TODO: zet hier wat uitleg over virtuele machines en hoe er nu gebruik van wordt gemaakt. -->

## Confluence

Confluence is een content management systeem van Atlassian. Het is simpel gezegd een plek waar mensen documenten kunnen aanmaken en delen met elkaar. Het wordt door iedere werknemer gebruikt en bevat een heleboel belangrijke documenten. 

De versie die nu gebruikt wordt is de Server editie. Atlassian zelf wil afstappen van de lokale on premise omgevingen en daarom verplichten ze de gebruikers om naar de cloud over te stappen.

Er moet bekeken worden hoe Confluence zal gebracht worden naar de cloud zodat de gebruikers een transparante overgang ondervinden en dat alle huidige data veilig bewaart word. [Link](https://www.atlassian.com/migration/assess/journey-to-cloud)

### Servers

Confluence bestaat uit een enkele server. Alle servers die functioneren in Dataline zijn virtuele machines, dus de specificaties van de server zijn virtueel. Bijvoorbeeld 4 cores komt eigenlijk overeen met virtuele CPU's die toegekend zijn aan de virtuele machine.

| Server | CPU | RAM | Storage |
| :--- | :---: | :---: | :---: |
| Mail server | 4 cores | 28 GB | 256 GB |

## Active Directory

Active directory is directory service van Microsoft die gebruikt wordt om gebruikers te gaan beheren in een domein. 

Hoe wordt dit gebruikt in de context van Dataline? Wanneer een nieuwe werknemer toekomt in Dataline wordt er voor hem of haar een nieuw account aangemaakt in Active Directory. Het zorgt dat mensen toegang hebben tot applicaties en zich kunnen inloggen. 

### Servers

Er zijn 2 windows Servers die instaan voor het beheer van Active Directory in Dataline. Hier zijn er 2 van op elk kantoor van Dataline.

| Server | CPU | RAM | Storage | Locatie |
| :--- | :---: | :---: | :---: | :---: | 
| DC-1 | 2 cores | 4 GB | 32 GB | Loppem |
| DC-LIMMEN | 2 cores | 4 GB | 32 GB | Limmen (Nederland) |

## Mail server

Dataline heeft een eigen mail server en een mail filter server. De mail server is een GFI Kerio connect mail server. Dit is een mail oplossing ge voor kleinere bedrijven die niet te veel geld willen investeren voor een mail. GFI (het bedrijf die Kerio connect aanbied) heeft opties om over te schakelen naar de cloud via een partner bedrijf. 

De mail filter server wordt gebruikt om binnenkomende emails te gaan filteren. Het doet dit op basis van een aantal regels en de geschiedenis van de emails die binnen zijn gekomen. Het heeft een black list en een white list van email adressen.

### Servers

| Server | CPU | RAM | Storage |
| :--- | :---: | :---: | :---: |
| Mail server | 4 cores | 8 GB | 700 GB |
| Mail filter | 4 cores | 6 GB | 20 GB |

## Telefonie servers

De telefonie servers zijn zeer belangrijk voor Dataline. Deze worden gebruikt om contact op te nemen met de klanten en om support aan te bieden. De telefonie servers draaien zelf om virtuele machines met een gratis licentie van EXSi (VMWare). Er is een probleem met deze servers is dat een **single point of failure** is. Wanneer er iets fout loopt met de servers dan moeten deze hersteld worden. 

Dit gebeurt door te kijken naar de back ups van die servers en dan zo de server te gaan herstellen. Dit is ten eerste zeer traag en er zijn niet veel mensen in Dataline die weten hoe dit moet. Dus er moet hier zeker een oplossing gezocht worden om de storage van deze servers fout tolerant te maken.

<!-- ## File server

De file server wordt voornamelijk gebruikt in Dataline door het marketing team. Daar wordt er vaak gebruikt gemaakt van zeer grote bestanden die moeten gedeeld worden via deze server. De grote van deze server is 6,5 TB.

Er is een mogelijkheid om te server naar de cloud te doen. Dit zou de fileserver makkelijker toegankelijk maken aangezien mensen dan ook thuis toegang zouden hebben. Ook zouden we de kosten uitsparen om de server up and running te houden. Er moet zeker naar de ze optie gekeken worden.

De file server zelf is een SAMBA file share die gekoppeld wordt met LDAP. De koppeling met LDAP zorgt dat mensen zich eerst moeten inloggen met hun gebruikers account.

## Backup server

Op de back up server worden incrementele back ups genomen van de virtuele machines, databases, mail server, etc. Dit zou ook eventueel gedeeltelijk naar de cloud kunnen gebracht worden. De bandbreedte van de verbinding kan wel een probleem zijn.  -->

## Development Servers

Bij het ontwikkelen van software komen ook development servers. Op deze servers wordt software getest en gebuild. Er worden vele server gebruikt. In totaal zijn er :

- 4 development servers
- 2 staging servers
- 2 build servers

Er zijn ten slotte ook nog Git, Sonar Qube en devops servers. Al deze servers zouden lokaal moeten blijven dus ze brengen naar de cloud is geen optie. Er kan wel gekeken worden naar de storage van al deze server en hoe we dat het best aanpakken. Ongeveer hetzelfde als de telefonie servers maar deze zijn minder belangrijk.

<!-- TODO Active Directory servers hier ook zetten -->
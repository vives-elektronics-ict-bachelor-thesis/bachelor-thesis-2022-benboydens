# Huidige omgeving

In de eerste fase kijken we eens naar de huidige omgeving van Dataline. Hier wordt bekeken wat de applicaties en services zijn die nu in gebruikt zijn. We stellen een lijst op van alles die naar de cloud mag en alles die juist lokaal moet blijven.  

<!-- TODO voor elke titel een stukje zetten met software en hardware componenten zodat duidelijk is welke servers er allemaal zijn -->

## Confluence

<!-- TODO teksts van eerste stappen wat combineren hier om uit te leggen wat confluence is -->
Hier moet er gekeken worden hoe Confluence zal gebracht worden naar de cloud zodat de gebruikers een transparente overgang ondervinden en dat alle huidige data veilig bewaart word. [Link](https://www.atlassian.com/migration/assess/journey-to-cloud)

De versie die nu gebruikt wordt on premise is de Confluence server versie. Support voor deze versie wordt stopgezet in 2024 en het is niet meer mogelijk om deze versie aan te kopen.


## Mail server

Dataline heeft een eigen mail server en een mail filter server. De mail server is een GFI kerio connect mail server. Dit is een mail oplossing ge voor kleinere bedrijven die niet te veel geld willen invensteren voor een mail. GFI (het bedrijf die kerio connect aanbied) heeft opties om over te schakelen naar de cloud via een partner bedrijf. 

De mail filter server wordt gebruikt om inkommende emails te gaan filteren. Het doet dit op basis van een aantal regels en de geschiedenis van de emails die binnen zijn gekomen. Het heeft een black list en een white list van email adressen.

## Telefonie servers

De telefonie servers zijn zeer belangrijk voor Dataline. Deze worden gebruikt om contact op te nemen met de klanten en om support aan te bieden. De telefonie servers draaien zelf om virtuele machines met een gratis licentie van EXSi (VMWare). Er is een probleem met deze servers is dat een **single point of failure** is. Wanneer er iets fout loopt met de servers dan moeten deze hersteld worden. 

Dit gebeurt door te kijken naar de back ups van die servers en dan zo de server te gaan herstellen. Dit is ten eerste zeer traag en er zijn niet veel mensen in Dataline die weten hoe dit moet. Dus er moet hier zeker een oplossing gezocht worden om de storage van deze servers fout tolerant te maken.

## File server

De file server wordt voornamelijk gebruikt in Dataline door het marketing team. Daar wordt er vaak gebruikt gemaakt van zeer grote bestanden die moeten gedeeld worden via deze server. De grote van deze server is 6,5 TB.

Er is een mogelijkheid om te server naar de cloud te doen. Dit zou de fileserver makkelijker toegangkelijk maken aangezien mensen dan ook thuis toegang zouden hebben. Ook zouden we de kosten uitsparen om de server up and running te houden. Er moet zeker naar de ze optie gekeken worden.

De file server zelf is een SAMBA file share die gekoppeld wordt met LDAP. De koppeling met LDAP zorgt dat mensen zich eerst moeten inloggen met hun gebruikers account.

## Backup server

Op de back up server worden incrementele back ups genomen van de virtuele machines, databases, mail server, etc. Dit zou ook eventueel gedeeltelijk naar de cloud kunnen gebracht worden. De brandbreedte van de verbinding kan wel een probleem zijn. 

## Development Servers

Bij het ontwikkelen van software komen ook development servers. Op deze servers wordt software getest en gebuild. Er worden vele server gebruikt. In totaal zijn er :

- 4 development servers
- 2 staging servers
- 2 build servers

Er zijn ten slotte ook nog Git, Sonar Qube en devops servers. Al deze servers zouden lokaal moeten blijven dus ze brengen naar de cloud is geen optie. Er kan wel gekeken worden naar de storage van al deze server en hoe we dat het best aanpakken. Ongeveer hetzelfde als de telefonie servers maar deze zijn minder belangrijk.

<!-- TODO Active Directory servers hier ook zetten -->
# Eerste stappen

<!-- TODO: Kan je dit verwerken in het hoofdstuk huidige omgeving. -->
<!-- TODO: Je schrijfwijze hier is ook zoals een stage-verslag. Dient technisch schrijven te worden -->

Hoe beginnen we hier nu precies aan? Dit is een complexe opdracht omdat er een heleboel verschillende dingen in rekening moeten gebracht worden. Om duidelijk te maken hoe we dit gaan doen moeten we beginnen bij het begin.

## Begin

Het verhaal begint bij de opstelling van Dataline voor ik daar in stage ging. Dingen zoals Confluence, email, telefonie, backups draaien allemaal op lokale on premise servers. 

De manier dat ze te werk gingen is dat voor elke applicatie een virtuele machine wordt aangemaakt op een server. Zo is het gemakkelijk om de resources van die applicatie te gaan beheren. Je kan makkelijk CPU cores, RAM geheugen en schijf geheugen toekennen per VM.

### Confluence

Maar er was een probleem met een bepaalde applicatie. Die applicatie was Confluence. 
 Om dit aan te pakken moeten we eerst eens kijken hoe niewue gebruikers worden aangemaakt in Confluence.

## Gebruikers accounts

Wanneer een nieuwe werknemer toekomt in Dataline wordt er voor hem of haar een nieuw account aangemaakt. Dit gebeurt in de **Domain controller** van Dataline. Een domain controller kan je zien als een database van alle gebruikers.  

<!-- TODO: verplaatsen naar Confluence hoofdstuk -->
Confluence heeft een LDAP interface die kan praten met de domain controller. Wanneer je probeert in te loggen in Confluence dan zal er een verbinding gemaakt worden met de domain controller. Confluence zal je dan proberen in te loggen met de credentials die je hebt ingegeven. Indien de credentials overeen komen met de domain controller krijg je toegang en wordt je ingelogd.


### Permissies

Eenmaal de gebruiker is ingelogt heeft die toegang tot de documenten in Confluence. Maar wat kan de gebruiker allemaal zien? Dit wordt bepaalt door de permissies die toegekent zijn aan die gebruiker. Permissies worden niet toegekend per gebruiker maar per groep. De groepen worden ook weer gehaald van de domain controller. 

Om een gebruiker permissies te geven maken ze die lid van een groep. Een nieuwe gebruiker is lid van geen enkele groep en zal dus toegang hebben tot niks. Er zijn vele verschillende groepen:

- Een groep voor werknemers
- Een groep voor stage studenten
- Een groep voor IT personeel
- etc...

Handmatig wordt bepaalt tot welke groepen nieuwe werknemers behoren. 

## Overgang

Om een goede overgang van Confluence naar de Cloud te garanderen zijn er een aantal punten die moeten voldaan zijn:

- Overgang is transparant voor gebruikers
- Nieuwe gebruikers moeten makkelijk toe te voegen zijn
- Alle permissies en groupen moeten overeen komen in de cloud

De huidige manier van werken is gemakelijk omdat alles kan gebeuren op de domain controller. Als we Confluence naar de cloud zullen brengen dan zou er een manier moeten zijn om de gebruiker accounts van de domain controller te synchroniseren met die in de cloud. Gelukkige bestaat er hier al een gekende oplossing voor en dat is Microsoft Azure AD.

<!-- TODO: verwerken in Azure AD hoofdstuk -->

### Microsoft Azure AD

Microsoft Azure AD wordt gezien als de cloud versie van een domain controller. Het is mogelijk om een verbinding op te zetten van de Domain Controller naar de Cloud via Azure AD. Dit kan gratis gebeuren omdat dit inbegrepen is bij Office 365. Office 365 is een packet van Microsoft die je toegang geeft tot cloud services zoals OneDrive maar ook tot Word, PowerPoint, teams, etc.

Met Azure AD worden gebruikers en groepen automatisch gesynchroniseerd naar de cloud. De huidige manier om gebruiker aan te maken kan worden behouden en gebruikers beheren is zeer makkelijk. 

Er zijn hier nog een paar problemen mee. Om dit te doen hebben we domain controller nodig die minstens Windows Server 2016 is. Dit is nu nog niet het geval dus we zullen een nieuwe domain controller moeten aanmaken met een nieuwere versie.

Ook moeten we de groepen van Confluence eens herschikken en kijken om de huidige permissies op te kuisen. Dit is belangrijk omdat de huidige permissies complex te beheren zijn.

<!-- TODO: verwerken in Datastorage hoofdstuk -->

## Storage

Nu dat we weten wat we moeten doen om Confluence op een goede manier te gaan migreren wordt het tijd om naar de andere applicaties te kijken. Deze moeten niet per se naar de cloud maar we moeten de optie wel overwegen. Applicaties zoals de file server, back up server, mail server zouden allemaal naar de cloud kunnen. Er zijn ook applicaties die niet naar de cloud mogen zoals de telefonie servers.

Een probleem dat Dataline nu nog heeft is op het vlak van storage. De telefonie servers draaien allemaal op virtuele machines. Elke virtuele machine bestaat uit een aantal bestanden die de status van de machine voorstelt. Als beveiliging worden er back ups genomen van die bestanden. Deze aanpak heeft echter enkele nadelen:

- Er is een single point of failure in de telefonie servers. Als 1 iets kapot gaat kunnen mensen niet meer telefoneren.
- Back ups nemen is lastig
- Er zijn maar een paar mensen die weten hoe je een virtuele machine moet herstellen van een back up.

We moeten dus een manier vinden om de bestanden van de VM te beveiligen tegen wanneer er iets misloopt. Dit moet een process zijn dat automatisch gebeurt.

### SAN

Een SAN is een storage area network. Je kan het zien als een apart netwerk speciaal gemaakt om de storage op een centrale plek op te kunnen slaan. Servers communiceren dan via dit netwerk om gebruik te maken van storage.

Dit is de ideale oplossing om de virtuele machines bestendig te maken tegen fouten. De reden hiervoor is omdat we in een SAN data 2 maal kunnen opslaan. Wanneer er een fout gebeurt met de storage hebben we nog een kopie die wel werkt. Dit process kan automatisch gebeuren en er hoeft niet iemand manueel tussen te komen.

### vSAN

Een gekend alternatief voor SAN is een vSAN dit is een virtuele SAN die de storage van verschillende servers zal vitualiseren tot een enkele SAN datastore. Het werkt gelijkaardig als een SAN alleen is er geen nood om speciale apparatuur hiervoor te kopen. Er zijn verschillende opties om een vSAN te implementeren zoals VMWare vSAN en Starwind vSAN.

VMWare vSAN kan nogal duur zijn daarom dat starwind misshien beter zou zijn. Dit wordt het best eens uitgetest.

## Samengevat

Samengevat komt ons stappenplan neer op het volgende:

1. Groepen en permissies opkuisen Confluence
2. Nieuwe Domain controller aanmaken
4. Synchronisatie met de cloud installeren op nieuwe domain controller
5. Kijken om Confluence te migreren naar de cloud
6. Kijken voor storage oplossing voor telefonie servers
7. Opties vergelijken van verschillende services/applicaties
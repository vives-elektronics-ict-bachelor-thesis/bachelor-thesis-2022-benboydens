# Eerste stappen

Hoe beginnen we hier nu precies aan? Dit is een complexe opdracht omdat er een heleboel verschillende dingen in rekening moeten gebracht worden. Om duidelijk te maken hoe we dit gaan doen moeten we beginnen bij het begin.

## Begin

Het verhaal begint bij de opstelling van Dataline voor ik daar in stage ging. Dingen zoals Conluence, email, telefonie, backups draaien allemaal op lokale on premise servers. 

De manier dat ze toen te werk gingen is dat voor elke applicatie een virtuele machine wordt aangemaakt op een server. Zo is het gemakklijk om de resources van die applicatie te gaan beheren. Je kan makkelijk CPU cores, RAM geheugen en schijf geheugen toekennen per VM.

### Confluence

Maar er was een probleem met een bepaalde applicatie. Die applicatie was Confluence. Wat doet Confluence? Het is simpel gezegd een plek waar mensen documenten kunnen aanmaken en delen met elkaar. Het wordt door iedere werknemer gebruikt en bevat een heleboel belangrijke documenten. 

Confluence zelf wil afstappen van de lokale on premise omgevingen en daarom verplichten ze de gebruikers om naar de cloud over te stappen. Om dit aan te pakken moeten we eerst eens kijken hoe niewue gebruikers worden aangemaakt in Confluence.

## Gebruikers accounts

Wanneer een nieuwe werknemer toekomt in Dataline wordt er voor hem of haar een nieuw account aangemaakt. Dit gebeurt in de **Domain controller** van Dataline. Een domain controller kan je zien als een database van alle gebruikers.  

Confluence heeft een LDAP interface die kan praten met de domain controller. Wanneer je probeert in te loggen in Confluence dan zal er een verbinding gemaakt worden met de domain controller. Confluence zal je dan proberen in te loggen met de credentials die je hebt ingegeven. Indien de credentials overeen komen met de domain controller krijg je toegang en wordt je ingelogt.


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

De huidige manier om gebruikers aan te maken is een gewoonte geworden. Het is ook gemakelijk dat de domain controller wordt gezien als een single source of truth. Als we Confluence naar de cloud zullen brengen dan zou er een manier moeten zijn om de gebruiker accounts van de domain controller te synchroniseren met die in de cloud. Gelukkige bestaat er hier al een gekende oplossing voor en dat is Microsoft Azure AD.

### Microsoft Azure AD

Microsoft Azure AD wordt gezien als die cloud versie van een domain controller. Het is mogelijk om een verbinding op te zetten van de Domain Controller naar de Cloud via Azure AD. Dit kan gratis gebeuren omdat dit inbegrepen is bij Office 365. Office 365 is een packet van Microsoft die je toegang geeft tot cloud services zoals OneDrive maar ook tot Word, PowerPoint, teams, etc.

Met Azure AD worden gebruikers en groepen automatisch gesynchroniseerd naar de cloud. De huidige manier om gebruiker aan te maken kan worden behouden en gebruikers beheren is zeer makkelijk. 

Er zijn hier nog een paar problemen mee. Om dit te doen hebben we domain controller nodig die minstens Windows Server 2016 is. Dit is nu nog niet het geval dus we zullen een nieuwe domain controller moeten aanmaken met een nieuwere versie.

Ook moeten we de groepen van Confluence eens herschikken en kijken op de huidige permissies op te kuisen. Dit is belangrijk omdat de huidige permissies complex te beheren zijn.

## Samengevat

Samengevat komt dit neer op het volgende:

1. Ou-structuur Dataline aanpassen
2. Nieuwe Domain controller aanmaken
4. Synchronisatie met de cloud installeren op nieuwe domain controller
5. Zorgen dat alles correct werkt qua synchronisatie
6. Kijken voor storage oplossing voor telefonie servers
7. opties vergelijken van verschillende services/applicaties
# Huidige omgeving

Een logische eerste stap is om de huidige omgeving die Dataline nu heeft eens te gaan bekijken. Welke applicaties en services runnen er nu bij Dataline en hoe moeten die vernieuwd worden?

Een voorbeeld is **Confluence**, deze applicatie wordt door iedere werknemer gebruikt en bevat een heleboel belangrijke documenten. Confluence zelf wil afstappen van de lokale on premise omgevingen en daarom verplichten ze de gebruikers om naar de cloud te gaan. Hier moet er gekeken worden hoe Confluence zal gebracht worden naar de cloud zodat de gebruikers een transparente overgang ondervinden en dat alle huidige data veilig bewaart word. [Link](https://www.atlassian.com/migration/assess/journey-to-cloud)

Er zijn nog een heleboel andere applicaties en services die zouden kunnen verplaats worden naar de Cloud.

## Microsoft Azure

Dataline zelf heeft al een Office 365. Dat is een online cloud omgeving die allerlei services zal aanbieden. Het word gebruikt om bijvoorbeeld Office Lisencies voor word, excel en powerpoint toe te kennen aan gebruikers. Deze gebruikers worden opgeslagen in een Azure AD.

Met de huidige implemtatie hebben gebruikers dan 2 accounts:
- **Een Office 365 account in de cloud**
- **Een on premise Active Directory account**

De 2 accounts hebben aparte wachtwoorden. Dit kan ambetant zijn voor gebruikers. Ook om de huidige omgeving te brengen naar de cloud moeten deze accounts gesynchroniseerd worden. Als de accounts gesynchroniseerd zijn dan kunnen we de accounts in Azure AD gaan gebruiken om de gebruikers te auhenticeren in de cloud. We kunnen dan deze accounts gebruiken met andere applicaties die werken in de cloud.

We zullen een plan moeten bedenken om de accounts te gaan synchroniseren. Kijken wat onze opties zijn en kijken welke we zullen gaan implementeren.

## Azure AD synchronisatie

Microsoft geeft ons een heleboel mogelijkheden om dit probleem aan te pakken met een heleboel opties. Hier zullen we de stappen overlopen om tot de juiste conclusie te komen.

### Bepalen van Identity

Authenticatie in cloud is zeer belangrijk om te weten wie de applicatie gebruikt. Er zijn hier 3 grote manieren voor om dit te gaan uitvoeren.

| Identity Method | Uitleg |
| :---: | :--- |
| Password hash synchronization | De hash waarde van het wachtwoord in Active Directory zal gesynchroniseerd worden met een hash die word opgeslagen in de cloud. Zo kunnen gebruikers inloggen in de cloud met hetzelfde wachtwoord. |
| Pass-through authentication | Authenticatie gebeurt niet meer in de cloud maar on premise. De cloud maakt verbinding met de Active Directory die lokaal op het kantoor staat om te authenticeren |
| Federation | Gebruikt een aparte vertrouwde server om de authenticatie te gaan doen. Mensen authenticeren zich aan die server waardoor ze toegang hebben aan de cloud. |

### Flowchart

We kunnen onderstaande flowchart gebruiken die op de officiële Microsoft Docs staat. Deze kan ons helpen om een keuze te gaan maken. Er staan wat begrippen op die we best even uitleggen.



![Flowchart Bepalen identity](./img/azure-ad-authn-image.png)

### Inter-directory provisioning

Provisioning is het process die automatisch gebruiker account gaan aanmaken, verwijderen en up to date houden. Bijvoorbeeld als er een nieuwe werkkracht is in ons bedrijf komt worden er accounts aangemaakt in de cloud, in active directory en voor de applicaties die de gebruiker nodig heeft.

Er bestaan 3 soorten provisioning:

- **HR-driven provisioning:** Provisioning tussen HR en de cloud
- **Application provisioning:** Provisioning tussen de cloud en de applicaties
- **Directory provisioning:** Provisiong tussen de cloud en on-premise active directory

De provisioning die wij nodig hebben is Directory Provisioning aangezien we onze Active Directory willen synchroniseren met de cloud. 

Er zijn 3 opties waar tussen we kunnen kiezen bij **Directory Provisioning**.

| Optie  | Beschrijving |
| :---: | :--- |
| Microsoft Identity manager | Oorspronkelijk niet gemaakt voor hybrid AD management, beperkte functionaliteit, **NIET** aanbevolen |
| Azure AD connect sync  | Veel support en is robust, zeker een optie. Kan moeilijk zijn om te configureren en kostelijk om te onderhouden. Heeft ook een grote investering nodig op vlak van infrastructuur (sterke server nodig voor synchronisatie). **Sql server nodig voor grote deployments**. |
| Azure AD connect cloud sync | Nieuwste optie support niet alle senarios maar de meeste, zeer snel en makkelijk op te zetten. Hoge availability.  Is lightweight dus geen nood aan een sterke server voor de synchronisatie. |


#### Verschillen

De Identity manager zullen we zeker niet gebruiken. Dan ligt de keuze nog tussen de **Connect Sync** en **Connect Cloud Sync**. Hier zetten we enkele voor- en nadelen op een rij van beide.
| Feature                                       | Connect Sync | Cloud Sync |
| :-------------------------------------------: | :----: | :----: |
| Pass-through authentication (PTA) Support     |   ✔️   |   ❌   |
| Synchronize customer defined AD attributes    |   ✔️   |   ❌   |
| Support for password writeback                |   ✔️   |   ✔️   |
| Support for device or group writeback         |   ✔️   |   ❌   |
| Exchange hybrid writeback                     |   ✔️   |   ❌   |
| Azure AD Domain Services support              |   ✔️   |   ❌   |
| Multiple active agents for high availability  |   ❌   |   ✔️   |
| Lightweight agent installation model          |   ❌   |   ✔️   |

Er is niet echt een goede server om de Connect Sync server te runnen en extra features die we krijgen bij Connect Sync niet echt nodig zijn. De belangrijkste feature was password writeback en deze word ondersteunt door beide. Daarom gaat de voorkeur naar de Cloud Sync methode.

Een volledige lijst met alle verschillen tussen de 2 kun je vinden in de Microsoft Docs [hier](https://docs.microsoft.com/en-us/azure/active-directory/cloud-sync/what-is-cloud-sync#comparison-between-azure-ad-connect-and-cloud-sync)

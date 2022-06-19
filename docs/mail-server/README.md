# Mail Server

Zoals vele bedrijven heeft Dataline hun eigen mail server. Die mail server zou ook naar de cloud kunnen worden gebracht. Er moet moet gekeken worden naar wat de opties zijn. Zal dezelfde software gebruikt worden in de cloud of is het beter dat er overgestapt wordt naar een ander alternatief? Dat zijn vragen die in dit hoofdstuk beantwoord zullen worden.

<br/>

## Kerio Connect

Nu wordt er gebruikt gemaakt van een Kerio Connect server. Kerio Connect is een product van GFI software die veilige mail services en kalender diensten voor een lage prijs zal aanbieden. Lokaal op Dataline zijn er 2 servers namelijk een een lokale Kerio Connect Mail server en een Mail filter server. 

| Server | Specs |
| :--- | :--- |
| Mail server | 4 cores, 8 gb RAM, 700 gb storage |
| Mail filter | 4 cores, 6 gb RAM, 20 gb storage |

### Pricing

Het aantal licenties die nu gebruikt worden zijn in totaal 100. Er worden zo veel licenties aangekocht om te voldoen aan de huidige werknemers en de toekomstige. De prijs van een lokale Kerio Connect server is enorm goedkoop maar dit is natuurlijk zonder de onderhoudskosten van de servers. Hieronder vindt is overzicht van de pricing.

|  | Small (10-49) | Medium (50-249) | Large (>250) |
| :--- | :---: | :---: | :---: |
| Prijs per gebruiker per jaar | €32,50 | €29,50 | €26,50 |

Met 100 gebruikers en een Medium abonnement zou de prijs neer komen op een totaal van **€2950 per jaar**. Dat is niet de prijs inbegrepen van de mail filter server en de kosten om die server zelf draaiende te houden. Maar voor 100 licenties is dit wel enorm goedkoop.

<br />

## Kerio Cloud

GFI biedt ons de mogelijkheid aan om naar een gehoste omgeving over te schakelen. GFI zelf zal wel geen hosting doen, dit gebeurt via een partner bedrijf. GFI stelt hiervoor 2 bedrijven voor in de regio België/Nederland.

- [Tuxis Internet Engineering](https://kerioindecloud.nl/)
- [vBoxx](https://vboxx.eu/email)

### Tuxus Internet Engineering

Tuxus biedt ons 2 mogelijkheden om Kerio Connect in te cloud te hosten. Er is een SaaS licentie die zelf nog zou gehost moeten worden en een cloud licentie. De cloud licentie is hier de logische keuze aangezien alles inbegrepen is voor een prijs van €5,25 per gebruikers per maand.

#### Features

- Altijd up-to-date
- 25 Gbyte opslag per gebruiker inbegrepen (voor 50 gebruikers is dat 1,25TB totale opslag)
- Dagelijkse back-ups
- Advanced anti-virus, advanced anti-SPAM, Exchange Active Sync en archivering

Een abonnement voor 50 gebruikers zou komen op een prijs van **€3150 per jaar**.


### Vboxx

VBox is een andere partnerbedrijf aangeraden door GFI zelf. VBox biedt ons 3 programma's aan.

|  | Small | Big | Business |
| :--- | :---: | :---: | :---: |
| Prijs per gebruiker per maand | €5,00 | €7,50 | €6,50 |
| Opslag per gebruiker | 3GB | 10GB | 10GB |

Het small programma heeft enorm weinig Storage. Het komt neer voor 50 gebruikers krijgen 150 GB opslag. Aangezien de mail server nu 700GB opslag heeft wil zeggen dat Dataline hier niet gaat mee toekomen.

#### Features

- Daily Back-ups
- SSL Beveiligd
- Spam Filter
- Anti-Virus

Voor een small programma voor 50 gebruikers zou het neer komen op **€3000 per jaar**. Een Business programma voor 50 gebruikers zou neer komen op **€3900 per jaar**. 

### Migratie

Aangezien deze opties ook gebruik maken van Kerio Connect zal de migratie makkelijker zijn en zullen alle mails, agenda en contacten ook gemigreerd worden. Kerio connect heeft een migration service om dit automatisch te gaan doen. [Hier](https://manuals.gfi.com/en/kerio/connect/content/server-configuration/export-and-migration/kerio-connect-migration-service-1896.html) kun je meer info vinden hier omtrent.

**Welke data wordt gemigreerd?**

- Alle mailboxes gemaakt in Kerio Connect
- Alle emails, kalenders, contacten, taken, en notes
- Alle users email filters in Kerio Connect Client
- Public folders (calendars, contacts, tasks, en notes)

**Welke data wordt NIET gemigreerd?**

- Passwords
- Aliases
- Resources
- Mailing lists
- Server settings

**Wachtwoorden worden niet gemigreerd** en dat wil dus zeggen dat gebruikers een nieuw wachtwoord krijgen voor in de cloud! Er zal een CSV bestand gemaakt worden tijdens de migratie met alle wachtwoorden in.

## Microsoft Office

Dataline heeft al een een Office 365. Om de mailbox te activeren moet dan via Office 365 een licentie toegekend worden aan alle gebruikers die nood hebben aan een mailbox. Dit zou een goede oplossing kunnen zijn.

### Pricing

|  | Prijs gebruiker/maand |
| :--- | :---: |
| Microsoft 365 Business Basic | €5,10 |
| Microsoft 365-apps voor bedrijven | €8,80 |
| Microsoft 365 Business Standard | €10,50 |
| Microsoft 365 Business Premium | €18,90 |

<!-- Het verschil in features is het volgende. Alle verschillen kun je [hier](https://www.microsoft.com/nl-be/microsoft-365/business/compare-all-microsoft-365-business-products?&activetab=tab:primaryr2#coreui-contentrichblock-lni8j9r) vinden. -->

Jammer genoeg heeft Microsoft niet echt een abonnement die enkel email bevat dus moeten alle extra features er ook bij genomen worden. Aangezien **Basic** het goedkoopste is en ons toegang heeft tot een mailbox van **50 GB per gebruiker** is dit de beste optie.

Voor 50 gebruikers zou ons dat **€3060 per jaar** kosten. Dit is voorlopig de beste prijs kwaliteit cloud oplossing aangezien er een heleboel features bijkomen.

### Migratie

Aan de hand van een **IMAP migratie** kunnen de mailboxen overgezet worden naar Microsoft Outlook. Andere zaken zoals kalenders en contacten worden niet mee gemigreerd. [Hier](https://docs.microsoft.com/en-us/exchange/mailbox-migration/migrating-imap-mailboxes/migrating-imap-mailboxes) is een stappenplan van Microsoft om naar de Cloud te migreren via een IMAP enabled server.

Enkele dingen om rekening mee te houden:

- Enkel emails worden gemigreerd (geen notities, kalenders, ...)
- Maximum 500.000 items kunnen gemigreerd worden
- De grootste email die kan gemigreerd worden is 35MB

## Conclusie

Alls conclusie worden de verschillende prijzen en voordelen van alle opties even op een rij gezet.

| Optie | Prijs per 50 gebruikers per jaar | Voordelen |
| :--- | :---: | :--- |
| Tuxus | €3150 | Gebruikt Kerio in de cloud waardoor migratie simpeler zal zijn |
| Vboxx | €3900 | Gebruikt Kerio in de cloud waardoor migratie simpeler zal zijn |
| Outlook | €3060 | Goedkoopste, 50 GB storage + nog extra features, betrouwbaar |

Hier lijkt verplaatsten naar Microsoft Outlook een logische keuze. Werknemers hebben nu al een Office 365 account waardoor de licentie toekennen simpel is. Het is ook de goedkoopste optie die nog extra features heeft zoals online web-versies van Word en Powerpoint.

Indien dat dit niet in het budget zou passen dan wordt de huidige on premise mail server best behouden.
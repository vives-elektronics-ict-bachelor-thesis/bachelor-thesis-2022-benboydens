# Mail Server

Zoals vele bedrijven heeft Dataline hun eigen mail server. Die mail server zou ook naar de cloud kunnen worden gebracht. Er moet moet gekeken worden naar waat de opties zijn. Blijven we dezelfde software gebruiken in de cloud of stappen we over naar iets anders? Wat is de meest kost efficiente oplossing? Dat zijn vragen die in dit stuk beantwoord zullen worden.

## Kerio Connect

Nu wordt er gebruikt gemaakt van een Kerio Connect server. Kerio Connect is een product van GFI software die veilige mail services en kalender diensten voor een lage prijs zal aanbieden. Lokaal op Dataline zijn er 2 servers namelijk een een lokale Kerio Connect Mail server en een Mail filter server. 

| Server | Specs |
| :--- | :--- |
| Mail server | 4 cores, 8 gb RAM, 700 gb storage |
| Mail filter | 4 cores, 6 gb RAM, 20 gb storage |

### Pricing

Het aantal licenties die nu gebruikt worden zijn in totaal 100. Er worden zo veel licenties aangekocht om te voldoen aan de huidige werknemers en de toekomstige. De prijs van een lokale Kerio Connect server is enorm goedkoop maar dit is natuurlijk zonder de onderhoudskosten van de servers. Hieronder vindt je een overzicht van de pricing.

|  | Small (10-49) | Medium (50-249) | Large (>250) |
| :--- | :---: | :---: | :---: |
| Price Per user Per year | €32,50 | €29,50 | €26,50 |

Met 100 users hebben we dus een Medium subscriptie wat zou neer komen op een totaal van **€2950 per jaar**. Dat is niet de prijs inbegrepen van de mail filter server en de kosten om die server zelf draaiende te houden.

## Kerio Cloud

GFI biedt ons de mogelijkheid aan om naar een gehoste omgeving over te schakelen. GFI zelf zal wel geen hosting doen, dit gebeurt via een partner bedrijf. GFI stelt hiervoor 2 bedrijven voor in de regio België/Nederland.

- [Tuxis Internet Engineering](https://kerioindecloud.nl/)
- [vBoxx](https://vboxx.eu/email)

### Tuxus Internet Engineering

Tuxus biedt ons 2 mogelijkheden om Kerio Connect in te cloud te hosten. Er is een SaaS licentie die we zelf nog zouden moeten hosten of een cloud licentie. De cloud licentie is hier de logische keuze aangezien alles inbegrepen is voor een prijs van €5,25 per user per maand.

#### Features

- Altijd up-to-date
- 25 Gbyte opslag per gebruiker inbegrepen (voor 50 users is dat 1,25TB totale opslag)
- Alle features
- 100% Nederlandse SSD cloud
- Dagelijkse back-ups
- Advanced anti-virus, advanced anti-SPAM, Exchange Active Sync en archivering

Stel dat we voor 50 users zouden werken dan komen we op een prijs van **€3150 per jaar**.


### Vboxx

VBox is een andere parter aangeraden door GFI zelf. Er zijn 3 programma's waar we tussen kunnen kiezen bij VBoxx.

|  | Small | Big | Business |
| :--- | :---: | :---: | :---: |
| Prijs per user per maand | €5,00 | €7,50 | €6,50 |
| Disk Space per user | 3GB | 10GB | 10GB |

Het small programma heeft enorm weinig Storage. Als je het eens uitrekend komen we ongeveer voor 50 gebruiker op 50 x 3 GB = 150GB totale storage. Aangezien de mail server nu 700GB storage heeft wil zeggen dat we hier niet echt mee gaan toekomen.

#### Features

- Unlimited Aliases 
- Unlimited Bandwidth 
- Daily Back-ups
- MX Fallback
- SSL Beveiligd
- Spam Filter
- Anti-Virus

Voor een small programma voor 50 users zou het neer komen op **€3000 per jaar**. Een Business programma voor 50 users zou neer komen op **€3900 per jaar**. 

### Migratie

Aangezien de cloud versie hier ook Kerio Connect zal de migratie makkelijker zijn en zullen alle mails, agenda en contacten ook gemigreerd worden. Kerio connect heeft een migration service om dit automatisch te gaan doen. [Hier](https://manuals.gfi.com/en/kerio/connect/content/server-configuration/export-and-migration/kerio-connect-migration-service-1896.html) kun je meer info vinden hier omtrent.

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

**Wachtwoorden worden niet gemigreerd** en dat wil dus zeggen dat users een nieuw wachtwoord krijgen voor in de cloud! Er zal een CSV bestand gemaakt worden tijdens de migratie met alle wachtwoorden in.

## Microsoft Office

Dataline heeft al een een Office 365. Dan zouden we gewoon voor elke gebruiker een licentie moeten toekennen. Volgens mij hebben sommige gebruikers al zo een licentie. Dus misschien dat dit ideaal zou zijn moesten we naar de cloud gaan.

### Pricing

|  | Prijs user/maand |
| :--- | :---: |
| Microsoft 365 Business Basic | €5,10 |
| Microsoft 365-apps voor bedrijven | €8,80 |
| Microsoft 365 Business Standard | €10,50 |
| Microsoft 365 Business Premium | €18,90 |

Het verschil in features is het volgende. Alle verschillen kun je [hier](https://www.microsoft.com/nl-be/microsoft-365/business/compare-all-microsoft-365-business-products?&activetab=tab:primaryr2#coreui-contentrichblock-lni8j9r) vinden.

| | Basic | Business | Standard | Premium |
| :--- | :---: | :---: | :---: | :---: |
| Teams | :heavy_check_mark: | :x: | :heavy_check_mark: | :heavy_check_mark: |
| Webversie van Office Apps | :heavy_check_mark: | :x: | :heavy_check_mark: | :heavy_check_mark: |
| Email + agenda | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Bestanden delen + opslaan | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Desktop versie van Office Apps | :x: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |

Jammer genoeg heeft Microsoft niet echt een subscriptie die enkel email bevat dus we moeten alle extra features er ook bij nemen. Aangezien **Basic** het goedkoopste is en ons toegang heeft tot een mailbox van **50 GB per user** is dit de beste optie die we hebben. Stel dat we 50 gebruikers zouden nemen dan kost ons dat **€3060 per jaar**. Dit is voorlopig de goedkoopste cloud oplossing en we krijgen een mail filter + 50 GB opslag bij.

### Migratie

Aan de hand van een **IMAP migratie** kunnen we onze mailboxen gaan overzetten naar Microsoft Outlook. Andere zaken zoals kalenders en contacten worden niet mee gemigreerd. [Hier](https://docs.microsoft.com/en-us/exchange/mailbox-migration/migrating-imap-mailboxes/migrating-imap-mailboxes) kun je een stappenplan vinden van Microsoft om naar de Cloud te migreren via een IMAP enabled server. 

Enkele dingen om rekening mee te houden:

- Microsoft's data migration tool is currently unaware of tools enforcing messaging records management (MRM) or archival policies. Because of this, any messages that are deleted or moved to archive by these policies will result in the migration process flagging these items as "missing". The result is perceived data loss rather than actual data loss, which makes it much harder to identify actual data loss during any content verification checks.
- You can only migrate items in a user's inbox or other mail folders. This type of migration doesn't migrate contacts, calendar items, or tasks.
- You can migrate a maximum of 500,000 items from a user's mailbox (emails are migrated from newest to oldest).
- The biggest email you can migrate is 35 MB.
- If you limited the connections to your source email system, it's a good idea to increase them to improve migration performance. Common connection limits include client/server total connections, per-user connections, and IP address connections on either the server or the firewall.
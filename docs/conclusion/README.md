# Conclusie

Voor deze proef werd gekeken naar de huidige IT-omgeving van Dataline Solutions. Applicaties zoals Confluence, Jira, email en de telefonie servers werden onder de loep genomen en er werd van elke applicatie de mogelijke oplossingen opgesomd.

Met mijn onderzoek zijn volgende conclusies behaald:
- Active Directory is klaar gemaakt voor toekomstige synchronisatie met de cloud
- Synchronisatie van Azure werd uitgevoerd
- De permissies en groepen werden opgekuist en klaar gemaakt voor synchronisatie met de cloud
- Confluence moet naar de cloud en een standaard abonnement is genoeg voor Dataline
- De pocketquery plugin van Confluence moet bekeken worden zodat de queries ook werken in de cloud
- Om gebruik te maken van Azure AD users en groepen is een Atlassian Access abonnement nodig
- Indien er budget is voor de mail server wordt er gewerkt met een Outlook mailbox en anders blijft er lokaal gewerkt worden
- Een oplossing voor de telefonie servers is bepaalt namelijk Starwind vSAN
- Getest of Starwind vSAN is een goed alternatief is voor VMWare vSAN
- Gebruik van Starwind vSAN heeft een duidelijke invloed op het aantal IOPS en de latency van IO requests

Het doel van deze proef was om de huidige IT-infrastructuur van Dataline klaar te maken voor vernieuwingen en te kijken welke applicaties naar de cloud moeten. Het doel is gedeeltelijk behaald, er werd gekeken voor een aantal applicaties maar niet voor ze allemaal. Zoals het beheren van de KVM virtuele machines, de file server en de backup server.
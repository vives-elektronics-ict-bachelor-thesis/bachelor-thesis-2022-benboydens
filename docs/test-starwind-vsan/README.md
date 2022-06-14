# Test Starwind vSAN

Starwind vSAN is een bekende speler op de markt van Hyper Converged Infrastructure. Hun oplossing voor vSAN zou ideaal zijn voor Dataline aangezien we geen dure VMWare lisenties nodig hebben. Maar de vraag is natuurlijk hoe goed is Starwind vSAN. Als we kijken naar de reviews dan zien we dat vele bedrijven tevreden zijn met Starwind vSAN. Om dit zeker te zijn maken we een test opstelling, hier testen we dan de performance en kwaliteit van starwind vSAN. 

## Opstelling

Als opstelling gebruiken we 2 gebruikte desktop computers die Dataline nog liggen had. Die breiden we dan uit met een gloed nieuwe snelle netwerkkaart (25 Gbps) en een 250 GB SSD storage. De snelle verbinding is nodig om de data snel te gaan synchroniseren over de verschillende hosts.

Starwind heeft een 30 day free trial waarmee we een 2 node setup kunnen testen. Twee nodes is het absolute minimum dat nodig is om een vSAN te gebruiken. De setup die zal gevolgt worden is de volgende.

![2 node setup](./img/starwind-virtual-san-for-vsphere.png)

In totaal zullen er 3 NIC's of netwerkkaarten nodig zijn. Eén wordt gebruikt voor management bedoelt als aanspreekpunt voor het beheren van de ESXi host en Virtuele machines. De andere 2 NIC's worden gebruikt om data en commando's door te geven tussen de hosts. Hier gebruiken we de nieuwe snelle netwerkkaarten voor omdat de synchronisatie tussen de hosts best zo snel en efficient mogelijk gebeurt.


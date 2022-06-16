module.exports = {
  // TODO: Titel veranderen naar: 'Bachelor thesis - Ben Boydens',
  title: 'Bachelorproef Ben Boydens',
  description: 'Place a description here',
  themeConfig: {
    // TODO: Ik heb logo ook aangepast naar nieuwe VIVES logo
    logo: '/vives-logo-smile.png',
    navbar: [
      { text: 'Home', link: '/' },
      // TODO: Ik heb hieronder de link van de opleiding gezet :)
      { text: 'VIVES', link: 'https://www.vives.be/nl/technology/elektronica-ict' },
      // TODO: IoT Incubator is de website van onze onderzoeksgroep. Voorlopig nog oude site. De nieuwe komt binnenkort online.
      { text: 'IoT Incubator', link: 'https://iot-incubator.be/' },
    ],
    sidebarDepth: 1,
    // TODO: De link naar de github repo mag er uit. Want deze staan allemaal private.
    // repo: 'https://github.com/vives-elektronics-ict-bachelor-thesis/bachelor-thesis-2022-benboydens',
    docsDir: 'docs',
    docsBranch: 'master',
    sidebar: [
      '/introduction/',
      '/eerste-stappen',
      '/huidige-omgeving',
      '/active-directory',
      '/microsoft-azure',
      '/confluence',
      '/mail-server',
      '/data-storage',
      '/san-vs-vsan',
      '/test-starwind-vsan',
      '/file-backup-server',
      '/conclusion/',
      '/attachments/',
      '/abbreviations/',
      '/bibliography/',
    ]
  },
  serviceWorker: true,
  plugins: [],  
}
module.exports = {
  title: 'Bachelor thesis - Ben Boydens',
  description: 'Place a description here',
  themeConfig: {
    logo: '/vives-logo-smile.png',
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'VIVES', link: 'https://www.vives.be/nl/technology/elektronica-ict' },
      { text: 'IoT Incubator', link: 'https://iot-incubator.be/' },
    ],
    sidebarDepth: 1,
    docsDir: 'docs',
    docsBranch: 'master',
    sidebar: [
      '/introduction/',
      '/huidige-omgeving',
      '/active-directory',
      '/microsoft-azure',
      '/confluence',
      '/mail-server',
      '/data-storage',
      '/san-vs-vsan',
      '/test-starwind-vsan',
      '/conclusion/',
      '/abbreviations/',
      '/bibliography/',
    ]
  },
  serviceWorker: true,
  plugins: [],  
}
module.exports = {
  title: 'Place title here',
  description: 'Place a description here',
  themeConfig: {
    logo: '/vives-logo.png',
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'VIVES', link: 'https://www.vives.be' },
    ],
    sidebarDepth: 1,
    repo: 'https://github.com/vives-elektronics-ict-bachelor-thesis/bachelor-thesis-2022-benboydens',
    docsDir: 'docs',
    docsBranch: 'master',
    sidebar: [
      '/introduction/',
      '/eerste-stappen',
      '/huidige-omgeving',
      '/domain-controller',
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
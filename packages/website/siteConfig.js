// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'Viaplay',
    image: 'img/users/viaplay.png',
    infoLink: 'https://viaplay.se/',
    pinned: true,
  },
  {
    caption: 'Globocom',
    image: 'img/users/globocom.png',
    infoLink: 'http://www.globo.com/',
    pinned: true,
  },
];

const defaultVersionShown = '0.1.0';

const siteConfig = {
  title: 'React Ape',
  tagline: 'Build UI interfaces using HTML5 Canvas/WebGL and React',
  url: 'http://raphamorim.io',
  baseUrl: '/react-ape/', // Base URL for your project */

  // Used for publishing and more
  projectName: 'react-ape',
  organizationName: 'raphamorim',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'getting-started', label: 'Docs'},
    {doc: 'contributing-how-to-contribute', label: 'Contributing'},
    {blog: true, label: 'Blog'},
    {href: 'https://github.com/raphamorim/react-ape', label: 'GitHub'},
    {href: 'https://reactjs.org/', label: 'React'},
    {search: true},
  ],

  editUrl: 'https://github.com/raphamorim/react-ape/blob/master/docs/',

  algolia: {
    apiKey: 'my-api-key',
    indexName: 'my-index-name',
    algoliaOptions: {}, // Optional, if provided by Algolia
  },

  // If you have users set above, you add it here:
  // users,

  /* path to images for header/footer */
  headerIcon: 'img/logo.png',
  footerIcon: 'img/logo.svg',
  favicon: 'img/favicon.png',

  /* Colors for website */
  colors: {
    primaryColor: '#9B4C01',
    secondaryColor: '#05A5D1',
    tintColor: '#005068',
    backgroundColor: '#f5fcff',
  },

  blogSidebarCount: 'ALL',

  highlight: {
    theme: 'solarized-dark',
  },

  cleanUrl: true,

  /* Custom fonts for website */
  fonts: {
    myFont: ['Helvetica', 'sans-serif'],
    // myOtherFont: [
    //   -apple-system,
    //   system-ui
    // ]
  },

  copyright: `Copyright © ${new Date().getFullYear()} Raphael Amorim`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/logo-share.png',
  twitterImage: 'img/logo-share.png',
  metadata: [{
    name: 'twitter:card', content: 'summary'
  }],

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: 'https://github.com/raphamorim/react-ape',
};

module.exports = siteConfig;

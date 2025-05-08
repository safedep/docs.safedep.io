// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;
const BASE_URL = '/';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SafeDep Documentation',
  tagline: 'Safe and Trusted Open Source',
  url: 'https://docs.safedep.io',
  baseUrl: `${BASE_URL}`,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/vet.png',

  organizationName: 'safedep',
  projectName: 'docs.safedep.io',
  trailingSlash: false,
  deploymentBranch: 'main',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: 'G-16XDMW280T',
          anonymizeIP: false,
        },
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/safedep/docs.safedep.io/tree/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'SafeDep',
        logo: {
          alt: 'SafeDep',
          src: 'img/logo.svg',
        },
        items: [
          // {
          //   type: 'doc',
          //   docId: 'quickstart',
          //   position: 'left',
          //   label: 'Quick Start',
          // },
          {
            href: 'https://safedep.io/blog',
            label: 'Blog',
            position: 'right',
          },
          {
            href: 'https://github.com/safedep/vet',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://discord.gg/kAGEj25dCn',
            label: 'Discord',
            position: 'right',
          },
        ],
      },
      footer: {
        links: [
          {
            title: 'Website',
            items: [
              {
                label: 'SafeDep',
                href: 'https://safedep.io',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/kAGEj25dCn',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: 'https://safedep.io/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/safedep/vet',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} - <a href="https://safedep.io" target = "_blank" rel = "noopener" >SafeDep</a>` +
          `<img referrerpolicy="no-referrer-when-downgrade" src="https://static.scarf.sh/a.png?x-pxid=b0903597-5d56-451b-9845-29f8589035d6" />`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
        additionalLanguages: ['bash', 'diff', 'json'],
      },
      mermaid: {
        theme: {light: 'neutral', dark: 'dark'},
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
      // algolia: {
      //   appId: 'VRZ8RB9JZ8',
      //   apiKey: 'b3d464e6f36ab5f925566dd7f3b22947',
      //   indexName: 'docs_safedep_io_vrz8rb9jz8_pages',
      //   contextualSearch: true,
      //   searchPagePath: 'search',
      // },
      metadata: [
        {
          name: 'algolia-site-verification',
          content: 'AEEFBC640513A7E9',
        },
      ],
    }),
};

module.exports = config;

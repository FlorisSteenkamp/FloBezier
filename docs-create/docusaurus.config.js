// @ts-check

module.exports = {
    title: 'Flo Bezier',
    tagline: 'Robust & fast bezier curve functions',
    url: 'https://florissteenkamp.github.io',
    baseUrl: '/FloBezier/',
    favicon: 'img/favicon.ico',
    organizationName: 'FlorisSteenkamp', // Usually your GitHub org/user name.
    projectName: 'flo-bezier', // Usually your repo name.
    themeConfig: {
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        liveCodeBlock: {
            /**
             * The position of the live playground, above or under the editor
             * Possible values: "top" | "bottom"
             */
            playgroundPosition: 'bottom',
        },
        docs: {
            sidebar: {
                hideable: true
            }
        },
        navbar: {
            title: 'flo-bezier',
            logo: { 
                alt: 'Site Logo',
                src: 'img/logo.png',
            },
            items: [
                {
                    to: 'docs/',
                    activeBasePath: 'docs',
                    label: 'Docs',
                    position: 'left',
                },
                {
                    href: 'https://github.com/FlorisSteenkamp/flobezier',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Quick Links',
                    items: [
                        {
                            label: 'Docs',
                            to: 'docs/',
                        },
                        {
                            label: 'GitHub',
                            to: 'https://github.com/FlorisSteenkamp/flobezier',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} - Built with Docusaurus.`,
        },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    // It is recommended to set document id as docs home page (`docs/` path).
                    sidebarPath: require.resolve('./sidebars.js'),
                },
                blog: {
                    showReadingTime: true,
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            },
        ],
    ]
};

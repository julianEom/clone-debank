/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    alchemyKey: '29KlSPcRXk2uXPX0ruf1WeFk3q0gNj-s',
    etherscanKey: '4UNRPXUZ5D39D5BD72UCUG36PSCM8UGSNP',
    MORALIS_API_KEY:
      'ed16qDi53mhL7RyHN3jmsTbtJAy740IDjDlgKit4T0aArw4qHwVeL7AVpTgFV8sf',
    NEXT_PUBLIC_MONGODB_URI:
      'mongodb+srv://tina:Qazwsx132%3F%21@tina.ymw6tei.mongodb.net/test',
    NEXT_PUBLIC_AIRTABLE_TOKEN:
      'patErmi1dUaq0iix4.3c8f883bc6c2aa95a5360a2e2002778788924076a7c419bdf214758c6ae3e1e0',
    NEXT_PUBLIC_AIRTABLE_BASE_ID: 'app79e90nwpVYxU5E',
    NEXT_PUBLIC_AIRTABLE_TABLE_ID: 'tblq7GlxzHKMjmaM5',
  },
  reactStrictMode: true,
  experimental: { appDir: true },
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: true,
  },
  modularizeImports: {
    // '@ethersproject': {
    //   transform: `@ethersproject/{{member}}`,
    // },
    '@safe-global': {
      transform: `@esafe-global/{{member}}`,
    },
    // '@web3-react': {
    //   transform: `@web3-react/{{member}}`,
    // },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.alchemyapi.io',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
      },
      {
        protocol: 'https',
        hostname: 'static.debank.com',
      },
      {
        protocol: 'https',
        hostname: 'https://encrypted-tbn0.gstatic.com',
      },
    ],
    minimumCacheTTL: 1500000,
  },
};

module.exports = nextConfig;

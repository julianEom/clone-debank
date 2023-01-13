/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    alchemyKey: '29KlSPcRXk2uXPX0ruf1WeFk3q0gNj-s',
    etherscanKey: '4UNRPXUZ5D39D5BD72UCUG36PSCM8UGSNP',
    MORALIS_API_KEY:
      'ed16qDi53mhL7RyHN3jmsTbtJAy740IDjDlgKit4T0aArw4qHwVeL7AVpTgFV8sf',
  },
  reactStrictMode: true,
  experimental: { appDir: true },
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: true,
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

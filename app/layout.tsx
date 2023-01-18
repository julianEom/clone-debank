'use client';
import styled from 'styled-components';
import { Poppins } from '@next/font/google';
import StyledComponentsRegistry from '../lib/register';
import Tap from '../components/layout/Tap';
import { useEffect, useState } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import ReactQueryWrapper from '../components/Provider/ReactQueryWrapper';
import { useEvmNativeBalance } from '@moralisweb3/next';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

const poppins = Poppins({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});
function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <main className={poppins.className}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <ReactQueryWrapper>
              <StyledComponentsRegistry>
                <StyledBody>
                  <Tap />
                  <StyledContainer>{children}</StyledContainer>
                </StyledBody>
              </StyledComponentsRegistry>
            </ReactQueryWrapper>
          </Web3ReactProvider>
        </main>
      </body>
    </html>
  );
}
const StyledBody = styled.section`
  width: 100%;
  height: 100%;
  min-height: 960px;
  background-color: #eff3f8;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

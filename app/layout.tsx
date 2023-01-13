'use client';
import styled from 'styled-components';
import StyledComponentsRegistry from '../lib/register';
import Tap from '../components/layout/Tap';
import { useEffect, useState } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import ReactQueryWrapper from '../components/Provider/ReactQueryWrapper';
import { useEvmNativeBalance } from '@moralisweb3/next';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ALCHEMYKEY = process.env.alchemyKey ? process.env.alchemyKey : '';
  const settings = {
    apiKey: ALCHEMYKEY, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };
  const [alchemy, setAlchemy] = useState<Alchemy | null>(null);
  useEffect(() => {
    const alchemy = new Alchemy(settings);
    setAlchemy(alchemy);
  }, []);
  // const address = '0x7e0de483a33bd04d2efe38686be5cb25cfd3e533'; //Dan 지갑
  // const { data: nativeBalance, error } = useEvmNativeBalance({ address });
  // useEffect(() => {
  //   nativeBalance && console.log('moralis', nativeBalance);
  //   error && console.log('error', error);
  // }, [nativeBalance, error]);

  return (
    <html>
      <head />
      <body>
        <main>
          <ReactQueryWrapper>
            <StyledComponentsRegistry>
              <StyledBody>
                <Tap />
                {children}
              </StyledBody>
            </StyledComponentsRegistry>
          </ReactQueryWrapper>
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
`;

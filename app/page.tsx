'use client';
import { Network, Alchemy } from 'alchemy-sdk';
import Link from 'next/link';
import { useEffect } from 'react';

const Index = () => {
  const ALCHEMYKEY = process.env.alchemyKey ? process.env.alchemyKey : '';
  const settings = {
    apiKey: ALCHEMYKEY, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };

  useEffect(() => {
    const alchemy = new Alchemy(settings);
    alchemy.core
      .getTransactionReceipts({
        blockHash:
          '0xf66ca6b68fbe079412a5fbde2aeaa461587c0bd974de31d68a80da5260f23346',
      })
      .then(console.log);
  }, []);
  return (
    <div>
      <h1>Index</h1>
    </div>
  );
};
export default Index;

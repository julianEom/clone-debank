'use client';
import { useEvmNativeBalance } from '@moralisweb3/next';
import { Network, Alchemy } from 'alchemy-sdk';
import Link from 'next/link';
import { useEffect } from 'react';

const Index = () => {
  const address = '0x7e0de483a33bd04d2efe38686be5cb25cfd3e533'; //Dan 지갑
  const { data: nativeBalance, error } = useEvmNativeBalance({ address });
  useEffect(() => {
    nativeBalance && console.log('moralis', nativeBalance);
    error && console.log('error', error);
  }, [nativeBalance, error]);

  return (
    <div>
      <h1>Index</h1>
    </div>
  );
};
export default Index;

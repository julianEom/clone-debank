'use client';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { createContext, useContext, useEffect, useState } from 'react';
import Safe, { SafeFactory } from '@safe-global/safe-core-sdk';
import EthersAdapter from '@safe-global/safe-ethers-lib';
import SafeServiceClient from '@safe-global/safe-service-client';

const GnosisContext = createContext({});
const { Provider } = GnosisContext;

type Props = {
  children: React.ReactNode;
};

export const GnosisProvider = ({ children }: Props) => {
  const { account, library, chainId } = useWeb3React();
  const [safeAddressList, setSafeAddressList] = useState<string[]>([]);
  const [safeSdk, setSafeSdk] = useState<Safe | null>(null);
  const [ethAdapter, setEthAdapter] = useState<EthersAdapter | null>(null);
  useEffect(() => {
    console.log('library :', library);
    if (!library) return;
    if (!account) return;
    const signer = library.getSigner();
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer,
    });
    setEthAdapter(ethAdapter);
  }, [account, library]);
  useEffect(() => {
    if (!ethAdapter) return;

    const _getSafesByOwner = async (
      safeService: SafeServiceClient,
      account: string
    ) => {
      const res = await safeService.getSafesByOwner(account);
      console.log('_getSafesByOwner res : ', res);
      setSafeAddressList(res.safes);
      return res.safes;
    };

    ethAdapter.getSignerAddress().then((address) => {
      console.log('address :', address);
      address && _getSafesByOwner(safeService, address);
    });
    const safeService = new SafeServiceClient({
      txServiceUrl: 'https://safe-transaction-mainnet.safe.global',
      ethAdapter,
    });

    // const safeList = _getSafesByOwner(safeService, account);
    // console.log('safeList :', safeList);
  }, [ethAdapter]);
  useEffect(() => {
    console.log('safeAddressList :', safeAddressList);
  }, [safeAddressList]);
  const _getSafeSdk = async (safeAddress: string) => {
    const signer = library.getSigner();
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer,
    });
    const safeSdk = await Safe.create({
      ethAdapter,
      safeAddress,
    });
    return safeSdk;
  };
  const _getSafeByOwnerAddress = async (
    safeAddress: string,
    ethAdapter: EthersAdapter
  ) => {
    const safeSdk = await Safe.create({
      ethAdapter: ethAdapter,
      safeAddress: safeAddress,
    });
    return safeSdk;
  };

  //Todo: @Julian
  //useGnosisSafe 훅을 여기서 만들어서 export 하는게 맞는지 다시 한번 고민!
  const useGnosisSafe = (ownerAddress: string) => {
    // const [safeSdk, setSafeSdk] = useState<Safe | null>(null);
    // useEffect(() => {
    //   if (!ownerAddress) return;
    //   if (!ethAdapter) return;
    //   _getSafeByOwnerAddress(ownerAddress, ethAdapter);
    // }, [ownerAddress, ethAdapter]);
    return { safe: safeSdk };
  };
  return (
    <Provider value={{ safeAddressList, useGnosisSafe }}>{children}</Provider>
  );
};

export const useGnosis = () => {
  return useContext(GnosisContext);
};

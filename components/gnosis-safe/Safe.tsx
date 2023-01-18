import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Safe, { SafeFactory } from '@safe-global/safe-core-sdk';
import EthersAdapter from '@safe-global/safe-ethers-lib';
import { useWeb3React } from '@web3-react/core';
import SafeServiceClient from '@safe-global/safe-service-client';
import { Web3Provider } from '@ethersproject/providers';

const threshold: number = 1;
const owners = ['0x878E874Bb80BF5FE90b6a66624769f8D543a724c'];

declare const window: any;
const GSafe = () => {
  const [gnosisLoaded, setGnosisLoaded] = useState<boolean>(false);
  const [safeDeployed, setSafeDeployed] = useState<boolean>(false);
  const [safeAddress, setSafeAddress] = useState<string[]>([]);

  const [safeSdk, setSafeSdk] = useState<Safe | null>(null);
  const [safeFactory, setSafeFactory] = useState<SafeFactory | null>(null);

  // const { account, library, chainId } = useWeb3React();
  const address = '0x878E874Bb80BF5FE90b6a66624769f8D543a724c';

  const deploySafe = async () => {
    const safeSdk = await safeFactory?.deploySafe({
      safeAccountConfig: { owners, threshold },
    });
    if (!safeSdk) return;
    setSafeSdk(safeSdk);
    setSafeAddress(safeSdk.getAddress());
    setSafeDeployed(true);
  };

  const sendSafeTransaction = async () => {
    //   const to = await signer?.getAddress();
    //   const transaction: SafeTransactionDataPartial = {
    //     to,
    //     value: '1',
    //     data: '0x',
    //   };
    //   const safeTransaction: SafeTransaction = await safeSdk?.createTransaction({
    //     safeTransactionData: transaction,
    //   });
    //   const executeTxResponse: TransactionResult =
    //     await safeSdk?.executeTransaction(safeTransaction);
    //   await executeTxResponse.transactionResponse?.wait();
  };

  useEffect(() => {
    const provider =
      typeof window !== undefined &&
      new ethers.providers.Web3Provider(window.ethereum);

    console.log('provider :', provider);
    if (!provider) return;

    const setupGnosis = async (provider: Web3Provider) => {
      // const signer = library.getSigner();

      const signer = provider.getSigner();
      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer,
      });
      console.log('ethAdapter', ethAdapter);
      const safeService = new SafeServiceClient({
        txServiceUrl: 'https://safe-transaction-mainnet.safe.global',
        ethAdapter,
      });
      safeService.getSafesByOwner(address).then((res) => {
        console.log('getSafesByOwner res : ', res);
        setSafeAddress(res.safes);
        setSafeDeployed(true);
      });
      setGnosisLoaded(true);
    };

    provider && setupGnosis(provider);
  }, []);
  // const { connect } = useConnect({
  //   connector: new InjectedConnector(),
  // });
  useEffect(() => {
    console.log('safeAddress :', safeAddress);
  }, [safeAddress]);
  return (
    <div>
      {gnosisLoaded ? <div>gnosis loaded</div> : <div>gnosis loading...</div>}
      {safeDeployed ? (
        <div>
          safe deployed:
          {safeAddress.map((address, i) => {
            return <div key={i}>{address}</div>;
          })}
        </div>
      ) : (
        <div>safe not deployed</div>
      )}
      <button disabled={!gnosisLoaded} onClick={() => deploySafe()}>
        Deploy Safe
      </button>
      <button disabled={!safeDeployed} onClick={() => sendSafeTransaction()}>
        Send Transaction
      </button>
    </div>
  );
};
export default GSafe;

'use client';
import { useEffect, useState } from 'react';
import { useQueries, useQuery } from 'react-query';
import {
  getTransactionHash,
  getTransactionNFTHash,
} from '../../api/etherscan/transcation';
import HistoryTable from '../../components/history/HistoryTable';
import {
  ITransaction,
  Transaction,
  TransactionStreaming,
} from '../../interface/Transaction.type';
import {
  Alchemy,
  Network,
  AlchemySubscription,
  AlchemySettings,
} from 'alchemy-sdk';

type TransactionStreamingList = ITransaction[] | [];
const Page = () => {
  const network = 'mainnet';
  const address = '0x7e0de483a33bd04d2efe38686be5cb25cfd3e533'; //Dan 지갑

  // const network = 'goerli';
  // const address = '0xca6308326a0d3e4b4f2aa462aab979a451a49fba'; //내 지갑

  const [streamingTransaction, setStreamingTransaction] = useState<
    ITransaction[]
  >([]);
  useEffect(() => {
    // const etherscanResult = getTransactionHash(address);
    // console.log('etherscanResult', etherscanResult);
    // getTokenPrice(address);
  }, []);
  const { data: etherscanResult } = useQuery(
    'getTransactionHash' + address,
    () => getTransactionHash(address, network),
    {
      suspense: true,
    }
  );
  const { data: etherscanNFTResult } = useQuery(
    'etherscanNFTResult' + address,
    () => getTransactionNFTHash(address, network),
    {
      suspense: true,
    }
  );
  const alchemyNetwork =
    network == 'mainnet' ? Network.ETH_MAINNET : Network.ETH_GOERLI; // Replace with your network
  const settings: AlchemySettings = {
    apiKey: process.env.alchemyKey ? process.env.alchemyKey : '', // Replace with your Alchemy API Key
    network: alchemyNetwork, // Replace with your network
  };
  //0xf107541c10a3e2655cad7a94aed4f7545ba99a1b484b26dc62dd1a46e608133c

  useEffect(() => {
    let alchemy = new Alchemy(settings);
    alchemy.ws.on(
      {
        method: AlchemySubscription.MINED_TRANSACTIONS,
        addresses: [
          {
            from: address,
          },
          {
            to: address,
          },
        ],
        includeRemoved: true,
        hashesOnly: false,
      },
      (tx: { transaction: ITransaction }) => {
        console.log('streaming tx', tx);
        tx?.transaction &&
          setStreamingTransaction([tx.transaction, ...streamingTransaction]);
      }
    );
  }, []);

  useEffect(() => {
    // setStreamingTransaction([mockData as ITransaction]);
    streamingTransaction &&
      console.log('streamingTransaction', streamingTransaction);
  }, [streamingTransaction]);

  return (
    <div>
      {etherscanResult && etherscanNFTResult && (
        <HistoryTable
          transactionlist={[
            ...etherscanResult.result,
            ...etherscanNFTResult.result,
          ].sort((a, b) => {
            return Number(b.blockNumber) - Number(a.blockNumber);
          })}
          address={address}
          streamingList={streamingTransaction}
        />
      )}
    </div>
  );
};

export default Page;

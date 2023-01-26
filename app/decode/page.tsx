'use client';
import { TokenMetadataResponse } from '@alch/alchemy-sdk';
import { utils } from 'ethers';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getTokenMetadata } from '../../api/alchemy/history';
import dbConnect from '../../db/dbConnect';
// import Item from '../../utils/db/schemas/Item';
import { MongoClient } from 'mongodb';
import { getAllTransactions } from '../../api/jay/transaction';
import { TansactionJay } from '../../interface/Transaction.type';
import ReactJson from 'react-json-view';
import styled from 'styled-components';

const Page = () => {
  const value = '190177342396739128262';
  const ethers = utils.formatEther(value);
  const tokenAddr = '0x26fc1f11e612366d3367fc0cbfff9e819da91c8d';
  // 788813083335272560407,
  // 498421958897882142,
  const result = parseInt(value) / 10 ** 18;
  const { data: tokenMetadata, isLoading } = useQuery<TokenMetadataResponse>(
    'getTokenMetadata' + tokenAddr,
    () => getTokenMetadata(tokenAddr)
  );
  const [txHash, setTxHash] = useState<string>('');
  const [searched, setSearched] = useState<TansactionJay>(null);
  useEffect(() => {
    console.log('tokenMetadata', tokenMetadata);
  }, [tokenMetadata]);

  const initialMongo = async () => {
    await dbConnect();
    // const result = await Item.find({});
    // const items = result.map((doc) => {
    //   const item = doc.toObject();
    //   item._id = item._id.toString();
    //   return item;
    // });
  };
  const { data: transactionList } = useQuery<TansactionJay[]>(
    'getAllTransactions_all',
    () => getAllTransactions(),
    {
      suspense: true,
    }
  );
  useEffect(() => {
    console.log('txHash', txHash);
  }, [txHash]);
  useEffect(() => {
    if (!transactionList || !txHash) return;
    // '0x66daee3bc3d7d7f6131d9f7a3ccd2af1075a24d2b37ee14e7493496cae9f6dad' &&
    const result = transactionList.find(
      (transaction) => transaction.transactionHash == txHash
    );
    console.log('result', result);
    result ? setSearched(result) : setSearched(null);
  }, [transactionList, txHash]);

  const json = {
    /* my json object */
  };

  return (
    <StyledContainer>
      <div>{ethers}</div>
      <div>{result}</div>
      <input value={txHash} onChange={(e) => setTxHash(e.target.value)} />
      <div>{searched && <ReactJson src={searched} />}</div>
    </StyledContainer>
  );
};
export default Page;
const StyledContainer = styled.section`
  min-height: 960px;
  width: 900px;
  background-color: white;
  margin-top: 15px;
  padding: 0 24px;
`;

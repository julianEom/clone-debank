'use client';
import { keccak256 } from '@ethersproject/keccak256';
import { toUtf8Bytes } from '@ethersproject/strings';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { getTransactionReceipt } from '../../api/alchemy/history';
import {
  ITransaction,
  Transaction,
  TransactionNFT,
  TransactionStreaming,
} from '../../interface/Transaction.type';
import { filterTransaction } from '../../lib/utils';
import HistoryRow from './HitoryRow';

type Props = {
  transactionlist: ITransaction[];
  streamingList: ITransaction[];
  address: string;
};
const HistoryTable = ({ transactionlist, streamingList, address }: Props) => {
  const [transactions, setTransactions] = useState<ITransaction[]>();
  const [streamingTransactions, setStreamingTransactions] =
    useState<ITransaction[]>();

  useEffect(() => {
    const result =
      transactionlist &&
      transactionlist.reduce((acc: ITransaction[], cur: ITransaction) => {
        if (acc.find((item) => item.hash === cur.hash)) return acc;
        return acc.concat(cur);
      }, []);
    setTransactions(result);
  }, [transactionlist]);
  useEffect(() => {
    const result =
      streamingList &&
      streamingList.reduce((acc: ITransaction[], cur: ITransaction) => {
        if (acc.find((item) => item.hash === cur.hash)) return acc;
        return acc.concat(cur);
      }, []);
    console.log('streamingList result1', result);
    setStreamingTransactions(result);
  }, [streamingList]);
  return (
    <StyledHistoryTable>
      {streamingTransactions &&
        streamingTransactions.map((transaction, i) => {
          // if (filterTransaction(transaction)) return;
          return (
            <HistoryRow key={i} transaction={transaction} address={address} />
          );
        })}
      {transactions &&
        transactions.map((transaction, i) => {
          if (filterTransaction(transaction)) return;
          return (
            <HistoryRow key={i} transaction={transaction} address={address} />
          );
        })}
    </StyledHistoryTable>
  );
};
export default HistoryTable;
const StyledHistoryTable = styled.div`
  min-height: 960px;
  width: 900px;
  background-color: white;
  margin-top: 15px;
  padding: 0 24px;
`;

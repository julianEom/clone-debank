'use client';
import { Log } from '@ethersproject/abstract-provider';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getTransactionReceipt } from '../../api/alchemy/history';
import { getTransactionHash } from '../../api/etherscan/transcation';
import HistorylogTable from '../../components/history/HistorylogTagble';
import HistoryTransactionRow from '../../components/history/HistoryTransactionRow';
import { ITransaction } from '../../interface/Transaction.type';
import { TRANSFER } from '../../lib/topic';
type EtherscanResult = {
  message: string;
  result: ITransaction[];
  status: string;
};
const Page = () => {
  const network = 'mainnet';
  const address = '0x7e0de483a33bd04d2efe38686be5cb25cfd3e533'; //Dan 지갑

  // const network = 'goerli';
  // const address = '0xca6308326a0d3e4b4f2aa462aab979a451a49fba'; //내 지갑

  const [transactionLogs, setTransactionLogs] = useState<Log[]>([]);

  const { data: etherscanResult } = useQuery(
    'getTransactionHash' + address,
    () => getTransactionHash(address, network),
    {
      suspense: true,
    }
  );
  const isFilteredLog = (log: Log, transactionLogs: Log[]) => {
    return (
      log.topics[0] == TRANSFER &&
      (log.topics[1].includes(address.slice(2)) ||
        log.topics[2].includes(address.slice(2)))
    );
  };
  useEffect(() => {
    console.log(1);
    etherscanResult && console.log('etherscanResult', etherscanResult);
    etherscanResult &&
      etherscanResult.result.map((transaction) => {
        getTransactionReceipt(transaction.hash).then((data) => {
          let result = data?.logs.filter((log) =>
            isFilteredLog(log, transactionLogs)
          );
          setTransactionLogs((prev) =>
            prev.concat(result || []).reduce((acc: Log[], cur: Log) => {
              if (acc.find((item) => item.blockNumber === cur.blockNumber))
                return acc;
              return acc.concat(cur);
            }, [])
          );
        });
      });
  }, [etherscanResult]);

  return (
    <StyledSection>
      <h1>hisotory-log</h1>
      <HistorylogTable transcationLogList={transactionLogs} address={address} />
      <div className='table'>
        {etherscanResult?.result.map((transaction, i) => (
          <HistoryTransactionRow
            key={i}
            transaction={transaction}
            address={address}
          />
        ))}
      </div>
    </StyledSection>
  );
};
export default Page;
const StyledSection = styled.section`
  .table {
    min-height: 960px;
    width: 900px;
    background-color: white;
    margin-top: 15px;
    padding: 0 24px;
  }
`;

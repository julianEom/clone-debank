'use client';
import { Log } from '@ethersproject/abstract-provider';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getTransactionReceipt } from '../../api/alchemy/history';
import { ITransaction } from '../../interface/Transaction.type';
import HistoryLogTableRow from './HistoryLogTableRow';
import HistoryTransactionRow from './HistoryTransactionRow';

type Props = {
  transcationLogList: Log[];
  address: string;
};
const HistorylogTable = ({ transcationLogList, address }: Props) => {
  const [transactionLogs, setTransactionLogs] =
    useState<Log[]>(transcationLogList);

  useEffect(() => {
    transcationLogList &&
      console.log('StyledHistorylogTable', transcationLogList);
  }, [transcationLogList]);
  return (
    <StyledHistorylogTable>
      {transcationLogList?.map((transactionLog, i) => (
        <HistoryLogTableRow
          key={i}
          log={transactionLog}
          send={address == transactionLog.topics[1]}
        />
      ))}
    </StyledHistorylogTable>
  );
};
export default HistorylogTable;
const StyledHistorylogTable = styled.section`
  min-height: 960px;
  width: 900px;
  background-color: white;
  margin-top: 15px;
  padding: 0 24px;
`;

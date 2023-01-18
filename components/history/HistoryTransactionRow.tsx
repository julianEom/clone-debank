'use client';
import { Suspense } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getTransactionReceipt } from '../../api/alchemy/history';
import { ITransaction } from '../../interface/Transaction.type';
import { TRANSFER } from '../../lib/topic';
import { shortAddress } from '../../lib/utils';
import HistoryEtherLogRow from './HistoryEthLogRow';
import HisotryLogRow from './HistoryLogRow';

type Props = {
  transaction: ITransaction;
  address: string;
};
const HistoryTransactionRow = (props: Props) => {
  const { transaction, address } = props;
  const { data: transactionReceipt } = useQuery(
    'getTransactionHash' + transaction.hash,
    () => getTransactionReceipt(transaction.hash),
    {
      suspense: true,
    }
  );
  return (
    <StyledHistoryTransactionRow>
      <div>{shortAddress(transaction.hash)}</div>
      <div className='column'>
        {transaction.value && parseInt(transaction.value) > 0 && (
          <HistoryEtherLogRow
            value={transaction.value}
            send={transaction.to.includes(address.slice(2))}
          />
        )}
        {transactionReceipt?.logs?.map(
          (log, i) =>
            log.topics[0] == TRANSFER &&
            (log.topics[1].includes(address.slice(2)) ||
              log.topics[2].includes(address.slice(2))) && (
              <HisotryLogRow key={i} log={log} address={address} />
            )
        )}
      </div>
    </StyledHistoryTransactionRow>
  );
};
export default HistoryTransactionRow;
const StyledHistoryTransactionRow = styled.section`
  min-height: 38px;
  padding: 24px 0;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  flex-direction: row;
  font-size: 13px;
  .light {
    color: #8b93a7;
  }
  div:nth-child(1) {
    width: 135px;
  }
  div:nth-child(1) {
    width: 435px;
  }
  .light {
    font-size: 12px;
    color: #8b93a7;
  }

  .top {
    margin-bottom: 8px;
  }
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 13px;
    img {
      margin-right: 10px;
    }
  }
  .column {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .plus {
    color: #00c087;
  }
  .nft {
    width: 28px;
    height: 28px;
  }
`;

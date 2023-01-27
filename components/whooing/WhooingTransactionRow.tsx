'use client';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { Transaction } from '../../interface/WhooingTransaction.type';

type Props = {
  data: Transaction;
};

const WhooingTransactionRow = ({ data }: Props) => {
  return (
    <TransactionRow>
      <div>
        <p>{dayjs(data.date).format('YYYY-MM-DD')}</p>
      </div>
      <div>
        <p className='bold'>{data.item}</p>
        {data.memo && <p className='memo'>{data.memo}</p>}
      </div>
      <div>
        <p className='bold'>{data.price}</p>
      </div>
      <div>
        <p>
          {data.debitAccountValue} ({data.debitAccount})
        </p>
      </div>
      <div>
        <p>
          {data.creditAccountValue} ({data.creditAccount})
        </p>
      </div>
    </TransactionRow>
  );
};

export default WhooingTransactionRow;

const TransactionRow = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100%-40px);
  padding: 10px;
  border-bottom: 1px solid #e5e5e5;
  div:nth-child(1) {
    width: 25%;
    text-align: left;
  }
  div:nth-child(2) {
    width: 25%;
    text-align: left;
  }
  div:nth-child(3) {
    width: 14%;
    text-align: right;
  }
  div:nth-child(4) {
    width: 18%;
    text-align: right;
  }
  div:nth-child(5) {
    width: 18%;
    text-align: right;
  }
  p {
    font-size: 13px;
    margin: 0;
  }
  p.memo {
    font-size: 12px;
    color: #999;
  }
  p.bold {
    font-weight: 600;
  }
`;

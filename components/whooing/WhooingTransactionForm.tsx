'use client';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { Transaction } from '../../interface/WhooingTransaction.type';
import { DEBIT_ACCOUNTS, CREDIT_ACCOUNTS } from './config';

type Props = {
  defaultTx: Transaction;
  onClickSubmit: (data: Transaction) => void;
};
const WhooingTransactionForm = ({ defaultTx, onClickSubmit }: Props) => {
  const [transaction, setTransaction] = useState<Transaction>(defaultTx);

  const changeTransaction = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <StyledRow>
      <Content>
        <div>
          <p>Date</p>
          <input
            type='date'
            name='date'
            value={dayjs(transaction.date).format('YYYY-MM-DD')}
            onChange={changeTransaction}
          />
          <p>Transaction</p>
          <input
            type='text'
            name='transactionHash'
            value={transaction.transactionHash}
            onChange={changeTransaction}
          />
        </div>

        <div>
          <p>Item</p>
          <input
            type='text'
            name='item'
            value={transaction.item}
            onChange={changeTransaction}
          />
          <p>Memo</p>
          <input
            type='text'
            name='memo'
            value={transaction.memo || ''}
            onChange={changeTransaction}
          />
        </div>

        <div>
          <p>Value</p>
          <input
            type='number'
            name='price'
            value={transaction.price}
            onChange={changeTransaction}
          />
        </div>

        <div>
          <p>Debit</p>

          <p className='desc'>대분류</p>
          <select
            name='debitAccount'
            id='debitAccount'
            value={transaction.debitAccount}
            onChange={changeTransaction}
          >
            {DEBIT_ACCOUNTS.map((account) => (
              <option value={account} key={account}>
                {account}
              </option>
            ))}
          </select>
          <p className='desc'>소분류</p>
          <input
            type='text'
            name='debitAccountValue'
            value={transaction.debitAccountValue}
            onChange={changeTransaction}
          />
        </div>

        <div>
          <p>Credit</p>
          <p className='desc'>대분류</p>
          <select
            name='creditAccount'
            id='creditAccount'
            value={transaction.creditAccount}
            onChange={changeTransaction}
          >
            {CREDIT_ACCOUNTS.map((account) => (
              <option value={account} key={account}>
                {account}
              </option>
            ))}
          </select>
          <p className='desc'>소분류</p>
          <input
            type='text'
            name='creditAccountValue'
            value={transaction.creditAccountValue}
            onChange={changeTransaction}
          />
        </div>
      </Content>

      <button onClick={() => onClickSubmit(transaction)}>입력</button>
    </StyledRow>
  );
};

export default WhooingTransactionForm;

const StyledRow = styled.section`
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.05);
  button {
    width: 100%;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  div {
    display: flex;
    flex-direction: column;
    margin: 0 3px;
  }
  p {
    font-size: 13px;
    color: #939393;
    margin: 4px;
  }
  p.desc {
    font-size: 12px;
    color: #999;
    margin: 2px;
  }
`;

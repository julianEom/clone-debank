'use client';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Records, Transaction } from '../../interface/WhooingTransaction.type';
import WhooingTransactionRow from './WhooingTransactionRow';

type Props = {
  transactions: Transaction[];
};

const WhooingTransactions = ({ transactions }: Props) => {
  return (
    <StyledRow>
      <ul>
        <TransactionRow>
          <div>
            <p>Date</p>
          </div>
          <div>
            <p>Item</p>
          </div>
          <div>
            <p>Value</p>
          </div>
          <div>
            <p>Debit</p>
          </div>
          <div>
            <p>Credit</p>
          </div>
        </TransactionRow>

        {transactions.length > 0 &&
          transactions.map((tx, i) => (
            <WhooingTransactionRow data={tx} key={i} />
          ))}
      </ul>
    </StyledRow>
  );
};

export default WhooingTransactions;

const StyledRow = styled.section`
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 6px;
  margin-bottom: 16px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.05);
  ul {
    padding: 0;
  }
`;

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
    font-size: 14px;
    color: #939393;
    font-weight: 600;

    margin: 0;
  }
`;

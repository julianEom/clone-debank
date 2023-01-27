'use client';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Transaction } from '../../interface/WhooingTransaction.type';
import {
  updateTransactionMDB,
  updateTransaction,
} from '../../api/whooing/whooing';

const WhooingTransactionForm = () => {
  const [transaction, setTransaction] = useState<Transaction>({
    date: new Date(),
    transactionHash: '',
    item: '',
    memo: null,
    price: 0,
    debtorType: '현금',
    debtorCategory: '자산',
    creditorType: '현금',
    creditorCategory: '자산',
  });

  useEffect(() => {
    console.log(
      '🚀 ~ file: WhooingTransactionForm.tsx:21 ~ WhooingTransactionForm ~ transaction',
      transaction
    );
  }, [transaction]);

  const changeTransaction = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = (data: Transaction) => {
    if (data.item.length === 0) {
      alert('데이터를 입력해주세요.');
      return;
    }
    const params = {
      ...data,
      date: new Date(data.date),
      price: Number(data.price),
    };
    updateTransactionMDB(params);
    updateTransaction(params);
  };

  return (
    <StyledRow>
      <Content>
        <div>
          <p>날짜</p>
          <input
            type='date'
            name='date'
            value={transaction?.date?.toString()}
            onChange={changeTransaction}
          />
        </div>

        <div>
          <p>아이템</p>
          <input
            type='text'
            name='item'
            value={transaction.item}
            onChange={changeTransaction}
          />
          <p>메모</p>
          <input
            type='text'
            name='memo'
            value={transaction.memo || ''}
            onChange={changeTransaction}
          />
        </div>

        <div>
          <p>금액</p>
          <input
            type='number'
            name='price'
            value={transaction.price}
            onChange={changeTransaction}
          />
        </div>

        <div>
          <p>차변</p>
          <input
            type='text'
            name='debtorType'
            value={transaction.debtorType}
            onChange={changeTransaction}
          />
          <p>분류</p>
          <input
            type='text'
            name='debtorCategory'
            value={transaction.debtorCategory}
            onChange={changeTransaction}
          />
        </div>

        <div>
          <p>대변</p>
          <input
            type='text'
            name='creditorType'
            value={transaction.creditorType}
            onChange={changeTransaction}
          />
          <p>분류</p>
          <input
            type='text'
            name='creditorCategory'
            value={transaction.creditorCategory}
            onChange={changeTransaction}
          />
        </div>
      </Content>

      <button onClick={() => submitForm(transaction)}>입력</button>
    </StyledRow>
  );
};

export default WhooingTransactionForm;

const StyledRow = styled.section`
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 6px;
  margin-bottom: 16px;
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
    font-size: 12px;
    color: #999;
    margin: 4px;
  }
`;

'use client';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Transaction } from '../../interface/WhooingTransaction.type';
import { getTransactions, updateTransaction } from '../../api/whooing/whooing';

type Props = {};
const WhooingTransactionForm = (props: Props) => {
  // const [date, setDate] = useState<Date>();
  // const [item, setItem] = useState<string>('');
  // const [memo, setMemo] = useState<string>('');
  // const [price, setPrice] = useState<number>(0);
  // const [debtor, setDebtor] = useState<Item>({
  //   item: '',
  //   category: ''
  // });
  // const [creditor, setCreditor] = useState<Item>({
  //   item: '',
  //   category: ''
  // });

  // const { log, address } = props;
  const [transaction, setTransaction] = useState<Transaction>({
    date: new Date(),
    item: '',
    memo: null,
    price: 0,
    debtorItem: '현금',
    debtorCategory: '자산',
    creditorItem: '현금',
    creditorCategory: '자산',
  });

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
    updateTransaction(data);
  };

  return (
    <StyledRow>
      {/* <button onClick={getTransactions}>GET2</button> */}
      <Content>
        <div>
          <p>날짜</p>
          <input
            type='date'
            name='date'
            value={transaction.date}
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
          <p>왼쪽</p>
          <input
            type='text'
            name='debtorItem'
            value={transaction.debtorItem}
            onChange={changeTransaction}
          />
        </div>

        <div>
          <p>오른쪽</p>
          <input
            type='text'
            name='creditorItem'
            value={transaction.creditorItem}
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
  /* border-bottom: 1px solid #e8e8e8; */
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

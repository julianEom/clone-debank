'use client';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { DEFAULT_TRANSACTION } from './config';
import { Records, Transaction } from '../../interface/WhooingTransaction.type';
import WhooingTransactionForm from './WhooingTransactionForm';
import WhooingTransactionRow from './WhooingTransactionRow';
import { updateTransactionAirtable } from '../../api/whooing/airtable';

type Props = {
  transactions: Transaction[];
};

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 845,
  padding: 0,
  boxShadow: 24,
};

const WhooingTransactions = ({ transactions }: Props) => {
  const tableId = process.env.NEXT_PUBLIC_AIRTABLE_TABLE_ID as string;
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTx, setSelectedTx] =
    useState<Transaction>(DEFAULT_TRANSACTION);
  const [recordId, setRecordId] = useState<string>('');
  const onClickModify = (data: any) => {
    data?.fields &&
      (setOpen(true), setRecordId(data.id), setSelectedTx(data.fields));
  };
  const updateTransaction = (data: Transaction) => {
    if (data.item.length === 0 || !data.date) {
      alert('아이템 이름과 날짜를 입력해주세요.');
      return;
    }
    const params = {
      ...data,
      date: new Date(data.date),
      price: Number(data.price),
    };
    try {
      updateTransactionAirtable(params, tableId, recordId);
      alert('입력 완료!');
      setOpen(false);
    } catch (err) {
      alert('에러! ');
    }
  };
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
          <div />
        </TransactionRow>

        {transactions.length > 0 &&
          transactions.map((tx, i) => (
            <WhooingTransactionRow
              onClickModify={onClickModify}
              data={tx}
              key={i}
            />
          ))}
      </ul>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>
          <WhooingTransactionForm
            defaultTx={selectedTx}
            onClickSubmit={updateTransaction}
          />
        </Box>
      </Modal>
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
  div:nth-child(1),
  div:nth-child(2) {
    width: 24%;
    text-align: left;
  }
  div:nth-child(3) {
    width: 12%;
    text-align: right;
  }
  div:nth-child(4),
  div:nth-child(5) {
    width: 17%;
    text-align: right;
  }
  div:nth-child(6) {
    width: 6%;
    text-align: right;
  }
  p {
    font-size: 14px;
    color: #939393;
    font-weight: 600;

    margin: 0;
  }
`;

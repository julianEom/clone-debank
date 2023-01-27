'use client';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  getTransactionsAirtable,
  addTransactionAirtable,
} from '../../api/whooing/airtable';
import {
  getTransactionsMongo,
  addTransactionMongo,
} from '../../api/whooing/mongo';
import { DEFAULT_TRANSACTION } from '../../components/whooing/config';
import { Records, Transaction } from '../../interface/WhooingTransaction.type';
import WhooingTransactionForm from '../../components/whooing/WhooingTransactionForm';
import WhooingTransactions from '../../components/whooing/WhooingTransactions';

const Page = () => {
  const tableId = process.env.NEXT_PUBLIC_AIRTABLE_TABLE_ID as string;

  const { data: airtableData, isLoading: airtableLoading } = useQuery(
    'airtableData' + tableId,
    () => getTransactionsAirtable(tableId),
    {
      suspense: true,
    }
  );

  // const {
  //   data: mongoData,
  //   isLoading: mongoLoading,
  //   isError,
  // } = useQuery('mongoData' + tableId, () => getTransactionsMongo(tableId), {
  //   suspense: true,
  // });

  const submitForm = (data: Transaction) => {
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
      addTransactionMongo(params);
      addTransactionAirtable(params, tableId);
      alert('입력 완료!');
    } catch (err) {
      alert('에러! ');
    }
  };

  return (
    <StyledSection>
      <h1>Whooing 거래 입력</h1>
      <WhooingTransactionForm
        defaultTx={DEFAULT_TRANSACTION}
        onClickSubmit={submitForm}
      />

      <h1>Whooing 거래 내역 - Airtable</h1>
      {airtableLoading ? (
        <LoadingWrapper>Loading...</LoadingWrapper>
      ) : (
        <WhooingTransactions
          transactions={airtableData
            .map((row: Records) => ({
              ...row,
              ...row.fields,
            }))
            .sort((a: any, b: any) => {
              return Number(new Date(b.date)) - Number(new Date(a.date));
            })}
        />
      )}

      {/* <h1>Whooing 거래 내역 - Mongo</h1>
      {isError || mongoLoading ? (
        <LoadingWrapper>Loading...</LoadingWrapper>
      ) : (
        <WhooingTransactions
          transactions={mongoData.sort((a: any, b: any) => {
            return Number(new Date(b.date)) - Number(new Date(a.date));
          })}
        />
      )} */}
    </StyledSection>
  );
};
export default Page;

const StyledSection = styled.section`
  h1 {
    font-size: 22px;
    margin-top: 24px;
  }
`;

const LoadingWrapper = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 6px;
  margin-bottom: 16px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.05);
`;

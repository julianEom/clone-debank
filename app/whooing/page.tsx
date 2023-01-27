'use client';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getTransactionsAirtable } from '../../api/whooing/airtable';
import { getTransactionsMongo } from '../../api/whooing/mongo';
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

  const { data: mongoData, isLoading: mongoLoading } = useQuery(
    'mongoData' + tableId,
    () => getTransactionsMongo(tableId),
    {
      suspense: true,
    }
  );

  return (
    <StyledSection>
      <h1>Whooing 거래 입력</h1>
      <WhooingTransactionForm tableId={tableId} />

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
            .sort((a, b) => {
              return Number(new Date(b.date)) - Number(new Date(a.date));
            })}
        />
      )}

      <h1>Whooing 거래 내역 - Mongo</h1>
      {mongoLoading ? (
        <LoadingWrapper>Loading...</LoadingWrapper>
      ) : (
        <WhooingTransactions
          transactions={mongoData.sort((a, b) => {
            return Number(new Date(b.date)) - Number(new Date(a.date));
          })}
        />
      )}
    </StyledSection>
  );
};
export default Page;

const StyledSection = styled.section`
  h1 {
    font-size: 22px;
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

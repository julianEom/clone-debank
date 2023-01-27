import axios, { AxiosAdapter } from 'axios';
import { Transaction } from '../../interface/WhooingTransaction.type';

const header = () => {
  const header = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
      'Content-type': 'application/json',
    },
  };
  return header;
};

export const getTransactions = async () => {
  const result = await axios.get(
    `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/${process.env.NEXT_PUBLIC_AIRTABLE_TABLE_ID}`,
    header()
  );
  return result.data.records;
};

export const updateTransactionMDB = async (data: Transaction) => {
  const result = await axios.post(
    'http://localhost:3000/api/whooing/whooing',
    data
  );
  return result.data;
};

export const updateTransaction = async (data: Transaction) => {
  const body = {
    records: [
      {
        fields: data,
      },
    ],
  };
  const result = await axios.post(
    `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/${process.env.NEXT_PUBLIC_AIRTABLE_TABLE_ID}`,
    body,
    header()
  );
  console.log('🚀 ~ file: whooing.ts:33 ~ updateTransaction ~ result', result);
  return result;
};

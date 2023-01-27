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
const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

export const getTransactionsAirtable = async (tableId: string) => {
  const result = await axios.get(
    `https://api.airtable.com/v0/${BASE_ID}/${tableId}`,
    header()
  );
  return result.data.records;
};

export const addTransactionAirtable = async (
  data: Transaction,
  tableId: string
) => {
  const body = {
    records: [
      {
        fields: data,
      },
    ],
  };
  const result = await axios.post(
    `https://api.airtable.com/v0/${BASE_ID}/${tableId}`,
    body,
    header()
  );
  return result;
};

export const updateTransactionAirtable = async (
  data: Transaction,
  tableId: string,
  recordId: string
) => {
  const body = {
    fields: data,
  };
  const result = await axios.patch(
    `https://api.airtable.com/v0/${BASE_ID}/${tableId}/${recordId}`,
    body,
    header()
  );
  return result;
};

export const deleteTransactionAirtable = async (
  tableId: string,
  recordId: string
) => {
  const result = await axios.delete(
    `https://api.airtable.com/v0/${BASE_ID}/${tableId}/${recordId}`,
    header()
  );
  return result;
};

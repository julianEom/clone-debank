import axios, { AxiosAdapter } from 'axios';
import { Transaction } from '../../interface/WhooingTransaction.type';

export const getTransactionsMongo = async (tableId: string) => {
  const result = await axios.get('http://localhost:3000/api/whooing/mongo');
  return result.data.data;
};

export const addTransactionMongo = async (data: Transaction) => {
  const result = await axios.post(
    'http://localhost:3000/api/whooing/mongo',
    data
  );
  return result.data;
};

import axios, { AxiosAdapter } from 'axios';

export const getTransactions = async () => {
  const result = await axios.get('http://localhost:3000/api/whooing/whooing');
  return result.data.data;
};

// TODO : type update
export const updateTransaction = async (data: any) => {
  const result = await axios.post(
    'http://localhost:3000/api/whooing/whooing',
    data
  );
  return result.data;
};

import axios, { AxiosAdapter } from 'axios';

export const getTransactions = async () => {
  const result = await axios.get('http://localhost:3000/api/whooing/whooing');
  console.log('result', result);
  return result;
};

// TODO : type update
export const updateTransaction = async (data: any) => {
  const result = await axios.post(
    'http://localhost:3000/api/whooing/whooing',
    data
  );
  console.log('result', result);
  return result;
};

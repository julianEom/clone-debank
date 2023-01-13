import { ITransaction, Transaction, TransactionNFT, TransactionStreaming } from "../interface/Transaction.type";
import { REJECTED_FUNCTIONS } from "./topic";

export const shortAddress = (address:string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
}
export const getDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleString();
}
export const filterTransaction = (transactions:ITransaction) => {
  // console.log('transactions name',transactions.functionName);
  const functionName = transactions.functionName?.split('(')[0] || '';
  return REJECTED_FUNCTIONS.includes(functionName);
}
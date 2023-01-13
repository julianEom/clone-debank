import axios, { AxiosAdapter } from "axios"
import { ITransaction, Transaction, TransactionNFT } from "../../interface/Transaction.type"
const prefix = "https://api.etherscan.io/api"
const prefix_goerli = "https://api-goerli.etherscan.io//api"
const key = process.env.etherscanKey
type TransactionHash = {
  result: ITransaction[];
}
export const getTransactionHash = async (address: string, network?:string) => {
  const url = network === 'goerli' ? prefix_goerli : prefix;
  const result = await axios.get<TransactionHash>(
    `${url}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=30&sort=desc&apikey=${key}`,
  ).then((res) => {return res.data});
  return result;
}
export const getTransactionNFTHash = async (address: string, network?:string) => {
  const url = network === 'goerli' ? prefix_goerli : prefix;
  const result = await axios.get<TransactionHash>(
    `${url}?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=99999999&page=1&offset=20&sort=desc&apikey=${key}`,
  ).then((res) => {return res.data});
  return result;
}
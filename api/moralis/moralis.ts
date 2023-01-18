import { MoralisNextApi } from "@moralisweb3/next";
import axios from "axios";
import { EvmChain } from "moralis/common-evm-utils";
import type { NextApiRequest, NextApiResponse } from 'next'
const key = process.env.MORALIS_API_KEY ? process.env.MORALIS_API_KEY : '';

const getBalance = async() =>{
  const result = axios.get('http://localhost:3000/api/moralis/evmApi/getNativeBalance?address=0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063&chain=ETHEREUM')
  console.log('result',result);
  return result
}
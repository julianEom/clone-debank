import { MoralisNextApi } from "@moralisweb3/next";
import { EvmChain } from "moralis/common-evm-utils";
import Moralis from "../../app/api/moralis/[...moralis]";
import type { NextApiRequest, NextApiResponse } from 'next'
const key = process.env.MORALIS_API_KEY ? process.env.MORALIS_API_KEY : '';
const moralis =  MoralisNextApi({ apiKey: key });

const getBalance = async(req:NextApiRequest,res:NextApiResponse) =>{
  Moralis
  const address =
    "0xaae93882e8a9fe9ff30151853db20e4cd161940757a01744465ab83b751c5875";

  const chain = EvmChain.ETHEREUM;

  const response = await Moralis(req,res).then((result) => {console.log('moralis',result)});

}
export type ITransaction = {
  "blockHash":string;
  "blockNumber":string;
  "confirmations":string;
  "contractAddress":string;
  "cumulativeGasUsed":string;
  "from":string;
  "gas":string;
  "gasPrice":string;
  "gasUsed":string;
  "hash":string;
  "input":string;
  "nonce":string;
  "timeStamp":string;
  "to":string;
  "tokenDecimal":string;
  "tokenID":string;
  "tokenName":string;
  "tokenSymbol":string;
  "isError":string;
  "txreceipt_status":string;
  "methodId":string;
  "functionName":string;
  "transactionIndex": string;
  "value": string;
  "type": string;
  "chainId": string;
  "v": string;
  "r": string;
  "s": string;
}
export type Transaction = {
  "blockNumber":string;
  "timeStamp":number;
  "hash":string;
  "nonce":string;
  "blockHash":string;
  "transactionIndex":string;
  "from":string;
  "to":string;
  "value":string;
  "gas":string;
  "gasPrice":string;
  "isError":string;
  "txreceipt_status":string;
  "input":string;
  "contractAddress":string;
  "cumulativeGasUsed":string;
  "gasUsed":string;
  "confirmations":string;
  "methodId":string;
  "functionName":string;
}
export type TransactionStreaming = {
  "blockHash": string;
  "blockNumber": string;
  "from": string;
  "gas": string;
  "gasPrice": string;
  "hash": string;
  "input": string;
  "nonce": string;
  "to": string;
  "transactionIndex": string;
  "value": string;
  "type": string;
  "chainId": string;
  "v": string;
  "r": string;
  "s": string;
}
export type TransactionNFT = Transaction & {
  "blockHash":string;
  "blockNumber":string;
  "confirmations":string;
  "contractAddress":string;
  "cumulativeGasUsed":string;
  "from":string;
  "gas":string;
  "gasPrice":string;
  "gasUsed":string;
  "hash":string;
  "input":string;
  "nonce":string;
  "timeStamp":string;
  "to":string;
  "tokenDecimal":string;
  "tokenID":string;
  "tokenName":string;
  "tokenSymbol":string;
  "transactionIndex":string;
}
export type Receipt = {
  "transactionHash": string;
  "from": string;
  "to": string;
  "cumulativeGasUsed": string;
  "gasUsed": string;
  "contractAddress": string;
  "logs": [
    {
      "blockHash": string;
      "blockNumber": string;
      "transactionIndex": string;
      "address": string;
      "logIndex": string;
      "data": string;
      "removed": boolean;
      "topics": string[];
      "transactionHash": string;    
    }
  ],
  "logsBloom": string;
  "root": string;
  "status": number,
  "effectiveGasPrice": string;
  "type": string;}
'use client';
import {
  TokenMetadataResponse,
  TransactionReceiptsBlockHash,
  Utils,
} from 'alchemy-sdk';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  getTokenMetadata,
  getTransactionReceipt,
} from '../../api/alchemy/history';
import {
  ITransaction,
  Transaction,
  TransactionNFT,
  TransactionStreaming,
} from '../../interface/Transaction.type';
import { filterTransaction, getDate, shortAddress } from '../../lib/utils';
import type { TransactionReceipt, Log } from '@ethersproject/abstract-provider';
import { TRANSFER } from '../../lib/topic';
import Image from 'next/image';
import { contracts } from '../../lib/contracts';
import { BigNumber, utils } from 'ethers';
import Link from 'next/link';

const TransferRow = ({ transfer, plus }: { transfer: Log; plus: Boolean }) => {
  const [log, setLog] = useState<Log>(transfer);
  const [metadata, setMetadata] = useState<TokenMetadataResponse>();
  const [amount, setAmount] = useState<number | null>();
  const [tokenId, setTokenId] = useState('');
  // const memoMetaData = useMemo(
  //   () => getTokenMetadata(transfer.address),
  //   [transfer.address]
  // );
  useEffect(() => {
    getTokenMetadata(transfer.address).then((res) => {
      setMetadata(res);
    });
  }, []);
  // useEffect(() => {
  //   // console.log(memoMetaData);
  //   memoMetaData.then((res) => setMetadata(res));
  // }, [memoMetaData]);
  useEffect(() => {
    if (!metadata) return;
    const decimals = metadata.decimals ? metadata.decimals : 18;
    const value = parseInt(transfer.data) / 10 ** decimals;

    isNaN(value)
      ? setTokenId(`# ${parseInt(transfer.topics[3])}`)
      : setAmount(value);
  }, [metadata]);
  return (
    <div className='row'>
      {metadata && amount && (
        <Image
          src={
            metadata.logo
              ? metadata.logo
              : 'https://assets.debank.com/static/media/default.b2295297.svg'
          }
          alt={`${metadata.name}`}
          width={28}
          height={28}
        />
      )}
      {metadata && tokenId && (
        <Image
          src={'https://assets.debank.com/static/media/default.b2295297.svg'}
          alt={`nft`}
          width={28}
          height={28}
        />
      )}
      {amount && (
        <div className={`${plus && 'plus'}`}>
          {plus ? '+' : '-'}
          {parseFloat(amount.toFixed(5))} {metadata?.symbol}
        </div>
      )}
      {tokenId && (
        <div className={`${plus && 'plus'}`}>
          {plus ? '+' : '-'}
          {metadata?.symbol} {tokenId}
        </div>
      )}
    </div>
  );
};

const EtherRow = ({ value, plus }: { value: string; plus: Boolean }) => {
  const ethers = utils.formatEther(value);
  return (
    <div className='row'>
      {
        <Image
          src={
            'https://static.debank.com/image/token/logo_url/eth/935ae4e4d1d12d59a99717a24f2540b5.png'
          }
          alt={`ethers`}
          width={28}
          height={28}
        />
      }
      {/* <div>{plus ? `+ ${ethers}` : `- ${ethers}`}</div> */}
      <div>
        {plus ? '+' : '-'}
        {ethers} ETH
      </div>
    </div>
  );
};

type Props = {
  transaction: ITransaction;
  address: string;
};
type ContractMetadata = { name: string; address: string; logo: string };
const HistoryRow = ({ transaction, address }: Props) => {
  const formedAddress = address.substr(-5);
  const [receipt, setReceipt] = useState<TransactionReceipt | null>(null);
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [transfer, setTransfer] = useState<Log[]>([]);
  const [transactionMetadata, setTransactionMetadata] =
    useState<ContractMetadata | null>();

  useEffect(() => {
    console.log('transaction', transaction);
    getTransactionReceipt(transaction.hash).then((res) => {
      setReceipt(res);
    });
    const cont = contracts.find(
      (contract) =>
        contract.address == transaction.to ||
        contract.address == transaction.from
    );
    // setTransactionMetadata(cont);

    contracts.find((contract) => {
      contract.address == transaction.to || contract.address == transaction.from
        ? setTransactionMetadata(contract)
        : null;
    });
  }, []);

  useEffect(() => {
    let tempTransfer: Log[] = [];
    receipt?.logs.forEach((log) => {
      log.topics[0] === TRANSFER &&
        log.topics.length > 2 &&
        (log.topics[1].includes(formedAddress) ||
          log.topics[2].includes(formedAddress)) &&
        tempTransfer.push(log);
    });
    setTransfer(tempTransfer);
  }, [receipt]);
  useEffect(() => {
    // transfer.map((log, i) => {
    //   getTokenMetadata(log.address).then((res) => {
    //     console.log('res', res);
    //     setTransfer((prev) =>
    //       prev.map((log, j) => (i === j ? { ...log, ...res } : log))
    //     );
    //   });
    // });
    console.log('transfer ?', transfer);
  }, [transfer]);
  const calculateGasFee = (
    effectiveGasPrice: BigNumber,
    gasUsed: BigNumber
  ) => {
    const result =
      utils.formatEther(effectiveGasPrice) *
      utils.formatEther(gasUsed) *
      10 ** 18;
    const res = result.toFixed(5);
    return res;
  };
  return (
    <StyledHistoryRow>
      <div className='first'>
        <div className='light top'>{getDate(transaction.timeStamp)}</div>
        <Link
          className='light'
          href={`https://etherscan.io/tx/${transaction.hash}`}
        >
          {shortAddress(transaction.hash)}
        </Link>
      </div>
      <div className='row'>
        <Image
          src={
            transactionMetadata?.logo ||
            'https://static.debank.com/image/project/logo_url/compound3/28e2b958e38eb0c49d600633b9ce0969.png'
          }
          alt={'bridge'}
          width={28}
          height={28}
        />
        <div>
          {transaction.functionName?.split('(')[0] ? (
            <div className='light'>
              {transaction.functionName.split('(')[0]}
            </div>
          ) : (
            <div className='light'>
              {transaction.to.includes(formedAddress) ? 'Receive' : 'Send'}
            </div>
          )}
          <div>{transactionMetadata?.name}</div>
        </div>
      </div>
      <div>
        {transaction.value && parseInt(transaction.value) > 0 && (
          <EtherRow
            value={transaction.value}
            plus={transaction.to.includes(formedAddress)}
          />
        )}
        {transfer.map((log, i) => (
          <TransferRow
            key={i}
            transfer={log}
            metadata={transfer}
            plus={log.topics[2].includes(formedAddress)}
          />
        ))}
      </div>
      <div className='light'>
        Gas Fee{' '}
        {receipt &&
          `ETH ${calculateGasFee(receipt.effectiveGasPrice, receipt.gasUsed)}`}
      </div>
    </StyledHistoryRow>
  );
};
export default HistoryRow;
const StyledHistoryRow = styled.div`
  min-height: 38px;
  padding: 24px 0;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  flex-direction: row;

  div:nth-child(1) {
    width: 135px;
  }
  div:nth-child(2) {
    width: 290px;
  }
  div:nth-child(3) {
    width: 290px;
  }
  div:nth-child(3) {
  }
  .light {
    font-size: 12px;
    color: #8b93a7;
  }

  .top {
    margin-bottom: 8px;
  }
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 13px;
    img {
      margin-right: 10px;
    }
  }
  .plus {
    color: #00c087;
  }
  .nft {
    width: 28px;
    height: 28px;
  }
`;

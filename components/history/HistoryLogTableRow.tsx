'use client';
import { Log } from '@ethersproject/abstract-provider';
import Image from 'next/image';
import { Suspense, useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getTokenMetadata } from '../../api/alchemy/history';
import { shortAddress } from '../../lib/utils';

type Props = {
  log: Log;
  send: boolean;
};
const HistoryLogTableRow = ({ log, send }: Props) => {
  const { data: tokenMetadata } = useQuery(
    'getTokenMetadata' + log.address,
    () => getTokenMetadata(log.address),
    {
      suspense: true,
    }
  );

  useEffect(() => {
    const value = tokenMetadata
      ? parseInt(log.data) / 10 ** (tokenMetadata?.decimals || 0)
      : 0;
  }, [tokenMetadata]);
  return (
    <StyledHistoryLogTableRow>
      <Suspense fallback={<h1>Loading profile...</h1>}>
        <div>{shortAddress(log.address)}</div>
        <div>
          <Image
            src={
              tokenMetadata?.logo ||
              'https://static.debank.com/image/project/logo_url/compound3/28e2b958e38eb0c49d600633b9ce0969.png'
            }
            alt={'bridge'}
            width={28}
            height={28}
          />
          <div>
            {/* {transaction.functionName?.split('(')[0] ? (
            <div className='light'>
              {transaction.functionName.split('(')[0]}
            </div>
          ) : (
            <div className='light'>
              {transaction.to.includes(formedAddress) ? 'Receive' : 'Send'}
            </div>
          )} */}
            <div>{tokenMetadata?.name}</div>
          </div>
        </div>
        <div>
          {send &&
            (tokenMetadata
              ? parseInt(log.data) / 10 ** (tokenMetadata?.decimals || 0)
              : 0)}
        </div>
        <div>
          {!send &&
            (tokenMetadata
              ? parseInt(log.data) / 10 ** (tokenMetadata?.decimals || 0)
              : 0)}
        </div>
        <div>{log.logIndex}</div>
      </Suspense>
    </StyledHistoryLogTableRow>
  );
};
export default HistoryLogTableRow;
const StyledHistoryLogTableRow = styled.div`
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

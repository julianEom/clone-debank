'use client';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getTokenMetadata } from '../../api/alchemy/history';
import { Log } from '@ethersproject/abstract-provider';
import { Suspense, useEffect, useState } from 'react';
import { hexValue } from 'ethers/lib/utils';
import { TokenMetadataResponse } from 'alchemy-sdk';

type Props = { log: Log; address: string };
const HisotryLogRow = (props: Props) => {
  const { log, address } = props;
  const [amount, setAmount] = useState<number | null>(0);
  const { data: tokenMetadata, isLoading } = useQuery<TokenMetadataResponse>(
    'getTokenMetadata' + log.address,
    () => getTokenMetadata(log.address)
  );
  useEffect(() => {
    if (!tokenMetadata) return;
    const decimals = tokenMetadata.decimals ? tokenMetadata.decimals : 18;
    const val = parseInt(log.data) / 10 ** decimals;
    console.log('val', tokenMetadata?.name, val);
    setAmount(parseFloat(val.toFixed(5)));
  }, [tokenMetadata]);
  useEffect(() => {
    console.log('amount', amount);
  }, [amount]);
  return isLoading ? (
    <StyledRow>
      <div>Loading...</div>
    </StyledRow>
  ) : (
    <StyledRow>
      <div>{tokenMetadata?.name}</div>
      <div className='send'>
        {log.topics[1].includes(address.slice(2)) &&
          `- ${amount} ${tokenMetadata.symbol}`}
      </div>
      <div className='receive'>
        {log.topics[2].includes(address.slice(2)) &&
          `+ ${amount} ${tokenMetadata.symbol}`}
      </div>
    </StyledRow>
  );
};
export default HisotryLogRow;
const StyledRow = styled.section`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
  div:nth-child(1) {
    max-width: 185px;
  }
  div:nth-child(2) {
    width: 155px;
  }
  div:nth-child(3) {
    width: 155px;
  }
  .receive {
    color: #00c087;
  }
`;

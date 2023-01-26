import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Transaction } from '../../interface/WhooingTransaction.type';
import { getTransactions, updateTransaction } from '../../api/whooing/whooing';

const WhooingTransactions = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const getData = async () => {
    const _data = await getTransactions();
    setData(_data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <StyledRow>
      <ul>
        {data.length > 0 &&
          data.map((tx, i) => (
            <TxContent key={i}>
              <p>{tx?.date?.toString()}</p>
              <p>{tx.item}</p>
              <p>{tx.price}</p>
              <p>{tx.debtorItem}</p>
              <p>{tx.creditorItem}</p>
            </TxContent>
          ))}
      </ul>
    </StyledRow>
  );
};

export default WhooingTransactions;

const StyledRow = styled.section`
  width: 100%;
  ul {
    padding: 0;
  }
`;

const TxContent = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #e5e5e5;
  p {
    margin: 0;
  }
`;

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Transaction } from '../../interface/WhooingTransaction.type';
import { getTransactions, updateTransaction } from '../../api/whooing/whooing';

const WhooingTransactions = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const getData = async () => {
    const _data = await getTransactions();
    console.log(
      '🚀 ~ file: WhooingTransactions.tsx:10 ~ getData ~ _data',
      _data
    );
    setData(_data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <StyledRow>
      <ul>
        <TxContent>
          <div>
            <p>날짜</p>
          </div>
          <div>
            <p>아이템</p>
          </div>
          <div>
            <p>가격</p>
          </div>
          <div>
            <p>차변</p>
          </div>
          <div>
            <p>대변</p>
          </div>
        </TxContent>

        {data.length > 0 &&
          data
            .sort((a, b) => {
              return Number(b._id) - Number(a._id);
            })
            .map((tx, i) => (
              <TxContent key={i}>
                <div>
                  <p>{tx?.fields?.date?.toString()}</p>
                </div>
                <div>
                  <p className='bold'>{tx?.fields.item}</p>
                  {tx?.fields.memo && <p className='memo'>{tx?.fields.memo}</p>}
                </div>
                <div>
                  <p className='bold'>{tx?.fields.price}</p>
                </div>
                <div>
                  <p>
                    {tx?.fields.debtorType} ({tx?.fields.debtorCategory})
                  </p>
                </div>
                <div>
                  <p>
                    {tx?.fields.creditorType} ({tx?.fields.creditorCategory})
                  </p>
                </div>
              </TxContent>
            ))}
      </ul>
    </StyledRow>
  );
};

export default WhooingTransactions;

const StyledRow = styled.section`
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 6px;
  margin-bottom: 16px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.05);
  ul {
    padding: 0;
  }
`;

const TxContent = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100%-40px);
  padding: 10px;
  border-bottom: 1px solid #e5e5e5;
  div:nth-child(1) {
    width: 25%;
    text-align: left;
  }
  div:nth-child(2) {
    width: 30%;
    text-align: left;
  }
  div:nth-child(3) {
    width: 15%;
    text-align: right;
  }
  div:nth-child(4) {
    width: 15%;
    text-align: right;
  }
  div:nth-child(5) {
    width: 15%;
    text-align: right;
  }
  p {
    font-size: 13px;
    margin: 0;
  }
  p.memo {
    font-size: 12px;
    color: #999;
  }
  p.bold {
    font-weight: 600;
  }
`;

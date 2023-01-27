'use client';
import { useEffect } from 'react';
import styled from 'styled-components';
import { AirtableTxRecord } from '../../interface/Airtable.type';
import { delay } from './delay';
type Props = { list: AirtableTxRecord[] };
const TxTable = ({ list }: Props) => {
  // await delay(800);

  return (
    <TableContainer>
      {list ? (
        list.map((item, i) => {
          return (
            <div key={i}>
              {item.id} {item.fields.item}
            </div>
          );
        })
      ) : (
        <div>empty...</div>
      )}
    </TableContainer>
  );
};
export default TxTable;
const TableContainer = styled.section`
  width: 900px;
  background-color: white;
  margin-top: 15px;
  padding: 10px 24px;
`;

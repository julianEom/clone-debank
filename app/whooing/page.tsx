'use client';
import styled from 'styled-components';
import { getTraces, updateTrace } from '../../api/whooing/whooing';

const Page = () => {
  return (
    <StyledSection>
      <h1>Whooing</h1>

      <button onClick={getTraces}>GET2</button>
      <button onClick={() => updateTrace({ type: 'test' })}>POST</button>
    </StyledSection>
  );
};
export default Page;

const StyledSection = styled.section`
  .table {
    min-height: 960px;
    width: 900px;
    background-color: white;
    margin-top: 15px;
    padding: 0 24px;
  }
`;

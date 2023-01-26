'use client';
import styled from 'styled-components';
import WhooingTransactionForm from '../../components/whooing/WhooingTransactionForm';
import WhooingTransactions from '../../components/whooing/WhooingTransactions';

const Page = () => {
  return (
    <StyledSection>
      <h1>Whooing 거래 입력</h1>
      <WhooingTransactionForm />

      <h1>Whooing 거래 내역</h1>
      <WhooingTransactions />
    </StyledSection>
  );
};
export default Page;

const StyledSection = styled.section`
  h1 {
    font-size: 22px;
  }
`;

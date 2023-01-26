'use client';
import styled from 'styled-components';
import WhooingTransactionForm from '../../components/whooing/WhooingTransactionForm';

const Page = () => {
  return (
    <StyledSection>
      <h1>Whooing 거래입력</h1>

      <WhooingTransactionForm />
    </StyledSection>
  );
};
export default Page;

const StyledSection = styled.section`
  h1 {
    font-size: 22px;
  }
`;

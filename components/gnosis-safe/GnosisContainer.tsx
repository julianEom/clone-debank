'use client';
import styled from 'styled-components';
import GSafe from './Safe';

const GnosisContainer = () => {
  return (
    <Container>
      <h1>Gnosis Safe</h1>
      <GSafe />
    </Container>
  );
};
export default GnosisContainer;
const Container = styled.section`
  min-height: 960px;
  width: 900px;
  background-color: white;
  margin-top: 15px;
  padding: 0 24px;
`;

import Link from 'next/link';
import styled from 'styled-components';

const Tap = () => {
  return (
    <StyledTap>
      <StyledNav>
        <Link href='/history'>History</Link>
      </StyledNav>
    </StyledTap>
  );
};
const StyledTap = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafbfc;
  /* background-color: blue; */
`;
const StyledNav = styled.div`
  width: 948px;
  align-items: flex-start;
  a {
    margin: 10px;
  }
`;
export default Tap;

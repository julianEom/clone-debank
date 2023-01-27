import Link from 'next/link';
import styled from 'styled-components';

const routes = [
  {
    name: 'History',
    path: '/history',
  },
  {
    name: 'History Log',
    path: '/history-log',
  },
  {
    name: 'Safe',
    path: '/gnosis-safe',
  },
  {
    name: 'Decode Tx',
    path: '/decode',
  },
  {
    name: 'WhooingJL',
    path: '/whooing-jl',
  },
];

const Tap = () => {
  return (
    <StyledTap>
      <StyledNav>
        {routes.map((route, i) => {
          return (
            <Link key={i} href={route.path}>
              {route.name}
            </Link>
          );
        })}
      </StyledNav>
    </StyledTap>
  );
};
const StyledTap = styled.div`
  height: 30px;
  width: 948px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fafbfc;
  /* background-color: blue; */
`;
const StyledNav = styled.div`
  align-items: flex-start;
  a {
    margin: 10px;
  }
`;
export default Tap;

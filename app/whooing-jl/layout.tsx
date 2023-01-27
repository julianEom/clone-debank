'use client';
import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return <>{children}</>;
};
export default Layout;
const StyledLayout = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

'use client';
import React from 'react';
import styled from 'styled-components';
import { GnosisProvider } from '../../components/Provider/GnosisProvider';

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return <GnosisProvider>{children}</GnosisProvider>;
};
export default Layout;

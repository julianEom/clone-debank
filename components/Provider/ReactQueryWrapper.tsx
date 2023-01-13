'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

type Props = { children: React.ReactNode };

const ReactQueryWrapper = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
  </QueryClientProvider>
);

export default ReactQueryWrapper;

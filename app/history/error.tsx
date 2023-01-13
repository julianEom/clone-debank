'use client';
import { useEffect } from 'react';

export default function Error({ error, reset }: any) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return <div>Error !! web3React </div>;
}

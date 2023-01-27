'use client';
import { Suspense, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getTxList, getWhoAmI } from '../../api/whooing-jl/airtable';
import InsertForm from '../../components/whooing-jl/InsertForm';
import TxTable from '../../components/whooing-jl/TxTable';

const Page = () => {
  const { data: txList } = useQuery('getWhoAmI' + 1, () => getTxList(), {
    suspense: true,
  });
  useEffect(() => {
    console.log('whoAmI', txList);
  }, [txList]);
  return (
    <div>
      <InsertForm />
      <Suspense fallback={<div>Loading...!</div>}>
        <TxTable list={txList?.data.records} />
      </Suspense>
    </div>
  );
};
export default Page;

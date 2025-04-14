//import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/search/search';
import MoreSearchStories from './_components/more-search-stories';

import { Suspense } from 'react';
//import { fetchInvoicesPages } from '@/app/lib/data';
import { MoreStoriesSkeleton } from './_components/skeletons';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    min_len?: number;
    max_len?: number;
    page?: string;
  }>;
}) {
  const pl_hold = {
    key_word: "...מילת מפתח בטיול",
    min_len: 9,
    max_len: 10,
    pg_num:1,
  };
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const min_len = searchParams?.min_len || pl_hold.min_len;
  const max_len = searchParams?.max_len || pl_hold.max_len;
  const currentPage = Number(searchParams?.page) || pl_hold.pg_num;


  //const totalPages = await fetchInvoicesPages(query);
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Search Stories</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search keyword_pl_hold={pl_hold.key_word} min_len_pl_hold={pl_hold.min_len} max_len_pl_hold={pl_hold.min_len} />
      </div>
        <Suspense key={query + min_len + max_len + currentPage} fallback={<MoreStoriesSkeleton />}>
        <MoreSearchStories query={query}  min_len={min_len} max_len={max_len} currentPage={currentPage} />
      </Suspense> 
{/*      <div className="mt-5 flex w-full justify-center">
         <Pagination totalPages={totalPages} /> 
      </div>*/}
    </div>
  );
}
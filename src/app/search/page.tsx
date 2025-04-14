//import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/search/search2';
import MoreSearchStories from './_components/more-search-stories';

import { Suspense } from 'react';
//import { fetchInvoicesPages } from '@/app/lib/data';
import { MoreStoriesSkeleton } from './_components/skeletons';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  //const totalPages = await fetchInvoicesPages(query);
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Search Stories</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="...מילת מפתח בטיול" />
      </div>
        <Suspense key={query + currentPage} fallback={<MoreStoriesSkeleton />}>
        <MoreSearchStories query={query} currentPage={currentPage} />
      </Suspense> 
{/*      <div className="mt-5 flex w-full justify-center">
         <Pagination totalPages={totalPages} /> 
      </div>*/}
    </div>
  );
}
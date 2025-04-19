//import Pagination from '@/app/ui/invoices/pagination';
import Search from './search';
import MoreSearchStories from './_components/more-search-stories';
import Header from './_components/header'
import { MoreStoriesSkeleton } from './_components/skeletons';

import { Suspense } from 'react';
import Container from '../_components/container';
import { PostTitle } from '../_components/post-title';
//import { fetchInvoicesPages } from '@/app/lib/data';


const pl_hold = {
  key_word: "...מילת מפתח בטיול",
  min_len: 9,
  max_len: 10,
  pg_num:1,
  east: 60,
  west: 20,
  north: 40,
  south: 20,
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    min_len?: number;
    max_len?: number;
    page?: string;
    east? : number;
    west? : number;
    north? : number;
    south? : number;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const min_len = searchParams?.min_len || pl_hold.min_len;
  const max_len = searchParams?.max_len || pl_hold.max_len;
  const currentPage = Number(searchParams?.page) || pl_hold.pg_num;
  const east = searchParams?.east || pl_hold.east;
  const west = searchParams?.west || pl_hold.west;
  const north = searchParams?.north || pl_hold.north;
  const south = searchParams?.south || pl_hold.south;

  //const totalPages = await fetchInvoicesPages(query);
  
  return (
    <Container>

      {/*<Header />*/}
      <PostTitle>{"Search Stories"}</PostTitle>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search keyword_pl_hold={pl_hold.key_word} min_len_pl_hold={pl_hold.min_len} max_len_pl_hold={pl_hold.max_len} />
      </div>
        <Suspense key={query + min_len + max_len + currentPage} fallback={<MoreStoriesSkeleton />}>
        <MoreSearchStories query={query}  min_len={min_len} max_len={max_len} currentPage={currentPage} east={east}
west={west}
north={north}
south={south}/>
      </Suspense> 
{/*      <div className="mt-5 flex w-full justify-center">
         <Pagination totalPages={totalPages} /> 
      </div>*/}
    </Container>
  );
}
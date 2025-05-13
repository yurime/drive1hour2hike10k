'use client'

import { MagnifyingGlass } from 'geist-icons'

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';



export default function Search({ keyword_pl_hold, min_len_pl_hold, max_len_pl_hold }
  : { keyword_pl_hold: string, min_len_pl_hold : number, max_len_pl_hold : number }) {
   const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleSearch = useDebouncedCallback((term,label) => {
      console.log(`Searching... ${term}`);
      const params = new URLSearchParams(searchParams);
     // console.log(term);
      params.set('page', '1');
      if (term) {
        params.set(label, term);
      } else {
        params.delete(label);
      }
      replace(`${pathname}?${params.toString()}`);
     }, 300);
  
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <form>
        <div>
          Path min length:  km
          <input
            id='search_min_len'
            className="size-fit text-sm text-center placeholder:text-gray-500 w-1/6"
            placeholder={String(min_len_pl_hold)}
            type="number"
            onChange={(e) => {
              handleSearch(e.target.value,'min_len');
            }}
             defaultValue={min_len_pl_hold}
          />
          Path max length:  km
          <input
            id='search_max_len'
            className="size-fit text-sm text-center placeholder:text-gray-500 w-1/6"
            placeholder={String(max_len_pl_hold)}
            type="number"
            onChange={(e) => {
              handleSearch(e.target.value,'max_len');
            }}
            defaultValue={max_len_pl_hold}
          />
        </div>
        <div>
        Keyword in text: 
          <input
            id='search_keywo'
            className="size-fit text-sm text-center placeholder:text-gray-500 w-1/2"
            placeholder={keyword_pl_hold}
            onChange={(e) => {
              handleSearch(e.target.value,'query');
            }}
            defaultValue={searchParams.get('query')?.toString()}
          />
          <MagnifyingGlass className="left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </form>
    </div>
  );
}

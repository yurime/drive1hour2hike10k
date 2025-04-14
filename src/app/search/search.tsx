'use client'

import  {MoreStories}  from "@/app/_components/more-stories";
//import { useDebouncedCallback } from 'use-debounce';// consider adding module to wait for the user finish typing
import { Post } from "@/interfaces/post";

import { useState } from "react";
import  MyMap  from "@/app/search/_components/my-map";
type Props = {
  allPosts:Post[];
};

export default function Search({allPosts}:Props) {
    const [trackMinLength, setTrackMinLength] = useState<Number>(9);
    const [trackMaxLength, setTrackMaxLength] = useState<Number>(11);

   const [resultPosts, setResultPosts] = useState<Post[]>(allPosts);

  const handleSearch = () => {
      console.log(`Searching... ${trackMinLength} <= length <= ${trackMaxLength}`);
      setResultPosts(allPosts
    // find posts with travel distance less than requested
    .filter(  (post1) => ((post1.distance >= trackMinLength.valueOf()) 
                        && (post1.distance <= trackMaxLength.valueOf())
                        )
            )
        );
     };

  return (
    <>
 
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        
    <div>
        <form >
             Path min length:  km
            <input
              id='search'
              className="size-fit text-sm placeholder:text-gray-500"
              placeholder={String(trackMinLength)}
              type="number"
              onChange={(e) => {
                setTrackMinLength(Number(e.target.value));
              }}
               defaultValue={trackMinLength.toString()}
            />
            <div />
              Path max length:  km
             <input
              id='search'
              className="size-fit text-sm placeholder:text-gray-500"
              placeholder={String(trackMaxLength)}
              type="number"
              onChange={(e) => {
                setTrackMaxLength(Number(e.target.value));
              }}
               defaultValue={trackMaxLength.toString()}
            />
              
          <div/>
          <button type="button" onClick={()=>handleSearch()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Search
          </button>
        </form>
        </div>
         {resultPosts.length > 0 && 
          <MyMap  posts={resultPosts}/>}
        {resultPosts.length > 0 && 
          <MoreStories posts={resultPosts} />}
    </>
  );
}

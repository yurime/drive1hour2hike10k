import type {Map, LatLngBounds, LatLngTuple, LatLng } from 'leaflet'
import { Post } from "@/interfaces/post";
import Link from "next/link";
import { MapContainer, 
         Marker, 
         Popup,  
         } from 'react-leaflet'
import  MapLayers  from "@/app/_components/map/map-layers"

import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

 import { useDebouncedCallback } from 'use-debounce';
import { CaptureMouse, CaptureMove, ChangeView } from './my-map-tools';



export type MapProps = {
   posts: Post[];

};

export default function MyMapComponent({posts } : MapProps) {
   
 const num_posts = posts.length;
 const markers = posts.map((post) => ([post.parkingCoords[0],post.parkingCoords[1],]as LatLngTuple) );

 const center = ([posts[0].parkingCoords[0],posts[0].parkingCoords[1],]as LatLngTuple)
 const [bounds, setBounds] = useState(null) as [LatLngBounds|null, (Dispatch<SetStateAction<LatLngBounds|null>>)];

 const [mouseCoord, setMouseCoord] = useState(null) as [LatLng|null, (Dispatch<SetStateAction<LatLng|null>>)];
 const searchParams = useSearchParams();
 const pathname = usePathname();
 const { replace } = useRouter();
 const postsJoinOnCoords = posts.map(post=>[{'parkingCoords':post.parkingCoords,
                                     'posts':posts.filter((spost)=> (spost.parkingCoords[0]==post.parkingCoords[0] && spost.parkingCoords[1]==post.parkingCoords[1]))}]);



 const handleSearch = useDebouncedCallback(() => {
      const params = new URLSearchParams(searchParams);
     // console.log(term);
      params.set('page', '1');
      if (bounds) {
        params.set('east', bounds.getEast().toFixed(4));
        params.set('west', bounds.getWest().toFixed(4));
        params.set('north', bounds.getNorth().toFixed(4));
        params.set('south', bounds.getSouth().toFixed(4));
      } else {
        params.delete('east');
        params.delete('west');
        params.delete('north');
        params.delete('south');
      }
      replace(`${pathname}?${params.toString()}`);
     }, 300);

 //console.log(`center at ... ${center}, num_posts ${num_posts}`);
 //markers.map((marker) => (console.log(`location ... ${marker[0]} , ${marker[1]}`)));

  const [map, setMap] = useState(null) as [Map|null, (Dispatch<SetStateAction<Map|null>>)];
  const displayMap = useMemo(
    () => (<>
        <MapContainer center={center} zoom={13} scrollWheelZoom={true} ref={setMap}>
        {(num_posts>1) && <ChangeView center={center} markers={markers}/>}
         
        <MapLayers />
         {postsJoinOnCoords.map((postC,index) => (
                             <Marker key={"marker".concat(index.toString())} position={postC[0].parkingCoords}>
                              <Popup>
                                <ul>
                                 { postC[0].posts.map(post => <li key={post.slug}>
                                               <Link href={`/posts/${post.slug}`} className="hover:underline">
                                                   <p className="text-right">
                                                       {post.title}
                                                   </p>
                                               </Link>

                                               <p className="text-right" dir="rtl">
                                                     מרחק: {post.distance} ק"מ, 
                                                     עליה: {post.ascent}מ', 
                                                    ירידה: <span dir="ltr" className='display:inline'>{post.descent} </span>מ'
                                                   <br />
                                                   {post.excerpt} 
                                               </p>
                                           </li>)}
                                
                             </ul>
                              </Popup>
                            </Marker>
                 ))}
        </MapContainer>
        </>
            ),
    [],
  )
  ;
  return ( 
  <div id="map" className="h-180px">
        {map?   <>
                 <CaptureMove map={map} setBounds={setBounds}/>
                 <CaptureMouse map={map} setMouseCoord={setMouseCoord}/>
                </>
                 : null
            }

            {mouseCoord?
                    <div> 
                        {mouseCoord.lat.toFixed(4)}, {mouseCoord.lng.toFixed(4)} 
                    </div>
                    : null
            }
      {displayMap}
      {bounds?  <button 
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4"
                onClick={() => {
              handleSearch();
            }}> Set Search Map bounds to: 
                    E{bounds.getEast().toFixed(4)}, N{bounds.getNorth().toFixed(4)}, S{bounds.getSouth().toFixed(4)}, W{bounds.getWest().toFixed(4)} 
                </button>
                 : null}
              </div>
  )
}

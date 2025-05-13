import type {Map, LatLngBounds, LatLngTuple } from 'leaflet'
import { latLngBounds } from 'leaflet';
import { Post } from "@/interfaces/post";
import Link from "next/link";
import { LayersControl,
         MapContainer, 
         Marker, 
         Popup,  
         TileLayer, useMap,  
         } from 'react-leaflet'
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

 import { useDebouncedCallback } from 'use-debounce';


const DEFAULT_ZOOM = 13;

export type MapProps = {
   posts: Post[];

};


const EILAT_POS = [29.5597, 34.9437,] as LatLngTuple


interface IChangeView {
    center: LatLngTuple;
    markers: LatLngTuple[];
}

function ChangeView({ center, markers }: IChangeView) {
    const map = useMap();
    map.setView({lng: center[0], lat: center[1]}, DEFAULT_ZOOM);
    
    let markerBounds = latLngBounds([]);
    markers.forEach(marker => {
        markerBounds.extend([marker[0], marker[1]])
    })
    map.fitBounds(markerBounds)   // <===== Error: Bounds are not valid.
    return null;
}


function CaptureMove({setBounds, map}:{setBounds:(Dispatch<SetStateAction<LatLngBounds|null>>), map:Map}) {
    const onMove = useCallback( () => {
                                setBounds(map.getBounds())
                                        }, [map]
                              )
    const onZoom = useCallback( () => {
                                setBounds(map.getBounds())
                                        }, [map]
                              )
    useEffect(() => {
                    map.on('move', onMove)
                    return () => {
                                  map.off('move', onMove)
                                }
                  }, [map, onMove]
    )
    useEffect(() => {
                    map.on('zoomend', onZoom)
                    return () => {
                                  map.off('zoomend', onZoom)
                                }
                  }, [map, onZoom]
    )
  return null
}


export default function MyMapComponent({posts } : MapProps) {
   
 const num_posts = posts.length;
 const markers = posts.map((post) => ([post.parkingCoords[0],post.parkingCoords[1],]as LatLngTuple) );

 const center = EILAT_POS;
 const [bounds, setBounds] = useState(null) as [LatLngBounds|null, (Dispatch<SetStateAction<LatLngBounds|null>>)];
 const searchParams = useSearchParams();
 const pathname = usePathname();
 const { replace } = useRouter();
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

 console.log(`center at ... ${center}, num_posts ${num_posts}`);
 markers.map((marker) => (console.log(`location ... ${marker[0]} , ${marker[1]}`)));
  const [map, setMap] = useState(null) as [Map|null, (Dispatch<SetStateAction<Map|null>>)];
  const displayMap = useMemo(
    () => (<>
        <MapContainer center={center} zoom={13} scrollWheelZoom={true} ref={setMap}>
        {(num_posts>1) && <ChangeView center={center} markers={markers}/>}
         <LayersControl>
         <LayersControl.BaseLayer checked name="OpenStreetMap Base">
           <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          </LayersControl.BaseLayer>
         </LayersControl>
 
         {posts.map((post) => (
                    <Marker key={post.slug} position={post.parkingCoords}>
                     <Popup>
                          <Link href={`/posts/${post.slug}`} className="hover:underline">
                            {post.title}
                          </Link><br />
                       {post.excerpt} <br />
                
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
                </>
                 : null
            }
      {displayMap}
      {bounds?  <button onClick={() => {
              handleSearch();
            }}> Set Search Map bounds to: 
                    E{bounds.getEast().toFixed(4)}, N{bounds.getNorth().toFixed(4)}, S{bounds.getSouth().toFixed(4)}, W{bounds.getWest().toFixed(4)} 
                </button>
                 : null}
              </div>
  )
}
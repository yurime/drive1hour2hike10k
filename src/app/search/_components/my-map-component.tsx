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

 //console.log(`center at ... ${center}, num_posts ${num_posts}`);
 //markers.map((marker) => (console.log(`location ... ${marker[0]} , ${marker[1]}`)));
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
          {/*additional layers from https://leaflet-extras.github.io/leaflet-providers/preview/*/}
          <LayersControl.BaseLayer checked name="Stadia AlidadeSatellite">
           <TileLayer
            attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg'
          />

          </LayersControl.BaseLayer> 

          <LayersControl.BaseLayer checked name="WaymarkedTrails hiking">
           <TileLayer
            attribution='Map data: &copy; <a href="http://www.govdata.de/dl-de/by-2-0">dl-de/by-2-0</a>'
            url='http://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web/default/WEBMERCATOR/{z}/{y}/{x}.png'
          />

          </LayersControl.BaseLayer>
         <LayersControl.BaseLayer name="Esri WorldImagery">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            />
            
          </LayersControl.BaseLayer>
          <LayersControl.Overlay name="Waymarked Trails">
            <TileLayer
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://waymarkedtrails.org">waymarkedtrails.org</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            url='https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png'
          />
          </LayersControl.Overlay>
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
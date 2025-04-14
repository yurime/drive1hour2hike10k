import type { LatLngTuple } from 'leaflet'
import L, { LatLng, latLngBounds, FeatureGroup } from 'leaflet';
import { Post } from "@/interfaces/post";
import Link from "next/link";
import { LayersControl,
         MapContainer, 
         Marker, 
         Popup, 
         Polyline, 
         TileLayer, useMap  } from 'react-leaflet'


const DEFAULT_ZOOM = 13;

export type MapProps = {
   posts: Post[];
};


const EILAT_POS = [29.5597, 34.9437,]as LatLngTuple


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


export default function MyMapComponent({posts } : MapProps) {
   
 const num_posts = posts.length;
 const markers = posts.map((post) => ([post.parkingCoords[0],post.parkingCoords[1],]as LatLngTuple) );
 const sum_y_vals = markers.reduce((acc,marker)=>(acc + marker[0]),0);
 const sum_x_vals = markers.reduce((acc,marker)=>(acc + marker[1]),0);
 const center = (num_posts == 0)? (EILAT_POS ): ([sum_y_vals/num_posts,sum_x_vals/num_posts,] as LatLngTuple);

 
 console.log(`center at ... ${center}, num_posts ${num_posts}`);
 markers.map((marker) => (console.log(`location ... ${marker[0]} , ${marker[1]}`)));
  return ( 
  <div id="map" className="h-180px">
    
      <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
        {(num_posts>1) && <ChangeView center={center} markers={markers} />}
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
        </div>
  )
}
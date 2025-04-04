import type { LatLngTuple } from 'leaflet'
import { Post } from "@/interfaces/post";
import Link from "next/link";
import { LayersControl,
         MapContainer, 
         Marker, 
         Popup, 
         Polyline, 
         TileLayer } from 'react-leaflet'


// gpx usage from: https://github.com/beringar/tracks-front/blob/main/src/components/MapComponent/MapComponent.tsx


export type MapProps = {
   posts: Post[];
};

const EILAT_POS = [29.511989,35.0973573,]as LatLngTuple


export default function MyMapComponent({posts } : MapProps) {
   
 const num_posts = posts.length;
 const sum_y_vals = posts.reduce((acc,prev)=>(acc + prev.parkingCoords[0]),0);
 const sum_x_vals = posts.reduce((acc,prev)=>(acc + prev.parkingCoords[1]),0);
 const center = (num_posts == 0)? (EILAT_POS ): ([sum_y_vals/num_posts,sum_x_vals/num_posts,] as LatLngTuple);
 const max_y_vals = Math.max(...posts.map((post)=>(post.parkingCoords[0])));
 const max_x_vals = Math.max(...posts.map((post)=>(post.parkingCoords[1])));
 const min_y_vals = Math.min(...posts.map((post)=>(post.parkingCoords[0])));
 const min_x_vals = Math.min(...posts.map((post)=>(post.parkingCoords[1])));
 const map_zoom = (num_posts < 2)? 13 : Number(40/Math.max(10*(max_x_vals-min_x_vals),10*(max_y_vals-min_y_vals)))
 
  console.log(`max_y_vals is ...${max_y_vals}`);
 console.log(`max_x_vals is ...${max_x_vals}`);
 console.log(`min_y_vals is ...${min_y_vals}`);
 console.log(`min_x_vals is ...${min_x_vals}`);
 console.log(`map_zoom is ...${map_zoom}`);
 console.log(`center at ... ${center}, num_posts ${num_posts}`);
 posts.map((post) => (console.log(`location ... ${post.parkingCoords[0]} , ${post.parkingCoords[1]}`)));
  return ( 
  <div id="map" className="h-180px">
    
      <MapContainer center={center} zoom={map_zoom} scrollWheelZoom={true}>
         <LayersControl>
         <LayersControl.BaseLayer checked name="OpenStreetMap Base">
           <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          </LayersControl.BaseLayer>
         </LayersControl>
 
         {posts.map((post) => (
                    <Marker position={post.parkingCoords}>
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
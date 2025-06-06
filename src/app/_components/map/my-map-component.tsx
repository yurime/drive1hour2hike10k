import type { LatLngTuple } from 'leaflet'
import gpxParser from "gpxparser";
import React from 'react'
import { MapContainer, 
         Marker, 
         Popup, 
         Polyline } from 'react-leaflet'

import { useEffect, useState } from "react";
import MapLayers from './map-layers';

// gpx usage from: https://github.com/beringar/tracks-front/blob/main/src/components/MapComponent/MapComponent.tsx


export type MapProps = {
   position: LatLngTuple;
   gpxFileAddr : string;
};




export default function MyMapComponent({position, gpxFileAddr} : MapProps) {
   const [positionsGpx, setPositionsGpx] = useState<number[][]>();

   useEffect(
    () => {
    (async () => {
      const gpxFile = await fetch(gpxFileAddr);
      const data = await gpxFile.text();
      const gpx = new gpxParser();
      gpx.parse(data);
      const positions = gpx.tracks[0].points.map((p) => [p.lat, p.lon]);
      setPositionsGpx(positions);
    }) ();
  }, [gpxFileAddr]);
   
  return ( 
  <div id="map" className="h-180px">
    {positionsGpx && (
      <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
         <MapLayers />
         <Polyline
            pathOptions={{ fillColor: "red", color: "blue" }}
            positions={positionsGpx as [number, number][]}
          />
          <Marker position={position}>
            <Popup>
              מקום לחניה <br />
            </Popup>
          </Marker>
        </MapContainer>
      )}
        </div>
  )
}

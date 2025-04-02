import type { LatLngTuple } from 'leaflet'
import gpxParser from "gpxparser";
import React from 'react'
import { LayersControl,
         MapContainer, 
         Marker, 
         Popup, 
         Polyline, 
         TileLayer } from 'react-leaflet'

import { useEffect, useState } from "react";

// gpx usage from: https://github.com/beringar/tracks-front/blob/main/src/components/MapComponent/MapComponent.tsx


export type MapProps = {
   position: LatLngTuple;
   gpxFileAddr : string;
};

type TrackStats = {
  distance: { total: number };
  elevation: {
    avg: number;
    max: number;
    min: number;
    neg: number;
    pos: number;
  };
};


export default function MyMapComponent({position, gpxFileAddr} : MapProps) {
   const [positionsGpx, setPositionsGpx] = useState<number[][]>();
   const [trackStats, setTrackStats] = useState<TrackStats>();

   useEffect(
    () => {
    (async () => {
      const gpxFile = await fetch(gpxFileAddr);
      const data = await gpxFile.text();
      const gpx = new gpxParser();
      gpx.parse(data);
      const positions = gpx.tracks[0].points.map((p) => [p.lat, p.lon]);
      setPositionsGpx(positions);
      setTrackStats({
         distance: gpx.tracks[0].distance,
         elevation: gpx.tracks[0].elevation,
      });
    }) ();
  }, [gpxFileAddr]);
  return ( 
  <div id="map" className="h-180px">
    {positionsGpx && (
      <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
         <LayersControl>
         <LayersControl.BaseLayer checked name="OpenStreetMap Base">
           <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          </LayersControl.BaseLayer>
         </LayersControl>
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
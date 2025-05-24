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
import type { LatLngTuple } from 'leaflet'
import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

type Props = {
  position: LatLngTuple;
};

export default function MyMapComponent({position} : Props) {
  return ( 
  <div id="map" className="h-180px">
    <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          מקום לחניה <br />
        </Popup>
      </Marker>
    </MapContainer>
        </div>
  )
}
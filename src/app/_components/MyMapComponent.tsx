import type { LatLngTuple } from 'leaflet'
import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const position: LatLngTuple = [32.016, 34.755,]

export default function MyMapComponent() {
  return ( 
  <div id="map" className="h-180px">
    <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br />
        </Popup>
      </Marker>
    </MapContainer>
        </div>
  )
}
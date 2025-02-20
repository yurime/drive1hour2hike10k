'use client'

import dynamic from 'next/dynamic';
import type { LatLngTuple } from 'leaflet'

type Props = {
  position: LatLngTuple;
};


export default function MyMap({position} : Props) {
   const MyMapComponent = dynamic(() => import('./MyMapComponent'), {
    loading: () => <>Loading...</>,
    ssr: false,
  })
   return (<MyMapComponent position={position}/>)
 }
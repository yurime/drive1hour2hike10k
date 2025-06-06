'use client'

import dynamic from 'next/dynamic';
import type {MapProps } from './my-map-component';


export default function MyMap({position, gpxFileAddr} : MapProps) {
   const MyMapComponent = dynamic(() => import('./my-map-component'), {
    loading: () => <>Loading...</>,
    ssr: false,
  })
   return (<MyMapComponent position={position} gpxFileAddr={gpxFileAddr}/>)
 }

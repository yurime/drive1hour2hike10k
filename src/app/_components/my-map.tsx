'use client'

import dynamic from 'next/dynamic';
import type {MapProps } from '@/app/_components/MyMapComponent';


export default function MyMap({position, gpxFileAddr} : MapProps) {
   const MyMapComponent = dynamic(() => import('./MyMapComponent'), {
    loading: () => <>Loading...</>,
    ssr: false,
  })
   return (<MyMapComponent position={position} gpxFileAddr={gpxFileAddr}/>)
 }
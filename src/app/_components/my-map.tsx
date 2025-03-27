'use client'

import dynamic from 'next/dynamic';
import type {MapProps } from '@/app/_components/MyMapComponent';


export default function MyMap({position, fileAddr} : MapProps) {
   const MyMapComponent = dynamic(() => import('./MyMapComponent'), {
    loading: () => <>Loading...</>,
    ssr: false,
  })
   return (<MyMapComponent position={position} fileAddr={fileAddr}/>)
 }
'use client'

import dynamic from 'next/dynamic';


export default function MyMap() {
   const MyMapComponent = dynamic(() => import('./MyMapComponent'), {
    loading: () => <>Loading...</>,
    ssr: false,
  })
   return (<MyMapComponent/>)
 }
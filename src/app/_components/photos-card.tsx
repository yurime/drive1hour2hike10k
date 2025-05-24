// Code By Raja Majumdar https://github.com/r3yc0n1c/next-gphoto
import React from 'react'
import { setSize } from '@/services/gphoto.service';
import cn from "classnames";
import Image from "next/image";

function PhotosCard({
    url,
    className,
  }: {
    url: string
    className?: string;
  }) {
    return (
        <div>
        <Image 
      src={setSize(url, 1300, 600)}
      alt={`Album Photo `}
      className={cn("shadow-sm w-full")}
      width={1300}
      height={600}
    />
            {/*<img src={setSize(url, 500, 500) } />*/}
        </div>
    )
}

export default PhotosCard
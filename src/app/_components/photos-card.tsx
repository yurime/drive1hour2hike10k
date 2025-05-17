// Code By Raja Majumdar https://github.com/r3yc0n1c/next-gphoto
import React from 'react'
import { setSize } from '@/services/gphoto.service';

function PhotosCard({
    url,
    className,
  }: {
    url: string
    className?: string;
  }) {
    return (
        <div>
            <img src={setSize(url, 500, 500)} />
        </div>
    )
}

export default PhotosCard
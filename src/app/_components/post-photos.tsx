"use client";

import PhotosCard from "@/app/_components/photos-card";
import { useEffect, useState } from "react";
//https://photos.app.goo.gl/J42qeQL34zJvJf6FA // Shoham Forest 2025.03
//https://photos.app.goo.gl/eHtEp9uuwHxZ9wyJ6 // Sataf 2024.11
//https://photos.app.goo.gl/HADraYSs4dUCVRMEA // HodHashron 2024.04

type Props = {
  albumURL:string;
};

export default function PostPhotos({albumURL}:Props){
  const [imageURL, setImageURL] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      let data: any = await fetch('/api/images'+'?url='+albumURL)
      data = await data.json()
      setImageURL(data)
    }
    fetchImages()
  }, [])
  return (	
  	<div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {imageURL[0] ? 
        	imageURL.map((item, idx) =>
          		<PhotosCard url={item} key={idx} />
        				) 
        	: <h1 className="text-2xl p-20">Loading...</h1>}
    </div>
      );
}
import { type Author } from "./author";
import type { LatLngTuple } from 'leaflet'

export type Post = {
  slug: string;
  title: string;
  date: string;
  txtDirrection: string;//for hebrew/english: rtl/ltr
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };

  content: string;
  preview?: boolean;
  wazeParking: string;
  israelHikingMap: string;
  distance:number;
  ascent: number;
  descent: number;
  parkingCoords: LatLngTuple;
  gpxFileAddr : string;  
};

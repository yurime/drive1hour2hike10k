import { type Author } from "./author";

export type Post = {
  slug: string;
  title: string;
  date: string;
  direction: string;
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
};

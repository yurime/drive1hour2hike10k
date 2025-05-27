import Avatar from "./avatar";
import DateFormatter from "./styles/date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";
import  MyMap  from "@/app/_components/map/my-map";
import type { LatLngTuple } from 'leaflet'


type Props = {
  title: string;
  israelHikingMap: string;
  date: string;
  author: Author;
  distance: number;
  ascent: number;
  descent: number;
  parkingCoords: LatLngTuple;
  gpxFileAddr : string;
};

export function PostHeader({ title, israelHikingMap, date, author,distance, ascent, descent, parkingCoords, gpxFileAddr }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div>

      <MyMap position={parkingCoords} gpxFileAddr={gpxFileAddr}/>
        
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
        <div className="block md:hidden mb-6">
          distance: {distance}km,
        </div>
        <div className="block md:hidden mb-6">
          ascent: {ascent}m, 
        </div>
        <div className="block md:hidden mb-6">
          descent: {descent}m
        </div>
        <div className="hidden md:block mb-12">
          distance: {distance}km, 
          ascent: {ascent}m, 
          descent: {descent}m
        </div>
      </div>
    </>
  );
}

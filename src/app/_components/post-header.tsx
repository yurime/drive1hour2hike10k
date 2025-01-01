import Avatar from "./avatar";
import CoverImage from "./cover-image";
import IsraelHikingMap from "./israel-hiking-map"
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  israelHikingMap: string;
  date: string;
  author: Author;
};

export function PostHeader({ title, coverImage, israelHikingMap, date, author }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="max-w-2xl mx-auto">
         <iframe  class="w-full" src={israelHikingMap} title="Hike route on israelhiking.osm.org.il " allowFullScreen></iframe>
        <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={israelHikingMap}> {israelHikingMap} </a>
          
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}

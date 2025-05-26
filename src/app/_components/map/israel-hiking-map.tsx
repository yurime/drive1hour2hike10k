import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const IsraelHikingMap = ({ title, src, slug }: Props) => {
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={src}> 
        <iframe src={src} title={title}></iframe>
        {src} 
        </Link>
      ) : (
        <iframe src={src} title={title}></iframe>
      )}
    </div>
  );
};

export default IsraelHikingMap;

import { Metadata } from "next";
import cn from "classnames";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
// import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { PostLinks }  from "@/app/_components/post-links";
import Image from "next/image";

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");
  return (
    <main>
      {/*<Alert preview={post.preview} />*/}
      <Container>
        {/*<Header />*/}
        <article className="mb-32">
          <PostHeader
            title={post.title}
            israelHikingMap={post.israelHikingMap}
            date={post.date}
            author={post.author}
            distance={post.distance}
            ascent={post.ascent}
            descent={post.descent}
            parkingCoords={post.parkingCoords}
            gpxFileAddr={post.gpxFileAddr}
          />
          <PostLinks israelHikingMap={post.israelHikingMap} gpxFileAddr={post.gpxFileAddr} wazeParking={post.wazeParking} />
          <PostBody content={content} txtDirrection={post.txtDirrection}/>
          <Image 
              src={post.ogImage.url + "=w"+1300 +"-h"+630}
              alt={`Cover Image for ${post.title}`}
              className={cn("shadow-sm w-full", {
                "hover:shadow-lg transition-shadow duration-200": post.slug,
              })}
              width={1300}
              height={630}
    />
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

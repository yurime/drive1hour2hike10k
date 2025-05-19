
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
// import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { PostLinks }  from "@/app/_components/post-links";

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
          <PostBody content={content} txtDirrection={post.txtDirrection} albumURL={post.albumURL}/>
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



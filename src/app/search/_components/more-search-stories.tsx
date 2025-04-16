import { PostPreview } from "@/app/_components/post-preview";
import { fetchFilteredPosts } from "./data";
import  MyMap  from "@/app/search/_components/my-map";

export default async function MoreSearchStories({
  query,
  min_len, 
  max_len,
  currentPage,
  east,
west,
north,
south,
}: {
  query: string;
  min_len: number; 
  max_len: number;
  currentPage: number;
  east : number;
  west : number;
  north : number;
  south : number;
}) {
  const posts = await  fetchFilteredPosts(query, max_len, min_len, currentPage, east, west, north, south);
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        Search result
      </h2>
      <MyMap  posts={posts}/>
      <h3 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        List
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}


import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { getAllPosts } from "@/lib/api";
import Search from "@/app/search/search"
import { PostTitle } from "@/app/_components/post-title";
import { Post } from "@/interfaces/post";


export default function SearchPage() {
  const allPosts = getAllPosts();

  return (
    <main>
      <Container>
      <Header />
      <PostTitle>Search</PostTitle>
        {allPosts && <Search allPosts={allPosts as Post[]}/>}
      </Container>
    </main>
  );
}

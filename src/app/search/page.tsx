
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { getAllPosts } from "@/lib/api";
import Search from "@/app/search/search"
import { PostTitle } from "@/app/_components/post-title";
//import { useDebouncedCallback } from 'use-debounce';// consider adding module to wait for the user finish typing
import { Post } from "@/interfaces/post";


export default function SearchPage() {
  const searchParams = "track length"
  const allPosts = getAllPosts();


  // const [resultPosts, setResultPosts] = useState<Post[]>(allPosts);

  // const handleSearch = (term:string) => {
  //     console.log(`Searching... ${term}`);
  //     setResultPosts(allPosts
  //   // sort posts by date in descending order
  //   .filter((post1) => (post1.distance > Number(term))));
  //    };

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

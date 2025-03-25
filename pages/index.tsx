import FeaturedPosts from "@/components/hame-page/FeaturedPosts";
import Hero from "@/components/hame-page/Hero";
import { Post } from "@/types/Post";
import { getFeaturedPosts } from "@/util/post-util";
import { GetStaticProps } from "next";

type PostsPageProps = {
  posts: Post[];
};

export default function Home({ posts }: PostsPageProps) {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}

export const getStaticProps: GetStaticProps<PostsPageProps> = () => {
  const posts = getFeaturedPosts();

  return {
    props: { posts },
  };
};

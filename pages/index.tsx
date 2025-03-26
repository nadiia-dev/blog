import FeaturedPosts from "@/components/home-page/FeaturedPosts";
import Hero from "@/components/home-page/Hero";
import { Post } from "@/types/Post";
import { getFeaturedPosts } from "@/util/post-util";
import { GetStaticProps } from "next";
import Head from "next/head";

type PostsPageProps = {
  posts: Post[];
};

export default function Home({ posts }: PostsPageProps) {
  return (
    <>
      <Head>
        <title>NextLevel blog</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
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

import AllPosts from "@/components/posts/AllPosts";
import { Post } from "@/types/Post";
import { getAllPosts } from "@/util/post-util";
import { GetStaticProps } from "next";
import Head from "next/head";

type PostsPageProps = {
  posts: Post[];
};

const PostsPage = ({ posts }: PostsPageProps) => {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts!"
        />
      </Head>
      <AllPosts posts={posts} />;
    </>
  );
};

export const getStaticProps: GetStaticProps<PostsPageProps> = () => {
  const posts = getAllPosts();
  return { props: { posts } };
};

export default PostsPage;

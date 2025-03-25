import AllPosts from "@/components/posts/AllPosts";
import { Post } from "@/types/Post";
import { getAllPosts } from "@/util/post-util";
import { GetStaticProps } from "next";

type PostsPageProps = {
  posts: Post[];
};

const PostsPage = ({ posts }: PostsPageProps) => {
  return <AllPosts posts={posts} />;
};

export const getStaticProps: GetStaticProps<PostsPageProps> = () => {
  const posts = getAllPosts();
  return { props: { posts } };
};

export default PostsPage;

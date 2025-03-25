import { Post } from "@/types/Post";
import PostsGrid from "./PostsGrid";

const AllPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <section className="w-[90%] max-w-[60rem] my-8 mx-auto">
      <h1 className="text-8 text-gray-800 text-center mb-6 md:text-4xl">
        All Posts
      </h1>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default AllPosts;

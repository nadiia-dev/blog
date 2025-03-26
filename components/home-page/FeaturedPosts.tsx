import { Post } from "@/types/Post";
import PostsGrid from "../posts/PostsGrid";

const FeaturedPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <section className="w-[90%] max-w-[80rem] my-8 mx-auto">
      <h2 className="text-3xl text-gray-800 text-center md:text-4xl mb-6 font-bold">
        Featured Posts
      </h2>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default FeaturedPosts;

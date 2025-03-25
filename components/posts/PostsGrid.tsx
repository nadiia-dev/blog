import { Post } from "@/types/Post";
import PostItem from "./PostItem";

const PostsGrid = ({ posts }: { posts: Post[] }) => {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] gap-6 place-content-center m-0 p-0">
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
};

export default PostsGrid;

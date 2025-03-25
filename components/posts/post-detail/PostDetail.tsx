import { Post } from "@/types/Post";
import PostHeader from "./PostHeader";
import ReactMarkdown from "react-markdown";

const PostDetail = ({ post }: { post: Post }) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  return (
    <article className="w-[95%] max-w-[60rem] my-8 mx-auto text-base leading-8 bg-gray-100 rounded-lg p-4 sm:p-8">
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostDetail;

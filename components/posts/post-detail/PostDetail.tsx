import { Post } from "@/types/Post";
import PostHeader from "./PostHeader";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

const PostDetail = ({ post }: { post: Post }) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  const customRenderers = {
    p({ node, children }) {
      if (node.children[0].tagName === "img") {
        const image = node.children[0];
        return (
          <div className="my-4 mx-auto w-full max-w-[600px]">
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{children}</p>;
    },
  };
  return (
    <article className="w-[95%] max-w-[60rem] my-8 mx-auto text-base leading-8 bg-gray-100 rounded-lg p-4 sm:p-8">
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostDetail;

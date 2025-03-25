import PostHeader from "./PostHeader";
import ReactMarkdown from "react-markdown";

const post = {
  title: "Tailwind CSS: My Favorite Styling Framework",
  image: "post-image.jpg",
  excerpt:
    "Why Tailwind CSS became my go-to choice and how it speeds up development.",
  date: "2025-03-10",
  slug: "tailwind-favorite",
  content: "# This is a first post",
};

const PostDetail = () => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  return (
    <article className="w-[95%] max-w-[60rem] my-8 text-base leading-8 bg-grey-100 rounded-lg p-4 sm:p-8">
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostDetail;

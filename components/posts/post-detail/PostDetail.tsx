import { Post } from "@/types/Post";
import PostHeader from "./PostHeader";
import ReactMarkdown, { Components } from "react-markdown";
import Image from "next/image";
import SyntaxHighlighter, { PrismLight } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";

PrismLight.registerLanguage("js", js);
PrismLight.registerLanguage("css", css);

const PostDetail = ({ post }: { post: Post }) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  const customRenderers: Components = {
    p({ node, children }) {
      if (
        node &&
        node.children &&
        node.children[0] &&
        node.children[0].type === "element" &&
        node.children[0].tagName === "img"
      ) {
        const image = node.children[0];
        return (
          <div className="my-4 mx-auto w-full max-w-[600px]">
            <Image
              src={`/images/posts/${post.slug}/${image.properties?.src || ""}`}
              alt={`${image.properties?.alt}` || "Post description image"}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{children}</p>;
    },
    code(props) {
      const { children, className, node, ref, ...rest } = props;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _node = node;
      const match = /language-(\w+)/.exec(className || "");
      return match ? (
        <PrismLight
          {...rest}
          ref={ref as React.Ref<SyntaxHighlighter>}
          language={match[1]}
          style={atomDark}
        >
          {String(children).replace(/\n$/, "")}
        </PrismLight>
      ) : (
        <code className={className} {...rest}>
          {children}
        </code>
      );
    },
  };
  return (
    <article className="w-[95%] max-w-[60rem] my-8 mx-auto text-base leading-8 bg-gray-100 rounded-lg p-4 sm:p-8">
      <p>{post.title}</p>
      <PostHeader postSlug={post.slug} title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostDetail;

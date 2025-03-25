import PostDetail from "@/components/posts/post-detail/PostDetail";
import { Post } from "@/types/Post";
import { getPostsData, getPostsFiles } from "@/util/post-util";
import { GetStaticPaths, GetStaticProps } from "next";

type PostPageProps = {
  post: Post;
};

const PostDetailsPage = ({ post }: PostPageProps) => {
  return (
    <>
      <PostDetail post={post} />
    </>
  );
};

export const getStaticProps: GetStaticProps<PostPageProps> = ({ params }) => {
  if (!params || typeof params.slug !== "string") {
    return { notFound: true };
  }

  const post = getPostsData(params.slug);

  return { props: { post }, revalidate: 600 };
};

export const getStaticPaths: GetStaticPaths = () => {
  const postsFiles = getPostsFiles();
  const slugs = postsFiles.map((file) => file.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export default PostDetailsPage;

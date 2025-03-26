import Comments from "@/components/comment/Comments";
import PostDetail from "@/components/posts/post-detail/PostDetail";
import { Comment } from "@/types/Comment";
import { Post } from "@/types/Post";
import { getPostsData, getPostsFiles } from "@/util/post-util";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

type PostPageProps = {
  post: Post;
  initialComments: Comment[];
};

const PostDetailsPage = ({ post, initialComments }: PostPageProps) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostDetail post={post} />
      <Comments post={post} initialComments={initialComments} />
    </>
  );
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  if (!params || typeof params.slug !== "string") {
    return { notFound: true };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${params.slug}`
  );
  const initialComments: Comment[] = await res.json();

  const post = getPostsData(params.slug);

  return { props: { post, initialComments }, revalidate: 100 };
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

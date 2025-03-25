import { Post } from "@/types/Post";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getPostsData(postId: string): Post {
  const postSlug = postId.replace(/\.md$/, "");

  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...(data as Omit<Post, "slug" | "content">),
    content,
  };

  return postData;
}

export function getAllPosts(): Post[] {
  const files = getPostsFiles();
  const allPosts = files.map((file) => {
    return getPostsData(file);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

export function getFeaturedPosts(): Post[] {
  const allPosts = getAllPosts();

  return allPosts.filter((post) => post.isFeatured);
}

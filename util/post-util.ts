import fs from "fs";
import matter from "gray-matter";
import path from "path";

interface Post {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  isFeatured?: boolean;
}

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsData(fileName: string): Post {
  const filePath = path.join(postsDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const postSlug = fileName.replace(/\.md$/, "");

  const postData = {
    slug: postSlug,
    ...(data as Omit<Post, "slug" | "content">),
    content,
  };

  return postData;
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(postsDirectory);
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

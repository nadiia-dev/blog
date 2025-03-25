import PostsGrid from "../posts/PostsGrid";
import { Post } from "@/types/Post";

const dummy_data: Post[] = [
  {
    title: "How I Learned TypeScript in One Month",
    image: "post-image.jpg",
    excerpt:
      "Sharing my journey of mastering TypeScript and integrating it into my projects.",
    date: "2025-03-25",
    slug: "typescript-journey",
  },
  {
    title: "Next.js: What I Learned After Two Weeks",
    image: "post-image.jpg",
    excerpt:
      "Breaking down the key features of Next.js that helped me build a full-fledged website.",
    date: "2025-03-18",
    slug: "nextjs-lessons",
  },
  {
    title: "Tailwind CSS: My Favorite Styling Framework",
    image: "post-image.jpg",
    excerpt:
      "Why Tailwind CSS became my go-to choice and how it speeds up development.",
    date: "2025-03-10",
    slug: "tailwind-favorite",
  },
  {
    title: "React Query: A New Approach to Data Fetching",
    image: "post-image.jpg",
    excerpt:
      "Exploring how React Query simplifies data fetching and caching — my insights.",
    date: "2025-02-28",
    slug: "react-query-experience",
  },
  {
    title: "How I Optimized My React Project",
    image: "post-image.jpg",
    excerpt:
      "Sharing the techniques I used to make my React app faster and cleaner.",
    date: "2025-02-20",
    slug: "react-optimization",
  },
];

const FeaturedPosts = () => {
  return (
    <section className="w-[90%] max-w-[80rem] my-8 mx-auto">
      <h2 className="text-3xl text-gray-800 text-center md:text-4xl mb-6 font-bold">
        Featured Posts
      </h2>
      <PostsGrid posts={dummy_data} />
    </section>
  );
};

export default FeaturedPosts;

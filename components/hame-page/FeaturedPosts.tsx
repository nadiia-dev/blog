import PostsGrid from "../posts/PostsGrid";

const dummy_data = [];

const FeaturedPosts = () => {
  return (
    <section className="w-[90%] max-w-[80rem] my-8 mx-auto">
      <h2 className="text-3xl text-gray-300 text-center md:text-6xl">
        Featured Posts
      </h2>
      <PostsGrid posts={dummy_data} />
    </section>
  );
};

export default FeaturedPosts;

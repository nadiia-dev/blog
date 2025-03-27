import Image from "next/image";
import PostActions from "./PostActions";

const PostHeader = ({
  postSlug,
  title,
  image,
}: {
  postSlug: string;
  title: string;
  image: string;
}) => {
  return (
    <header className="pb-8 border-b-8 border-primary-100 my-4">
      <div className="flex flex-col-reverse justify-between items-center gap-4 md:my-8 md:flex-row md:items-end">
        <h1 className="text-2xl m-0 leading-none text-center md:text-6xl md:text-left">
          {title}
        </h1>
        <Image
          className="object-cover w-50 h-30"
          src={image}
          alt={title}
          width={200}
          height={150}
        />
      </div>
      <PostActions slug={postSlug} />
    </header>
  );
};

export default PostHeader;

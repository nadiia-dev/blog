import { Post } from "@/types/Post";
import Image from "next/image";
import Link from "next/link";

const PostItem = ({ post }: { post: Post }) => {
  const { title, image, excerpt, date, slug } = post;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
    <li className="shadow-md bg-gray-800 text-center">
      <Link href={linkPath} className="text-gray-100">
        <div className="w-full h-[10rem] md:h-[15rem] overflow-hidden relative">
          <Image
            src={imagePath}
            alt={title}
            sizes="(max-width: 600px) 100vw, 800px"
            fill
            priority
          />
        </div>
        <div className="p-4">
          <h3 className="my-4 text-xl">{title}</h3>
          <time className="italic text-grey-300">{formattedDate}</time>
          <p className="leading-6">{excerpt}</p>
        </div>
      </Link>
    </li>
  );
};

export default PostItem;

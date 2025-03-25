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
        <div className="w-full max-h-[20rem] overflow-hidden">
          <Image
            src={imagePath}
            alt={title}
            width={300}
            height={200}
            layout="responsive"
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

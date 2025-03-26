import { idenifyUser } from "@/util/identify";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { BiSolidLike } from "react-icons/bi";

const PostHeader = ({
  postSlug,
  title,
  image,
}: {
  postSlug: string;
  title: string;
  image: string;
}) => {
  const [liked, setLiked] = useState(false);
  const toggleLike = async () => {
    const userFingerprint = await idenifyUser();
    try {
      const res = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_slug: postSlug,
          comment_id: null,
          user_fingerprint: userFingerprint,
        }),
      });

      const data = await res.json();

      if (data.message === "Like added") {
        setLiked(true);
      } else if (data.message === "Like removed") {
        setLiked(false);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

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
      <div className="flex gap-2.5 items-center">
        <button onClick={toggleLike}>
          <BiSolidLike
            size={30}
            className={clsx(liked && "text-red-600", !liked && "text-gray-950")}
          />
        </button>
        <p>Liked</p>
      </div>
    </header>
  );
};

export default PostHeader;

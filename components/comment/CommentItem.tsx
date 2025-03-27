import { Comment } from "@/types/Comment";
import { idenifyUser } from "@/util/identify";
import clsx from "clsx";
import { useState } from "react";
import { BiSolidLike } from "react-icons/bi";

const CommentItem = ({ comment }: { comment: Comment }) => {
  const [liked, setLiked] = useState(false);
  const formattedDate = (createdAt: string) => {
    return new Date(createdAt).toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const toggleLike = async (commentId: number) => {
    const userFingerprint = await idenifyUser();
    try {
      const res = await fetch("/api/like", {
        method: "POST",
        headers: {
          user_fingerprint: userFingerprint || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_slug: null,
          comment_id: commentId,
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
    <li className="border-b border-gray-300 py-4 mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-lg">{comment.name}</p>
          <p className="text-gray-700">{comment.text}</p>
        </div>
        <time className="text-sm text-gray-500 self-end">
          {formattedDate(comment.created_at)}
        </time>
        <div className="flex gap-2.5 items-center">
          <button onClick={() => toggleLike(comment.comment_id)}>
            <BiSolidLike
              size={20}
              className={clsx(
                liked && "text-red-600",
                !liked && "text-gray-950"
              )}
            />
          </button>
          <p>Liked</p>
        </div>
      </div>
    </li>
  );
};

export default CommentItem;

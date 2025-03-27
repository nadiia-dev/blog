import { useCommentsStore } from "@/store/commentsStore";
import { useLikesStore } from "@/store/likesStore";
import { idenifyUser } from "@/util/identify";
import clsx from "clsx";
import { useEffect } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";

const PostActions = ({ slug }: { slug: string }) => {
  const { postLikesCount, userLiked, setPostLikesCount, setUserLiked } =
    useLikesStore();
  const { postCommentsCount, setPostCommentsCount } = useCommentsStore();

  useEffect(() => {
    const fetchComments = async () => {
      const userFingerprint = await idenifyUser();
      const res = await fetch(`/api/posts/${slug}/comments`, {
        headers: {
          user_fingerprint: userFingerprint || "",
        },
      });
      const data = await res.json();
      setPostCommentsCount(data.totalComments);
    };

    fetchComments();
  }, [slug, setPostCommentsCount]);

  useEffect(() => {
    const fetchLikes = async () => {
      const userFingerprint = await idenifyUser();
      const res = await fetch(`/api/posts/${slug}/likes`, {
        headers: {
          user_fingerprint: userFingerprint || "",
        },
      });
      const data = await res.json();
      setPostLikesCount(data.totalLikes);
      setUserLiked(data.userLiked);
    };

    fetchLikes();
  }, [slug, setPostLikesCount, setUserLiked]);

  const toggleLike = async () => {
    const userFingerprint = await idenifyUser();
    try {
      const res = await fetch("/api/like", {
        method: "POST",
        headers: {
          user_fingerprint: userFingerprint || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_slug: slug,
          comment_id: null,
        }),
      });

      const data = await res.json();

      if (data.message === "Like added") {
        setUserLiked(true);
        setPostLikesCount(Number(postLikesCount) + 1);
      } else if (data.message === "Like removed") {
        setUserLiked(false);
        setPostLikesCount(Number(postLikesCount) - 1);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <ul className="flex gap-5 items-center">
      <li className="flex gap-2.5 items-center">
        <button onClick={toggleLike}>
          <BiSolidLike
            size={30}
            className={clsx(
              userLiked && "text-red-600",
              !userLiked && "text-gray-950"
            )}
          />
        </button>
        <p>{postLikesCount}</p>
      </li>
      <li className="flex gap-2.5 items-center">
        <FaComment size={30} className="text-gray-950" />
        <p>{postCommentsCount}</p>
      </li>
    </ul>
  );
};

export default PostActions;

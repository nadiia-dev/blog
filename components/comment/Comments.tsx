import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";
import { Post } from "@/types/Post";
import { Comment } from "@/types/Comment";
import { useCommentsStore } from "@/store/commentsStore";

export interface CommentData {
  user_fingerprint: string;
  name: string;
  text: string;
}

const Comments = ({
  post,
  initialComments,
}: {
  post: Post;
  initialComments: Comment[];
}) => {
  const [showComments, setShowComments] = useState(false);
  const {
    postCommentsCount,
    postComments,
    setPostCommentsCount,
    setPostComments,
    appendPostComments,
  } = useCommentsStore();

  useEffect(() => {
    setPostComments(initialComments);
  }, [initialComments, setPostComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const fetchComments = async () => {
    const res = await fetch(`/api/posts/${post.slug}`);
    const newComments = await res.json();
    appendPostComments((prevComments) => [...prevComments, newComments]);
  };

  const handleSubmitComment = async (enteredData: CommentData) => {
    try {
      const response = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({ post_slug: post.slug, ...enteredData }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await response.json();
      if (response.ok) {
        setPostCommentsCount(Number(postCommentsCount) + 1);
        fetchComments();
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error("Something went wrong:", e);
      }
    }
  };
  return (
    <section className="flex flex-col justify-center items-center">
      <CommentForm onAddComment={handleSubmitComment} />
      <button
        onClick={toggleCommentsHandler}
        className="cursor-pointer my-5 text-purple-950"
      >
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <CommentsList comments={postComments} />}
    </section>
  );
};

export default Comments;

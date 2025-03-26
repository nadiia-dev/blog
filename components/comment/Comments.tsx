import React, { useState } from "react";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";
import { Post } from "@/types/Post";
import { Comment } from "@/types/Comment";

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
  const [comments, setComments] = useState(initialComments);
  const fetchComments = async () => {
    const res = await fetch(`/api/posts/${post.slug}`);
    const newComments = await res.json();
    setComments(newComments);
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
        fetchComments();
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error("Something went wrong:", e);
      }
    }
  };
  return (
    <>
      <CommentForm onAddComment={handleSubmitComment} />
      <CommentsList comments={comments} />
    </>
  );
};

export default Comments;

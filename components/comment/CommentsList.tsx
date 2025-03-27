import { Comment } from "@/types/Comment";
import CommentItem from "./CommentItem";

interface Props {
  comments: Comment[];
}

const CommentsList = ({ comments }: Props) => {
  return (
    <>
      {comments.length === 0 && (
        <p className="text-xl font-semibold mb-4 text-center">
          Be the first to leave a comment
        </p>
      )}
      {comments.length > 0 && (
        <>
          <h3 className="text-2xl font-semibold mb-4 text-center">Comments:</h3>
          <ul className="space-y-4 w-[98%] md:w-2xl">
            {comments.map((comment) => (
              <CommentItem key={comment.created_at} comment={comment} />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default CommentsList;

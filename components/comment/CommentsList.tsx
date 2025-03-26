import { Comment } from "@/types/Comment";

interface Props {
  comments: Comment[];
}

const CommentsList = ({ comments }: Props) => {
  const formattedDate = (createdAt: string) => {
    return new Date(createdAt).toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

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
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li
                key={comment.created_at}
                className="border-b border-gray-300 py-4 w-2xl mx-auto"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg">{comment.name}</p>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                  <time className="text-sm text-gray-500 self-end">
                    {formattedDate(comment.created_at)}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default CommentsList;

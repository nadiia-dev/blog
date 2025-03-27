import { Comment } from "@/types/Comment";

const CommentItem = ({ comment }: { comment: Comment }) => {
  const formattedDate = (createdAt: string) => {
    return new Date(createdAt).toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
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
      </div>
    </li>
  );
};

export default CommentItem;

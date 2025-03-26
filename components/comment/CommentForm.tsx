import { idenifyUser } from "@/util/identify";
import { useState } from "react";
import { CommentData } from "./Comments";

const CommentForm = ({
  onAddComment,
}: {
  onAddComment: (commentData: CommentData) => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const user_fingerprint = await idenifyUser();

    if (user_fingerprint) {
      const enteredData = {
        user_fingerprint,
        name: formData.name,
        text: formData.comment,
      };
      onAddComment(enteredData);
    }
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-2xl my-5 mx-auto">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={formData.name}
          onChange={handleChange}
          placeholder="Enter your username"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="commentContent"
          className="block text-sm font-medium text-gray-700"
        >
          Comment
        </label>
        <textarea
          id="commentContent"
          name="comment"
          rows={2}
          defaultValue={formData.comment}
          onChange={handleChange}
          placeholder="Write your comment..."
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>
      <button
        type="submit"
        className="font-inherit cursor-pointer bg-primary-700 border border-primary-700 py-2 px-4 rounded-md text-primary-50 shadow-md hover:bg-primary-500 hover:border-primary-500"
      >
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;

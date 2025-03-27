import { Comment } from "@/types/Comment";
import { create } from "zustand";

interface CommentsStore {
  postCommentsCount: number;
  postComments: Comment[];
  setPostCommentsCount: (comment: number) => void;
  setPostComments: (comments: Comment[]) => void;
}

export const useCommentsStore = create<CommentsStore>((set) => ({
  postCommentsCount: 0,
  postComments: [],
  setPostCommentsCount: (comment) => set({ postCommentsCount: comment }),
  setPostComments: (comments) => set({ postComments: comments }),
}));

import { create } from "zustand";

interface LikesStore {
  postLikesCount: number;
  userLiked: boolean;
  setPostLikesCount: (like: number) => void;
  setUserLiked: (liked: boolean) => void;
}

export const useLikesStore = create<LikesStore>((set) => ({
  postLikesCount: 0,
  userLiked: false,
  setPostLikesCount: (likes) => set({ postLikesCount: likes }),
  setUserLiked: (liked) => set({ userLiked: liked }),
}));

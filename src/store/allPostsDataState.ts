import { PostData } from "@/types/common";
import { atom } from "recoil";

export const allPostsDataState = atom<PostData[] | []>({
  key: "allPostsDataState", // 고유한 ID
  default: [], // 초기값
});

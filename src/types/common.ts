import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  home: boolean;
  dark?: boolean;
}

interface PostData {
  id: string;
  category: string;
  title: string;
  description: string;
  date: string;
  [key: string]: any;
}

interface PostContentData {
  id: string;
  contentHtml: string;
  [key: string]: any;
}
interface PostIdParams {
  params: {
    category: string;
    id: string;
  };
}

interface PostFilteredArray {
  posts: PostData[];
}
type Size = "sm" | "md" | "lg";

type SideBarCategory =
  | "all"
  | "search"
  | "folder"
  | "contact"
  | "graph"
  | "trouble-shooting"
  | "recommendation";
type PostCategory = "all" | "react" | "nextjs" | "typescript" | "javascript";

export type {
  LayoutProps,
  PostData,
  PostContentData,
  PostIdParams,
  Size,
  PostFilteredArray,
  SideBarCategory,
  PostCategory,
};

import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { allPostsDataState } from "../../../store/allPostsDataState";
import { PostData } from "@/types/common";
import Link from "next/link";

interface FolderTreeProps {
  folder: string;
  title: string;
  path: string;
  posts: string[];
  children: FolderTreeProps[];
  isPost: boolean;
}

function createFolderTree(posts: PostData[]): FolderTreeProps[] {
  const folderTree: FolderTreeProps[] = [];

  for (const post of posts) {
    const parts = post.category.split("/");
    let currentFolder = folderTree;
    let currentPath = "";
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      currentPath += `/${part}`;
      let folder = currentFolder.find((folder) => folder.folder === part);
      if (!folder) {
        folder = {
          folder: part,
          title: i === parts.length - 1 ? post.title : "",
          path: currentPath,
          posts: [],
          children: [],
          isPost: i === parts.length - 1,
        };
        currentFolder.push(folder);
      }
      if (i === parts.length - 1) {
        folder.posts.push(post.id);
      } else {
        currentFolder = folder.children;
      }
    }
  }

  return folderTree;
}

const RenderFolderTree = ({ node }: { node: FolderTreeProps }) => {
  return (
    <div className="ml-5">
      <Link
        className="text-blue-500 hover:underline"
        href={node.isPost ? `${node.path}` : `${node.folder}`}
      >
        {node.folder}
      </Link>
      {node.isPost && (
        <div className="ml-5">
          {node.posts.map((postId, index) => (
            <div key={index} className="my-1">
              <Link
                className="text-green-500 hover:underline"
                href={`${node.path}/${node.posts[index]}`}
              >
                {postId}
              </Link>
            </div>
          ))}
        </div>
      )}
      {node.children.map((child, index) => (
        <RenderFolderTree key={index} node={child} />
      ))}
    </div>
  );
};

const FolderTree = () => {
  const [allPostsData, setAllPostsData] =
    useRecoilState<PostData[]>(allPostsDataState);
  const [folderTree, setFolderTree] = useState<FolderTreeProps[]>([]);

  useEffect(() => {
    const newFolderTree = createFolderTree(allPostsData);
    setFolderTree(newFolderTree);
  }, [allPostsData]);

  return (
    <div>
      {folderTree.map((node, index) => (
        <RenderFolderTree key={index} node={node} />
      ))}
    </div>
  );
};

export default FolderTree;

import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { allPostsDataState } from "../../../store/allPostsDataState";
import { PostData } from "@/types/common";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { VscChevronDown } from "react-icons/vsc";
import { folderOpenState } from "../../../store/folderTreeOpenState";

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

const RenderFolderTree = ({
  node,
  isOpenState,
  setIsOpenState,
  initialRender,
}: {
  node: FolderTreeProps;
  isOpenState: Record<string, boolean>;
  setIsOpenState: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  initialRender: boolean;
}) => {
  const toggleIsOpen = (folder: string) => {
    setIsOpenState((prev: Record<string, boolean>) => ({
      ...prev,
      [folder]: !prev[folder],
    }));
  };
  return (
    <div className="pl-5">
      <div
        className="w-full text-slate-400 hover:underline hover:text-slate-100 pt-1 font-bold inline-flex cursor-pointer"
        onClick={() => toggleIsOpen(node.folder)}
      >
        <motion.div
          initial={initialRender ? { rotate: -90 } : false}
          animate={{ rotate: isOpenState[node.folder] ? 0 : -90 }}
          transition={{ duration: 0.4 }}
          style={{ originX: 0.4, originY: 0.5 }}
        >
          <VscChevronDown className="w-5 h-5 mr-1" />
        </motion.div>
        {node.folder}
      </div>
      {node.isPost && isOpenState[node.folder] && (
        <div className="ml-5">
          {node.posts.map((postId, index) => (
            <Link
              href={`${node.path}/${node.posts[index]}`}
              key={index}
              className="my-1 group relative"
            >
              <div className="text-gray-500 hover:underline z-10 relative">
                {postId}
              </div>
              <div className="absolute inset-0 left-[-2.5rem] group-hover:bg-slate-100 group-hover:bg-opacity-10"></div>
            </Link>
          ))}
        </div>
      )}
      {node.children.map((child, index) => (
        <RenderFolderTree
          initialRender={initialRender}
          key={index}
          node={child}
          isOpenState={isOpenState}
          setIsOpenState={setIsOpenState}
        />
      ))}
    </div>
  );
};

const FolderTree = () => {
  const [isOpenState, setIsOpenState] = useRecoilState(folderOpenState);
  const [allPostsData, setAllPostsData] =
    useRecoilState<PostData[]>(allPostsDataState);
  const [folderTree, setFolderTree] = useState<FolderTreeProps[]>([]);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    const newFolderTree = createFolderTree(allPostsData);
    setFolderTree(newFolderTree);
    setInitialRender(false);
  }, [allPostsData]);

  return (
    <div>
      {folderTree.map((node, index) => (
        <RenderFolderTree
          key={index}
          node={node}
          isOpenState={isOpenState}
          setIsOpenState={setIsOpenState}
          initialRender={initialRender}
        />
      ))}
    </div>
  );
};

export default FolderTree;

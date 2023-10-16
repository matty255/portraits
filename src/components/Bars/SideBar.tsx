import { Dispatch, SetStateAction, useState } from "react";
import {
  VscHome,
  VscSearch,
  VscFiles,
  VscSourceControl,
  VscDebugAltSmall,
  VscExtensions,
  VscAccount,
  VscSettingsGear,
  VscCommentDiscussion,
} from "react-icons/vsc";

import dynamic from "next/dynamic";

const FadeInAnimation = dynamic(() => import("@/common/FadeInAnimation"));

export default function SideBar({
  toggle,
  isShown,
}: {
  isShown: boolean;

  toggle: Dispatch<SetStateAction<boolean>>;
}) {
  const [category, setCategory] = useState<string>("all");
  const icons = [
    <VscSearch
      key="search"
      className="w-12 h-auto text-white cursor-pointer"
      onClick={() => setCategory("search")}
    />,
    <VscFiles
      key="files"
      className="w-12 h-auto text-white cursor-pointer"
      onClick={() => toggle(!isShown)}
    />,
    <VscSourceControl
      key="source-control"
      className="w-12 h-auto text-white cursor-pointer"
    />,
    <VscDebugAltSmall
      key="debug"
      className="w-12 h-auto text-white cursor-pointer"
    />,
    <VscExtensions
      key="extensions"
      className="w-12 h-auto text-white cursor-pointer"
    />,
  ];

  return (
    <div
      className={` hidden md:block md:fixed top-0 left-0 h-screen transition-all duration-300 ${
        isShown ? "md:w-80" : "md:w-24"
      } bg-blue-300 dark:bg-gray-800`}
    >
      <div className="w-full flex h-full ">
        <div
          className={`px-12 w-24 scrollbar-hide overflow-y-scroll pt-16 pb-5 flex flex-col h-full items-center justify-between ${"items-start"}`}
        >
          <div className="flex flex-col gap-y-6 items-center">
            <VscHome className="w-14 h-auto text-white cursor-pointer " />
            <FadeInAnimation icons={icons} isShown={isShown} />
          </div>
          <div className="p-3"></div>
          <div className="flex flex-col gap-y-6 items-center">
            <div></div>
            <VscCommentDiscussion
              key="comment-discussion"
              className="w-12 h-auto text-white cursor-pointer"
            />

            <VscAccount
              key="account"
              className="w-12 h-auto text-white cursor-pointer"
            />

            <VscSettingsGear
              key="settings"
              className="w-12 h-auto text-white cursor-pointer"
            />
          </div>
        </div>
        {isShown && <div className="w-full h-full transition"></div>}
      </div>
    </div>
  );
}
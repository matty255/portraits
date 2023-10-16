import {
  VscLayoutSidebarLeft,
  VscLayoutPanel,
  VscLayoutSidebarRightOff,
  VscLayout,
  VscSearch,
} from "react-icons/vsc";

import useMediaQuery from "../../hooks/useMediaquery";

import useToggle from "../../hooks/useToggle";
import Link from "next/link";

export default function TitleBar({
  home,
  toggleDarkMode,
}: {
  home: boolean;
  toggleDarkMode: () => void;
}) {
  const isDesktop = useMediaQuery();
  const { isShown, toggle } = useToggle();

  return (
    <div className="w-full fixed top-0 left-0">
      <div className=" shadow-md md:shadow-none bg-blue-500 dark:bg-slate-950 grid grid-cols-12 grid-rows-1 gap-4 h-11 fixed w-full top-0 z-30">
        {home ? (
          <></>
        ) : (
          <Link href={"/"}>
            <VscLayout />
          </Link>
        )}
        <div
          onClick={!isShown ? toggle : () => {}}
          className="group relative items-center cursor-pointer p-1 w-full md:w-1/2 rounded-md col-start-3 col-end-11 dark:hover:bg-slate-900 hover:bg-blue-300  dark:bg-slate-800 flex justify-center content-center m-auto font-semibold"
        >
          <VscSearch className="text-slate-300  opacity-70 w-5 h-5" />
          <p className="pl-2 text-slate-300 group-hover:text-white dark:text-slate-100">
            vscode-blog
          </p>
        </div>

        <div className="col-start-11 col-end-13 m-auto flex gap-4">
          {isDesktop && (
            <>
              <VscLayoutSidebarLeft
                onClick={toggleDarkMode}
                className="w-6 h-6  dark:text-white"
                aria-hidden="true"
              />
              <VscLayoutPanel
                className="w-6 h-6  dark:text-white"
                aria-hidden="true"
              />
              <VscLayoutSidebarRightOff
                className="w-6 h-6  dark:text-white"
                aria-hidden="true"
              />
              <VscLayout
                className="w-6 h-6  dark:text-white"
                aria-hidden="true"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

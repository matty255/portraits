// Header.tsx
"use client";
import useTailwindBreakpoint from "@/hooks/useTailwindBreakpoint";
import { useToggle } from "@/hooks/useToggle";
import useDarkModeStore from "@/store/darkModeStore";
import { useHistoryStore } from "@/store/useHistoryStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVBAR_TITLE, NAVBAR_TITLE_SHORT } from "../../constants/navigation";
import DarkModeToggle from "./DarkModeToggle";
import MouseSpotlight from "./MouseSpotlight";

export default function Header() {
  const [isopen, toggle] = useToggle(false);
  const { width, breakpoints } = useTailwindBreakpoint();
  const { history } = useHistoryStore();
  const { isDarkMode } = useDarkModeStore();

  const pathname = usePathname();

  let lastVisitedModel = history[history.length - 1];
  if (lastVisitedModel === pathname) {
    lastVisitedModel = history[history.length - 2];
  }
  return (
    <>
      <header className="navbar p-0 min-h-fit sticky top-0 bg-red-300 pb-1.5">
        <div className="navbar-start pl-12 text-black ">
          <DarkModeToggle />
          <MouseSpotlight />
          {/* <div className="fixed top-0 h-full w-full bg-black"></div> */}
          <Link
            href={"/"}
            className="underline-offset-2 hover:underline text-black text-xl font-extrabold pl-3 pt-1.5"
          >
            {width > breakpoints.md ? NAVBAR_TITLE : NAVBAR_TITLE_SHORT}
          </Link>
        </div>
        <div className="navbar-end"></div>
      </header>
      <div className="border-b border-white mx-5 md:mx-10 lg:mx-20"></div>
    </>
  );
}

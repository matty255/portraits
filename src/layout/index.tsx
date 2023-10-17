import React, { useEffect, useState } from "react";
import Head from "next/head";

import { LayoutProps } from "../types/common";
import dynamic from "next/dynamic";
import { useRecoilState } from "recoil";
import { darkModeState } from "../store/darkModeState";

export default function Layout({ children, home }: LayoutProps) {
  const [darkMode, setDarkMode] = useRecoilState(darkModeState); // Recoil 상태 사용
  useEffect(() => {
    const userPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(userPrefersDark);
  }, [setDarkMode]);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const TitleBar = dynamic(() => import("../components/Bars/TitleBar"), {
    ssr: false,
  });

  const SideBar = dynamic(() => import("../components/Bars/SideBar"), {
    ssr: false,
  });

  return (
    <div className={`h-screen fixed w-full ${darkMode ? "dark" : ""}`}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <SideBar isShown={sidebarOpen} toggle={setSidebarOpen} />
      </div>

      <div
        className={`scrollbar-hide h-screen w-full overflow-scroll transition-all duration-300 ${
          sidebarOpen ? "md:ml-80" : "md:ml-24"
        }`}
      >
        <header>
          <TitleBar home={home} />
        </header>
        <main className="p-10 min-h-screen bg-slate-100 dark:bg-slate-700">
          {children}
        </main>
      </div>
    </div>
  );
}

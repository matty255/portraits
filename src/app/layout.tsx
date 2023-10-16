"use client";
import "./globals.css";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { LayoutProps } from "../types/common";
import dynamic from "next/dynamic";

export default function Layout({ children, home }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const TitleBar = dynamic(() => import("../components/view/TitleBar"), {
    ssr: false,
  });

  return (
    <div className={`h-screen fixed w-full ${sidebarOpen ? "dark" : ""}`}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`hidden md:block md:fixed top-0 left-0 h-screen transition-all duration-300 ${
          sidebarOpen ? "md:w-64" : "md:w-24"
        } bg-blue-300 dark:bg-gray-800`}
      >
        <button className="pt-24" onClick={() => setSidebarOpen(!sidebarOpen)}>
          Toggle Sidebar
        </button>
      </div>

      {/* Main Layout */}
      <div
        className={`scrollbar-hide h-screen w-full overflow-scroll transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "md:ml-24"
        }`}
      >
        <header>
          <TitleBar home={home} toggleDarkMode={() => {}} />
          {/* Add a button to toggle the sidebar */}
        </header>
        <main
          className="p-10 min-h-screen bg-slate-100 dark:bg-slate-700
"
        >
          {children}
        </main>
      </div>
    </div>
  );
}

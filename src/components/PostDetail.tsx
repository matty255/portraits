"use client";
import useTailwindBreakpoint from "@/hooks/useTailwindBreakpoint";
import { useToggle } from "@/hooks/useToggle";
import { useHistoryStore } from "@/store/useHistoryStore";
import { Post } from "@/types/posts/posts";
import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";
import PostBody from "./PostBody";

export default function PostDetail({ post }: { post: Post }) {
  const { width, breakpoints } = useTailwindBreakpoint();
  const pathname = usePathname();
  const [open, setOpen] = useToggle(false);

  const { setHistory } = useHistoryStore();

  useEffect(() => {
    setHistory(pathname);
  }, [pathname, setHistory]);

  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <section className="w-full ">
        <article className="prose overflow-auto mx-auto w-full">
          <PostBody {...post} />
        </article>
      </section>
    </Suspense>
  );
}

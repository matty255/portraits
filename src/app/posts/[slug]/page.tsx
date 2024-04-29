// posts/[slug]/page.tsx

import Layout from "@/components/Layout";

import { getPost } from "@/lib/getPost";
import { getPosts } from "@/lib/getPosts";
import { notFound } from "next/navigation";
import { Suspense, lazy } from "react";

// Lazy load the PostDetail component
const PostDetail = lazy(() => import("@/components/PostDetail"));

export default async function PostDetailPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = await getPost(slug);

  if (!post) return notFound();

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <PostDetail post={post} />
      </Suspense>
    </Layout>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post?.slug,
  }));
}

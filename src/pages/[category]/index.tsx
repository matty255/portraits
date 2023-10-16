import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { PostData, PostFilteredArray } from "../../types/common";
import Layout from "@/layout";
import { getAllCategories, getPostsByCategory } from "@/lib/MakePosts";
import Link from "next/link";

const CategoryPage = (postArray: PostFilteredArray) => {
  const router = useRouter();
  const { category } = router.query;
  const [posts, setPosts] = useState<PostData[]>(postArray.posts ?? []);

  //   console.log(posts);
  return (
    <Layout home={false}>
      <div className="prose dark:prose-invert pt-10">
        <h1>
          POST in <span className="uppercase tracking-wider">{category}</span>
        </h1>
        <ul>
          {posts.length &&
            posts.map((post, index) => (
              <li key={index}>
                <Link href={`${post.category}/${post.id}`}>{post.title}</Link>
              </li>
            ))}
        </ul>
      </div>
    </Layout>
  );
};

export default CategoryPage;

export async function getStaticPaths() {
  const categories = getAllCategories();
  const paths = categories.map((category) => ({
    params: { category: category.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: PostData) {
  const posts = getPostsByCategory(params.category); // 서버 사이드에서 실행됩니다.
  return { props: { posts } };
}

import Layout from "@/components/Layout";
import { getPosts } from "@/lib/getPosts";
import { parseDateString } from "@/utils/parseTime";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();

  return (
    <Layout>
      <main className="w-full flex flex-col items-center sm:p-6 md:p-12 gap-y-5 ">
        <section className="bg-red-300 text-black rounded-lg p-4 w-full">
          <h2 className="text-2xl font-bold pb-3">Welcome to my blog.</h2>
        </section>

        <section className="bg-red-300 text-black rounded-lg p-4 w-full">
          <h2 className="text-lg font-bold pb-2">최근 글</h2>
          <ul className="flex flex-col gap-y-3">
            {posts &&
              posts.map((post) => (
                <li
                  key={post?.title}
                  className="underline-offset-2 hover:underline"
                >
                  <Link href={`/posts/${post?.slug}`}>
                    <h3 className="text-xl font-bold">{post?.title}</h3>
                    <p className="text-sm">
                      {parseDateString(post?.frontmatter.date || "")}
                    </p>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </main>
    </Layout>
  );
}

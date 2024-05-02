import Layout from "@/components/Layout";
import { getPosts } from "@/lib/getPosts";
import { parseDateString } from "@/utils/parseTime";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();

  return (
    <Layout>
      <main className="w-full flex flex-col items-center sm:p-6 md:p-12 gap-y-5 ">
        <section className="bg-yellow-400 text-white rounded-lg p-4 w-full">
          <h2 className="text-2xl font-bold pb-3">Explore</h2>
        </section>

        <section className="bg-yellow-400 text-white rounded-lg p-4 w-full">
          <h2 className="text-2xl font-bold pb-3">Recent Posts</h2>
          <ul className="flex flex-col gap-y-3">
            {posts &&
              posts.map((post) => (
                <li key={post?.title} className="">
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

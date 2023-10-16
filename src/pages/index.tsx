import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import Date from "../common/Date";

import { getSortedPostsData } from "../lib/MakePosts";
import React from "react";

import { motion } from "framer-motion";
import { TypingAnimationArray, profile } from "../constants/profile";
import TypingAnimationText from "../common/TypingAnimationText";
import Chip from "../common/Chip";
import Layout from "@/layout";
import { PostData } from "@/types/common";
import { useRecoilState } from "recoil";
import { allPostsDataState } from "../../store/allPostsDataState";

export default function Home({
  allPostsData,
  allCategories,
}: {
  allPostsData: PostData[];
  allCategories: string[];
}) {
  const { siteTitle, description, url, banner } = profile;
  const [viewCategory, setCategory] = useState("all");
  const [wordIndex, setWordIndex] = useState(0);
  const [allPostsDataInit, setAllPostsData] = useRecoilState(allPostsDataState);

  useEffect(() => {
    setAllPostsData(allPostsData);
  }, [allPostsData, setAllPostsData]);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={siteTitle} />

        <meta property="description" content={description} />
        <meta property="og:description" content={description} />

        <meta property="og:image" content={banner} />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image" content={banner} />

        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={siteTitle} />
      </Head>

      <div className="prose dark:prose-invert ">
        <section>
          <h1 className="text-3xl font-bold underline"></h1>
        </section>

        <section>
          {/* <TypingAnimationText
            words={TypingAnimationArray}
            wordIndex={wordIndex}
            setWordIndex={setWordIndex}
          /> */}
        </section>
        <section className="inline-flex gap-3">
          {allCategories.map((category: string) => (
            <Chip
              key={category}
              onClick={() => setCategory(category)}
              content={category}
            />
          ))}
        </section>
        <section>
          <h2>Posts</h2>
          <ul>
            {allPostsData.map(
              ({ id, category, date, title, image }: PostData) => (
                <motion.article
                  key={id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <li
                    style={{
                      display:
                        viewCategory === category || viewCategory === "all"
                          ? "block"
                          : "none",
                    }}
                  >
                    <Link href="/[category]/[id]" as={`/${category}/${id}`}>
                      {title}
                    </Link>
                    <br />
                    <small>
                      <Date dateString={date} />
                    </small>
                    <br />
                    {/* <Image src={image} alt={id} layout="fill" objectFit="cover" /> */}
                  </li>
                </motion.article>
              )
            )}
          </ul>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const allCategories: string[] = Array.from(
    new Set(allPostsData.map((post) => post.category))
  );
  return {
    props: {
      allPostsData,
      allCategories,
    },
  };
}

// getStaticProps를 getServerSideProps로 변경
// export async function getServerSideProps() {
//   const allPostsData = getSortedPostsData();
//   const allCategories = Array.from(
//     new Set(allPostsData.map((post) => post.category))
//   );

//   return {
//     props: {
//       allPostsData,
//       allCategories,
//     },
//   };
// }

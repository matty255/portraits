import Head from "next/head";
import Layout from "@/layout";
import Date from "../../common/Date";
import {
  getAllPostIds,
  getPostData,
  getSortedPostsData,
} from "../../lib/MakePosts";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { PostContentData, PostIdParams } from "../../types/common";
import { profile } from "../../constants/profile";
import { useRecoilState } from "recoil";
import { allPostsDataState } from "../../../store/allPostsDataState";

export default function Post({ postData, allPostsData }: PostContentData) {
  const [allPostsDataInit, setAllPostsData] = useRecoilState(allPostsDataState);

  useEffect(() => {
    if (allPostsDataInit.length === 0) setAllPostsData(allPostsData);
  }, [allPostsData, setAllPostsData, allPostsDataInit]);
  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={postData.title} />

        <meta property="description" content={postData.description} />
        <meta property="og:description" content={postData.description} />

        <meta property="og:image" content={postData.image} />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image" content={postData.image} />

        <meta property="og:url" content={postData.url} />
        <meta property="og:site_name" content={profile.siteTitle} />
      </Head>
      <motion.div
        className="prose dark:prose-invert"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="pt-10">{postData.title}</h1>
        <p>{postData.description}</p>
        <br />
        <Date dateString={postData.date} />
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </motion.div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: PostIdParams) {
  const postData = await getPostData(params.category, params.id);
  const allPostsData = getSortedPostsData();
  return {
    props: {
      postData,
      allPostsData,
    },
  };
}

// // getStaticPaths와 getStaticProps를 제거하고 getServerSideProps를 사용
// export async function getServerSideProps(context: PostIdParams) {
//   const { params } = context;
//   const postData = await getPostData(params.category, params.id);

//   // 페이지가 존재하지 않는 경우 404 페이지를 보여줍니다.
//   if (!postData) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       postData,
//     },
//   };
// }

// getTag.ts

import { FrontmatterData } from "@/types/posts/frontmatters";
import { Post } from "@/types/posts/posts";

import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { cache } from "react";

export const getTag = cache(
  async (tagName: string, folderName: string = "posts") => {
    try {
      const postsDirectory = path.resolve(process.cwd(), folderName);
      const files = await fs.readdir(postsDirectory);
      const postsWithTag = await Promise.all(
        files
          .filter((file) => path.extname(file) === ".md")
          .map(async (file) => {
            const decodedFileName = decodeURIComponent(file);
            const filePath = path.resolve(postsDirectory, decodedFileName);
            const content = await fs.readFile(filePath, "utf8");
            const { data, content: body } = matter(content);

            if (
              data.published === false ||
              !data.tags ||
              !data.tags.includes(tagName)
            ) {
              return null;
            }

            const slug = decodedFileName.replace(/\.md$/, "");
            return {
              frontmatter: data as FrontmatterData,
              body,
              slug,
              title: data.title,
            } as Post;
          })
      );

      return postsWithTag.filter((post) => post !== null);
    } catch (error) {
      console.error(
        `Error while reading posts with tag: ${tagName} from folder: ${folderName}`,
        error
      );
      throw new Error(
        `Error while reading posts with tag: ${tagName} from folder: ${folderName}`
      );
    }
  }
);

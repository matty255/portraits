import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { getSortedPostsData } from "@/lib/MakePosts";

interface PostData {
  id: string;
  title: string;
  category: string;
  // 다른 필드들...
}

interface SearchProps {
  allPostsData: PostData[];
}

export default function Search({ allPostsData }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>(allPostsData);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = allPostsData.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex === null || prevIndex >= filteredPosts.length - 1
          ? 0
          : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex === null || prevIndex <= 0 ? null : prevIndex - 1
      );
    } else if (e.key === "Enter") {
      if (selectedIndex !== null) {
        const selectedPost = filteredPosts[selectedIndex];
        setSearchQuery(selectedPost.title);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={handleSearch}
        onKeyDown={handleKeyPress}
        className="p-2 border rounded focus:outline-none focus:border-blue-500"
      />
      <ul className="mt-4">
        {filteredPosts.map((post, index) => (
          <li
            key={post.id}
            className={`p-4 rounded ${
              index === selectedIndex ? "bg-gray-200" : ""
            }`}
          >
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

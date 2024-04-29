import { Post } from "@/types/posts/posts";

export const LOOT_LAYOUT_METADATA = {
  title: {
    template: "%s | Portraits",
    default: "Portraits | HR. Lee's Blog.",
  },
  description: "Portraits, HR. Lee's Blog.",
  openGraph: {
    title: "Portraits",
    description: "Portraits, HR. Lee's Blog.",
    url: "",
    siteName: "Portraits",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "Portraits",
      },
    ],
  },
  icons: {
    shortcut: "",
  },
};

export const LOOT_CONTRIBUTE_METADATA = {
  title: `Guide | Contribute to Portraits`,
  description: "Portraits, HR. Lee's Blog.",
  openGraph: {
    title: "Contribute",
    description: "Portraits, HR. Lee's Blog.",
    siteName: "Portraits",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "Portraits",
      },
    ],
  },
  icons: {
    shortcut: "",
  },
};

export const LOOT_ABOUT_METADATA = {
  title: `About | About us`,
  description: "Portraits, HR. Lee's Blog.",
  openGraph: {
    title: "About",
    description: "Portraits, HR. Lee's Blog.",
    siteName: "Portraits",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "Portraits",
      },
    ],
  },
  icons: {
    shortcut: "",
  },
};

export const LOOT_POSTS_METADATA = {
  title: `Posts | Portraits Posts`,
  description: "Portraits, HR. Lee's Blog.",
  openGraph: {
    title: "Posts",
    description: "Portraits, HR. Lee's Blog.",
    siteName: "Portraits",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "Portraits",
      },
    ],
  },
  icons: {
    shortcut: "",
  },
};

export const LOOT_CONTRIBUTE_DETAIL_METADATA = (postDetail: Post | null) => {
  return {
    title: postDetail?.title,
    description: `${postDetail?.frontmatter.title} | HR. Lee.`,
    openGraph: {
      title: postDetail?.title,
      description: `${postDetail?.frontmatter.title} | HR. Lee.`,
      type: "website",
    },
  };
};

export const LOOT_POST_DETAIL_METADATA = (postDetail: Post | null) => {
  return {
    title: postDetail?.title,
    description: `${postDetail?.frontmatter.title} | HR. Lee.`,
    openGraph: {
      title: postDetail?.title,
      description: `${postDetail?.frontmatter.title} | HR. Lee.`,
      type: "website",
    },
  };
};

import { link } from "fs";

export const NAV_LINKS = [
  { href: "/", key: "added_today", label: "Added Today" },
  { href: "/", key: "full_list", label: "Full List" },
  { href: "/tools", key: "ai_tools", label: "AI Tools" },
  { href: "/", key: "gpts ", label: "GPTs " },
  { href: "/category", key: "ai_categories", label: "AI Categories" },
  { href: "/", key: "prompts", label: "Prompts" },
  { href: "/", key: "top_picks", label: "Top Picks" },
  { href: "", key: "submit", label: "Submit" },
];

export const categories = [
  "Business",
  "Education",
  "Environmental",
  "Nutrition",
  "Government",
  "Health",
  "Language",
  "Media",
  "Blockchain",
  "Lifestyle",
  "Security ",
  "Sports",
  "Engineering",
  "Travel",
  "Utilities",
  "Communication",
  "Tech",
  "Privacy"
];

export const featuredProducts = [
  {
    id: "submitaitools",
    name: "Submit AI Tools",
    logo: "/submitaitools.jpg",
    image: "/submitaitoolsimg.PNG",
    description:
      "A handpicked selection of top AI tools designed to enhance productivity, automate tasks, and optimize workflows. Explore the best AI applications that help streamline your daily operations and improve efficiency across various tasks.",
    tag: "tool",
    tagIcon: "/star.svg",
    link: "https://submitaitools.org/",
  },
  {
    id: "heygen",
    name: "Heygen",
    logo: "/heygrn.png",
    image: "/featureproduct2.png",
    description:
      "Heygen is an AI-driven platform that provides tools for creating personalized video content and virtual avatars.",
    tag: "Avatar",
    tagIcon: "/star.svg",
    link: "https://www.heygen.com/",
  },
  {
    id: "synthesia",
    name: "Synthesia",
    logo: "/synthesia.png",
    image: "/featureproduct3.png",
    description:
      "Synthesia is an AI video communications platform that allows users to create professional-quality videos from text.",
    tag: "Video",
    tagIcon: "/star.svg",
    link: "https://www.synthesia.io/",
  },
];

export async function getFeaturedProducts() {
  return featuredProducts;
}



export const similarTools = [
  {
    name: "Vidnoz AI Video Generator",
    description:
      "Focuses on the AI video creation and offer 1500+ AI avatars, 1380+ realistic AI voices, and 2800+ templates to help users generate wonderful videos easily!",
    image: "/tool.png",
    logo: "/vidnoz.jpg",
    tag: "Video",
  },
  {
    name: "Chat PDF",
    description: "ChatPDFGPT: Free AI Chat for Any PDF Document",
    image: "/tool1.png",
    logo: "/chat.png",
    tag: "Chat",
  },
  {
    name: "Buildin AI",
    logo: "/bulldln.png",
    image: "/tool2.png",
    description:
      "OpusClip simplifies video editing with automated clipping and creative tools.",
    tag: "Productivity",
    tagIcon: "/star.svg",
  },
  {
    name: "AlgoDocs",
    logo: "/algodocs.png",
    image: "/tool3.png",
    description:
      "RunwayML offers generative video editing tools powered by AI for creators.",
    tag: "Content Creation",
    tagIcon: "/star.svg",
  }
];

export const featuredTools = [
  { name: "Submit AI Tools", logo: "/submitaitools.jpg", link: "https://submitaitools.org/" },
  { name: "Heygen", logo: "/heygen.jpeg", link: "https://www.heygen.com/" },
  { name: "Synthesia", logo: "/synth.jpeg", link: "https://www.synthesia.io/" },
];

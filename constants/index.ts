export const NAV_LINKS = [
  { href: "/", key: "added_today", label: "Added Today" },
  { href: "/", key: "full_list", label: "Full List" },
  { href: "/", key: "ai_tools", label: "AI Tools" },
  { href: "/", key: "gpts ", label: "GPTs " },
  { href: "/", key: "ai_categories", label: "AI Categories" },
  { href: "/", key: "prompts", label: "Prompts" },
  { href: "/", key: "top_picks", label: "Top Picks" },
  { href: "/submit", key: "submit", label: "Submit" },
];

export const categories = [
  "Productivity",
  "Business",
  "Avatar",
  "Podcasting",
  "Chat",
  "Voice",
  "Content Creation",
  "Video",
  "Advertisement",
  "Chatbot",
  "Automation",
  "Design",
  "Social Media",
  "Copywriting",
  "Management",
  "Marketing",
  "Education",
  "SEO",
];

export const featuredProducts = [
  {
    id: "opusclip",
    name: "OpusClip",
    logo: "/opus.png",
    image: "/featureproduct1.png",
    description:
      "AI-based video editing platform that simplifies the editing process with automated features and creative templates.",
    tag: "Video",
    tagIcon: "/star.svg",
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
  },
  {
    name: "TurboDoc",
    logo: "/turbodoc.png",
    image: "/tool4.png",
    description:
      "Descript is an all-in-one tool for video editing, transcription, and podcasting.",
    tag: "Automation",
    tagIcon: "/star.svg",
  },
  {
    name: "Innerly AI",
    logo: "/innerly.png",
    image: "/tool5.png",
    description:
      "Pictory lets you create short videos from long content using AI summarization.",
    tag: "Business",
    tagIcon: "/star.svg",
  },
];

export const featuredTools = [
  { name: "OpusClip", logo: "/opus.png" },
  { name: "Heygen", logo: "/heygen.jpeg" },
  { name: "Synthesia", logo: "/synth.jpeg" },
  { name: "Frase", logo: "/frase.png" },
  { name: "Alli AI", logo: "/alli.jpeg" },
];

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

// export const latestTools = [
//   {
//     name: "Vidnoz AI Video Generator",
//     logo: "/synthesia.png",
//     image: "/tool.png",
//     description:
//       "Synthesia is an AI video communications platform that allows users to create professional-quality videos from text.",
//     tag: "Video",
//     tagIcon: "/star.svg",
//   },
//   {
//     name: "Chat PDF",
//     logo: "/heygen.png",
//     image: "/tool1.png",
//     description:
//       "Heygen is an AI-driven platform for creating personalized video content and avatars.",
//     tag: "Avatar",
//     tagIcon: "/star.svg",
//   },
// {
//   name: "Buildin AI",
//   logo: "/opus.png",
//   image: "/tool2.png",
//   description:
//     "OpusClip simplifies video editing with automated clipping and creative tools.",
//   tag: "Video",
//   tagIcon: "/star.svg",
// },
//   {
//   name: "AlgoDocs",
//   logo: "/runway.png",
//   image: "/tool3.png",
//   description:
//     "RunwayML offers generative video editing tools powered by AI for creators.",
//   tag: "Editing",
//   tagIcon: "/star.svg",
// },
// {
//   name: "TurboDoc",
//   logo: "/descript.png",
//   image: "/tool4.png",
//   description:
//     "Descript is an all-in-one tool for video editing, transcription, and podcasting.",
//   tag: "Transcription",
//   tagIcon: "/star.svg",
// },
// {
//   name: "Innerly AI",
//   logo: "/pictory.png",
//   image: "/tool5.png",
//   description:
//     "Pictory lets you create short videos from long content using AI summarization.",
//   tag: "Shorts",
//   tagIcon: "/star.svg",
// },
//   {
//     name: "Sigma AI Browser",
//     logo: "/veed.png",
//     image: "/tool6.png",
//     description:
//       "Veed.io is a powerful online video editor with subtitles, effects, and templates.",
//     tag: "Editor",
//     tagIcon: "/star.svg",
//   },
//   {
//     name: "Packify",
//     logo: "/lumen5.png",
//     image: "/tool7.png",
//     description:
//       "Lumen5 turns blog posts into engaging videos using AI and stock content.",
//     tag: "Marketing",
//     tagIcon: "/star.svg",
//   },
//   {
//     name: "GPT Panda",
//     logo: "/fliki.png",
//     image: "/tool8.png",
//     description:
//       "Fliki converts text into videos with AI voices and stock visuals.",
//     tag: "Text-to-Video",
//     tagIcon: "/star.svg",
//   },
//   {
//     name: "CopySpace",
//     logo: "/animoto.png",
//     image: "/tool9.png",
//     description:
//       "Animoto is an easy drag-and-drop video maker for slideshows and social posts.",
//     tag: "Social",
//     tagIcon: "/star.svg",
//   },
//   {
//     name: "ContentBot",
//     logo: "/invideo.png",
//     image: "/tool10.png",
//     description:
//       "InVideo helps create professional videos with ready-made templates.",
//     tag: "Templates",
//     tagIcon: "/star.svg",
//   },
//   {
//     name: "Typeshare",
//     logo: "/steveai.png",
//     image: "/tool11.png",
//     description:
//       "Steve.AI generates animated videos and live-action content from scripts.",
//     tag: "Scripted",
//     tagIcon: "/star.svg",
//   },
//   {
//     name: "Tugan",
//     logo: "/synthesys.png",
//     image: "/tool12.png",
//     description:
//       "Synthesys lets you generate AI voiceovers and avatars for business videos.",
//     tag: "Avatar",
//     tagIcon: "/star.svg",
//   },
//   {
//     name: "Mixo",
//     logo: "/elai.png",
//     image: "/tool13.png",
//     description:
//       "Elai.io creates AI avatar videos from plain text, perfect for product explainers.",
//     tag: "Explainer",
//     tagIcon: "/star.svg",
//   },
//   {
//     name: "Text Cortex",
//     logo: "/wisecut.png",
//     image: "/tool.png14",
//     description:
//       "Wisecut helps auto-edit videos with voice recognition and subtitles.",
//     tag: "Auto Edit",
//     tagIcon: "/star.svg",
//   },
//   {
//     name: "Neuraltext",
//     logo: "/kamua.png",
//     image: "/tool15.png",
//     description:
//       "Kamua automates video cropping and resizing for multiple social platforms.",
//     tag: "Crop",
//     tagIcon: "/star.svg",
//   },
//   {
//     name: "Luna AI",
//     logo: "/magisto.png",
//     image: "/tool16.png",
//     description:
//       "Magisto uses AI to create and edit marketing videos in minutes.",
//     tag: "Marketing",
//     tagIcon: "/star.svg",
//   },
//   {
//     name: "DigitalFirst",
//     logo: "/clipchamp.png",
//     image: "/tool17.png",
//     description:
//       "Clipchamp is a free online video editor backed by Microsoft.",
//     tag: "Editor",
//     tagIcon: "/star.svg",
//   },
//   {
//     name: "Notion AI",
//     logo: "/rocketium.png",
//     image: "/tool18.png",
//     description:
//       "Rocketium enables automated video creation at scale for enterprises.",
//     tag: "Enterprise",
//     tagIcon: "/star.svg",
//   },
//   {
//     name: "Elementor AI",
//     logo: "/flexclip.png",
//     image: "/tool19.png",
//     description:
//       "FlexClip offers simple video editing and slideshow tools for everyone.",
//     tag: "Slideshow",
//     tagIcon: "/star.svg",
//   },
//   {
//     name: "Cheatlayer",
//     logo: "/rephrase.png",
//     image: "/tool20.png",
//     description:
//       "Rephrase.ai creates personalized video messages with AI avatars.",
//     tag: "Personalized",
//     tagIcon: "/star.svg",
//   },
//   {
//     name: "Coda AI",
//     logo: "/vidnami.png",
//     image: "/tool21.png",
//     description:
//       "Vidnami (now acquired) was known for turning scripts into videos easily.",
//     tag: "Legacy",
//     tagIcon: "/star.svg",
//   },
//   {
//     name: "Eloise AI",
//     logo: "/synthsvideo.png",
//     image: "/tool22.png",
//     description:
//       "Synths Video helps convert blog articles into AI-generated videos.",
//     tag: "Text-to-Video",
//     tagIcon: "/star.svg",
//   },
//   {
//     name: "CourseAI",
//     logo: "/deepbrain.png",
//     image: "/tool23.png",
//     description:
//       "DeepBrain Studio allows users to create realistic AI presenter videos.",
//     tag: "Studio",
//     tagIcon: "/star.svg",
//   },
//   {
//     name: "Castmagic",
//     logo: "/deepbrain.png",
//     image: "/tool24.png",
//     description:
//       "DeepBrain Studio allows users to create realistic AI presenter videos.",
//     tag: "Studio",
//     tagIcon: "/star.svg",
//   },
//   {
//     name: "Todoist AI Assistant",
//     logo: "/deepbrain.png",
//     image: "/tool25.png",
//     description:
//       "DeepBrain Studio allows users to create realistic AI presenter videos.",
//     tag: "Studio",
//     tagIcon: "/star.svg",
//   },
//   {
//     name: "Referral Factory",
//     logo: "/deepbrain.png",
//     image: "/tool26.png",
//     description:
//       "DeepBrain Studio allows users to create realistic AI presenter videos.",
//     tag: "Studio",
//     tagIcon: "/star.svg",
//   }
// ];

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

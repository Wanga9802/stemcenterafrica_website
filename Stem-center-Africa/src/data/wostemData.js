import wostemo from "../assets/wostemo.JPG";
import wostemt from "../assets/wostemt.JPG";
import wostemth from "../assets/wostemth.JPG";
import wostemf from "../assets/wostemf.JPG";
import wostemfi from "../assets/wostemfi.JPG";
import wostemsi from "../assets/wostemsi.JPG";
import wostemse from "../assets/wostemse.JPG";
import winnersThumb from "../assets/winners.png";
import austonat from '../assets/Austronaut.png';
export const wostemIntro = {
  title: "Women in STEM (WoSTEM)",
  description:
    "While our programs promote STEM education among all students in Africa and beyond, we are making extraordinary efforts to promote STEM education among girls. Traditionally, STEM education has been dominated by boys — as STEM Center Africa, we're joining others working to bring gender equality to STEM fields.",
  focusAreas: [
    "Coding",
    "Programming (e.g. Scratch)",
    "Computational Thinking",
    "Makerspaces (3D Design & Printing)",
    "Machine Learning",
    "Robotics & Robotics Programming",
  ],
  note: "Our aim is to organize STEM activities and mentorship programs specifically for girls. These programs occur every weekend, with participants working on projects in groups or with mentors.",
};

export const spacePartnership = {
  title: "Join The Space Program",
  partners: [
    { name: "ISSET", logo: "/images/wostem/isset-logo.png" },
    { name: "Starlight Education", logo: "/images/wostem/starlight-logo.png" },
  ],
  description:
    "In collaboration with Starlight Education Group, STEM Center Africa is introducing a female-only STEM competition where talented girls aged 12–18 design experiments — the best of which are sent to the ISS. The mission: motivate and inspire young girls to realize their potential in STEM.",
  image: austonat,
  ctaLabel: "Sign Up Here",
  ctaLink: "/programs/wostem/signup",
};

export const competition = {
  title: "International Competition: ISSET All Girls Mission Discovery Program",
  stats: [
    { label: "Girls Participated", value: "7" },
    { label: "Teams Competed", value: "220" },
    { label: "Total Girls", value: "700" },
    { label: "Result", value: "Winners" },
  ],
  highlights: [
    'Our 7 girls participated in the "All Girls Launch Prize" competition, organized by International Space School Educational Trust.',
    "Each team submitted an idea that could work on Earth and in space.",
    "The girls' project won the prize!",
    "Ideas were judged by NASA astronauts.",
  ],
  projectTitle:
    "Zero Gravity Project: Using Arduino UNO to Design a Dust-Repellent Surface",
  projectLink: "https://...",
  videos: [
    {
      id: "winners-declaration",
      title: "Winners Declaration",
      url: "https://youtu.be/v-W_sDYFf_c",
      start: 330,
      end: 390,
      featured: true,
      thumbnail: winnersThumb,
    },
    {
      id: "full-session",
      title: "Watch the Whole Session",
      url: "https://youtu.be/v-W_sDYFf_c",
      featured: false,
    },
  ],
};

export const facilitiesGallery = [
  { src: wostemo, alt: "Girls assembling a robot chassis" },
  { src: wostemt, alt: "Coding club pair programming" },
  { src: wostemth, alt: "3D printing workshop" },
  { src: wostemf, alt: "Regional robotics competition" },
  { src: wostemfi, alt: "Regional robotics competition" },
  { src: wostemsi, alt: "Regional robotics competition" },
  { src: wostemse, alt: "Regional robotics competition" },
];
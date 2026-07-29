import lineImg from "../assets/line.jpg";
import roboafricaImg from "../assets/roboafrica.jpg";
import gemlaImg from "../assets/yaye.png";
import scratchImg from "../assets/scra.png";

const projects = [
  {
    id: 1,
    slug: "line-following-robot",
    programSlug: "robotics",
    image: lineImg,
    tag: "Robotics",
    title: "Line Following Robot",
    description: "Arduino | Sensors | C++",
    fullDescription: "Students built an autonomous robot that follows a marked path using infrared sensors and Arduino-based control logic, applying core concepts in electronics and embedded programming.",
    date: "2025-03-14",
    featured: true,
  },
  {
    id: 2,
    slug: "solarbot-africa",
    programSlug: "robotics",
    image: roboafricaImg,
    tag: "Innovation",
    title: "RoboAfrica",
    description: "Sustainable energy solution for communities.",
    fullDescription: "A solar-powered robotics initiative designed to bring renewable energy education to underserved communities, combining hands-on engineering with sustainability principles.",
    date: "2025-04-02",
    featured: true,
  },
  {
    id: 3,
    slug: "GEMLA",
    programSlug: "ai",
    image: gemlaImg,
    tag: "Innovation",
    title: "GEMLA AI",
    description: "Multimodal AI to support real-time teaching.",
    fullDescription: "An IoT-based weather monitoring system built by students to collect and visualize real-time environmental data using low-cost sensors and microcontrollers.",
    date: "2025-05-20",
    featured: true,
  },
  {
    id: 4,
    slug: "scratch-game-development",
    programSlug: "scratch",
    image: scratchImg,
    tag: "Coding",
    title: "Scratch Game Development",
    description: "Creative games using Scratch programming.",
    fullDescription: "Beginner coders designed and built original games in Scratch, learning fundamental programming logic like loops, conditionals, and event handling through creative play.",
    date: "2025-06-10",
    featured: false,
  },
  {
    id: 5,
    slug: "drone-demonstration",
    programSlug: "drone-technology",
    image: "/assets/projects/drone-demonstration.jpg",
    tag: "Drones",
    title: "Drone Demonstration",
    description: "Programming drones for real-world applications.",
    fullDescription: "Students programmed and piloted drones to explore real-world applications in agriculture, mapping, and logistics, gaining exposure to flight control systems.",
    date: "2025-06-28",
    featured: false,
  },
];

export default projects;
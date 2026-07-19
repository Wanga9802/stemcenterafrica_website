// Replace these with the real asset files once you have them in ../assets/
import GemlaImage from '../assets/yaye.png';
import AmfImage from '../assets/gemla.png';
import SolarbotImage from '../assets/mitchi.jpg';

export const innovations = [
  {
    id: 1,
    title: "GEMLA-Agent",
    subtitle: "GenAI-Enhanced Multimodal Learning Analytics",

 
    
    description:
      "An AI innovation initiative building an intelligent multimodal learning analytics system. GEMLA-Agent explores how generative and multimodal AI can integrate speech data, visual information, learner artifacts, interaction patterns, and educational context to surface intelligent insights and support decision-making in the classroom.",

    capability_area: "AI & Machine Learning",
    status: "ongoing", // "ongoing" | "active" | "completed"

    cover_image_url: GemlaImage,

    tags: ["Generative AI", "Multimodal AI", "Learning Analytics", "AI Reasoning"],
    timeline: "Ongoing",

    // Shown in the expandable "Technical details" section — not on the card face.
    key_components: [
      "Speech data integration",
      "Visual information processing",
      "Learner artifacts analysis",
      "Interaction pattern tracking",
      "Educational context modeling",
      "AI reasoning systems",
      "Data pipelines",
      "Human-centered AI design",
    ],
    capabilities_demonstrated: [
      "Multimodal AI development",
      "Data integration",
      "AI model evaluation",
      "Applied machine learning research",
    ],
  },
  {
    id: 2,
    title: "Account-my-Fund (AMF)",
    subtitle: "Smart Accountability Platform",

    description:
      "A technology solution built to improve accountability in public toilet revenue management. AMF combines digital data capture, automated reporting, data analytics, and transparency mechanisms to turn an operational challenge into a technology-enabled solution.",

    capability_area: "Software Development & Automation",
    status: "ongoing",

    cover_image_url: AmfImage,

    tags: ["Data Systems", "Automation", "Transparency", "Public Systems"],
    timeline: "Ongoing",

    key_components: [
      "Digital data capture",
      "Automated reporting",
      "Data analytics",
      "Software workflows",
      "Transparency mechanisms",
    ],
    capabilities_demonstrated: [
      "Translating operational challenges into technology-enabled solutions",
    ],
  },
  {
    id: 3,
    title: "SOLARBOT AFRICA",
    subtitle: "Embedded Systems and IoT Innovation",

    description:
      "A portable, solar-powered robotics and coding platform combining embedded systems, electronics, robotics, renewable energy, and software programming — demonstrating hardware-software integration for resource-constrained environments.",

    capability_area: "Robotics & Embedded Systems",
    status: "ongoing",

    cover_image_url: SolarbotImage,

    tags: ["Robotics", "IoT", "Renewable Energy", "Embedded Systems"],
    timeline: "Ongoing",

    key_components: [
      "Embedded systems",
      "Electronics",
      "Robotics",
      "Renewable energy",
      "Software programming",
      "Sensor data collection",
    ],
    capabilities_demonstrated: [
      "Hardware-software integration",
      "Technology solutions for resource-constrained environments",
      "Real-world experimentation",
    ],
  },
];

// --- Helpers -----------------------------------------------------

export const getOngoingOrActiveInnovations = () =>
  innovations.filter((item) => item.status === "ongoing" || item.status === "active");

export const getActiveInnovations = () => getOngoingOrActiveInnovations();

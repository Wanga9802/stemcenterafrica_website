import YayeImage from '../assets/yaye.png';
import RoboAfricaImage from '../assets/roboafrica.jpg';

export const innovations = [
  {
    id: 1,
    slug: "gemla-ai-agent",
    title: "GEMLA AI Agent",

    // Shown on the card
    short_description:
      ", an agentic AI system that enables real-time human-AI collaboration in complex educational environments by functioning as an autonomous co-agent that continuously perceives, interprets, plans,",

    // Shown on the detail page
    full_description: `The Smart Classroom Heatmap uses low-cost sensors placed around a
classroom to track movement, noise levels, and seating engagement, then
renders it as a live heatmap teachers can glance at from the front of
the room.

It was built to answer a simple question we kept hearing from
teachers: "how do I know who's actually engaged, in real time, without
walking around the whole room?" The prototype has been piloted in two
schools and is now being refined based on teacher feedback.`,

    capability_area: "AI & Machine Learning Training",
    status: "active", // "active" | "completed"

    cover_image_url: YayeImage,
    gallery_urls: [
      "/images/innovations/heatmap-1.jpg",
      "/images/innovations/heatmap-2.jpg",
    ],

    // Quick-glance stats shown on the card AND detail page
    impact_metrics: [
      { label: "Schools piloted", value: "0" },
      { label: "Students reached", value: "0+" },
    ],

    partners: ["Nairobi Tech High", "XYZ Foundation"],
    tags: ["AI", "IoT", "Education"],

    // Optional — used for card teaser copy, e.g. "3 min read" style scannability
    timeline: "Jan 2026 – Present",
  },
  {
    id: 2,
    slug: "roboafrica",
    title: "RoboAfrica",
    short_description:
      "A robotics innovation project developing hands-on embedded systems and AI-powered learning tools for African youth.",
    full_description: `Replace with the full story: the problem, the approach, how it
works, and what's next.`,
    capability_area: "Robotics & Embedded Systems",
    status: "active",
    cover_image_url: RoboAfricaImage,
    gallery_urls: [],
    impact_metrics: [
      { label: "Prototypes built", value: "1" },
    ],
    partners: [],
    tags: [],
    timeline: "2026",
  },
];

// --- Helpers -----------------------------------------------------

export const getInnovationBySlug = (slug) =>
  innovations.find((item) => item.slug === slug);

export const getActiveInnovations = () =>
  innovations.filter((item) => item.status === "active");

export const getRelatedInnovations = (slug, limit = 2) =>
  innovations.filter((item) => item.slug !== slug).slice(0, limit);

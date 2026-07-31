import threeDActionVideo from '../assets/evidence/3ddesigning/3daction.mp4';
import diyProjectVideo from '../assets/evidence/diy/diypro.mp4';
import roboticsProjectVideo from '../assets/evidence/robotics/robopro.mp4';
import diyProgramActionVideo from '../assets/evidence/diy/diypra.mp4';
import droneProgramActionVideo from '../assets/evidence/drone/dronepra.mp4';
import droneProjectVideo from '../assets/evidence/drone/dronepro.mp4';
import dropi1 from '../assets/evidence/drone/dropi1.jpeg';
import dropi2 from '../assets/evidence/drone/dropi2.jpeg';
import dropi3 from '../assets/evidence/drone/dropi3.jpeg';
import dropi4 from '../assets/evidence/drone/dropi4.jpeg';
import dropi5 from '../assets/evidence/drone/dropi5.jpeg';
import dropi6 from '../assets/evidence/drone/dropi6.jpeg';


const programEvidence = [
  // ==========================================================================
  // PROGRAM: Computer Basics   (slug: "computer-basics")
  // ==========================================================================

  // ---- "Program in Action" (section: "program-in-action") — 6 images + 1 video ----
  {
    // UPLOAD HERE (Computer Basics — program-in-action): MAIN video clip of students actively engaged in this program
    programSlug: "computer-basics",
    section: "program-in-action",
    slot: "hero-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Classroom Experience",
    caption: "Watch our students in action",
    description: "Write a short description of this video here — e.g. MAIN video clip of students actively engaged in this program.",
    tag: "Showcase",
    order: 1,
  },
  {
    // UPLOAD HERE (Computer Basics — program-in-action): photo of students practicing a core skill
    programSlug: "computer-basics",
    section: "program-in-action",
    slot: "image-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Skill Practice",
    caption: "Building core skills",
    description: "Write a short description of this image here — e.g. photo of students practicing a core skill.",
    tag: "Session",
    order: 2,
  },
  {
    // UPLOAD HERE (Computer Basics — program-in-action): photo of an instructor-led demonstration
    programSlug: "computer-basics",
    section: "program-in-action",
    slot: "image-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Instructor Demonstration",
    caption: "Guided learning sessions",
    description: "Write a short description of this image here — e.g. photo of an instructor-led demonstration.",
    tag: "Session",
    order: 3,
  },
  {
    // UPLOAD HERE (Computer Basics — program-in-action): photo of a group/team activity
    programSlug: "computer-basics",
    section: "program-in-action",
    slot: "image-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Group Activity",
    caption: "Collaboration & teamwork",
    description: "Write a short description of this image here — e.g. photo of a group/team activity.",
    tag: "Session",
    order: 4,
  },
  {
    // UPLOAD HERE (Computer Basics — program-in-action): photo of students using program-specific tools/equipment
    programSlug: "computer-basics",
    section: "program-in-action",
    slot: "image-4",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Hands-On Session",
    caption: "Working with real tools",
    description: "Write a short description of this image here — e.g. photo of students using program-specific tools/equipment.",
    tag: "Session",
    order: 5,
  },
  {
    // UPLOAD HERE (Computer Basics — program-in-action): photo showcasing a student project
    programSlug: "computer-basics",
    section: "program-in-action",
    slot: "image-5",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Project Showcase",
    caption: "Creative student projects",
    description: "Write a short description of this image here — e.g. photo showcasing a student project.",
    tag: "Project",
    order: 6,
  },
  {
    // UPLOAD HERE (Computer Basics — program-in-action): photo of a graduation/certificate/milestone moment
    programSlug: "computer-basics",
    section: "program-in-action",
    slot: "image-6",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Milestone Moment",
    caption: "Celebrating achievements",
    description: "Write a short description of this image here — e.g. photo of a graduation/certificate/milestone moment.",
    tag: "Session",
    order: 7,
  },

  // ---- "Skills in Action / Student Projects" (section: "student-projects") — 3 images + 1 video ----
  {
    // UPLOAD HERE (Computer Basics — student-projects): screenshot/photo of student project #1
    programSlug: "computer-basics",
    section: "student-projects",
    slot: "project-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 1",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #1.",
    tag: "Project",
    order: 1,
  },
  {
    // UPLOAD HERE (Computer Basics — student-projects): screenshot/photo of student project #2
    programSlug: "computer-basics",
    section: "student-projects",
    slot: "project-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 2",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #2.",
    tag: "Project",
    order: 2,
  },
  {
    // UPLOAD HERE (Computer Basics — student-projects): screenshot/photo of student project #3
    programSlug: "computer-basics",
    section: "student-projects",
    slot: "project-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 3",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #3.",
    tag: "Project",
    order: 3,
  },
  {
    // UPLOAD HERE (Computer Basics — student-projects): clip of a student presenting/demoing their project
    programSlug: "computer-basics",
    section: "student-projects",
    slot: "project-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Presentation Demo",
    caption: "Student walkthrough of their final project",
    description: "Write a short description of this video here — e.g. clip of a student presenting/demoing their project.",
    tag: "Showcase",
    order: 4,
  },

  // ==========================================================================
  // PROGRAM: 3D Design & Printing   (slug: "3d-designing")
  // ==========================================================================

  // ---- "Program in Action" (section: "program-in-action") — 6 images + 1 video ----
  {
    // UPLOAD HERE (3D Design & Printing — program-in-action): MAIN video clip of students actively engaged in this program
    programSlug: "3d-designing",
    section: "program-in-action",
    slot: "hero-video",
    type: "video",
    src: threeDActionVideo,
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Classroom Experience",
    caption: "Watch our students in action",
    description: "Write a short description of this video here — e.g. MAIN video clip of students actively engaged in this program.",
    tag: "Showcase",
    order: 1,
  },
  {
    // UPLOAD HERE (3D Design & Printing — program-in-action): photo of students practicing a core skill
    programSlug: "3d-designing",
    section: "program-in-action",
    slot: "image-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Skill Practice",
    caption: "Building core skills",
    description: "Write a short description of this image here — e.g. photo of students practicing a core skill.",
    tag: "Session",
    order: 2,
  },
  {
    // UPLOAD HERE (3D Design & Printing — program-in-action): photo of an instructor-led demonstration
    programSlug: "3d-designing",
    section: "program-in-action",
    slot: "image-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Instructor Demonstration",
    caption: "Guided learning sessions",
    description: "Write a short description of this image here — e.g. photo of an instructor-led demonstration.",
    tag: "Session",
    order: 3,
  },
  {
    // UPLOAD HERE (3D Design & Printing — program-in-action): photo of a group/team activity
    programSlug: "3d-designing",
    section: "program-in-action",
    slot: "image-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Group Activity",
    caption: "Collaboration & teamwork",
    description: "Write a short description of this image here — e.g. photo of a group/team activity.",
    tag: "Session",
    order: 4,
  },
  {
    // UPLOAD HERE (3D Design & Printing — program-in-action): photo of students using program-specific tools/equipment
    programSlug: "3d-designing",
    section: "program-in-action",
    slot: "image-4",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Hands-On Session",
    caption: "Working with real tools",
    description: "Write a short description of this image here — e.g. photo of students using program-specific tools/equipment.",
    tag: "Session",
    order: 5,
  },
  {
    // UPLOAD HERE (3D Design & Printing — program-in-action): photo showcasing a student project
    programSlug: "3d-designing",
    section: "program-in-action",
    slot: "image-5",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Project Showcase",
    caption: "Creative student projects",
    description: "Write a short description of this image here — e.g. photo showcasing a student project.",
    tag: "Project",
    order: 6,
  },
  {
    // UPLOAD HERE (3D Design & Printing — program-in-action): photo of a graduation/certificate/milestone moment
    programSlug: "3d-designing",
    section: "program-in-action",
    slot: "image-6",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Milestone Moment",
    caption: "Celebrating achievements",
    description: "Write a short description of this image here — e.g. photo of a graduation/certificate/milestone moment.",
    tag: "Session",
    order: 7,
  },

  // ---- "Skills in Action / Student Projects" (section: "student-projects") — 3 images + 1 video ----
  {
    // UPLOAD HERE (3D Design & Printing — student-projects): screenshot/photo of student project #1
    programSlug: "3d-designing",
    section: "student-projects",
    slot: "project-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 1",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #1.",
    tag: "Project",
    order: 1,
  },
  {
    // UPLOAD HERE (3D Design & Printing — student-projects): screenshot/photo of student project #2
    programSlug: "3d-designing",
    section: "student-projects",
    slot: "project-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 2",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #2.",
    tag: "Project",
    order: 2,
  },
  {
    // UPLOAD HERE (3D Design & Printing — student-projects): screenshot/photo of student project #3
    programSlug: "3d-designing",
    section: "student-projects",
    slot: "project-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 3",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #3.",
    tag: "Project",
    order: 3,
  },
  {
    // UPLOAD HERE (3D Design & Printing — student-projects): clip of a student presenting/demoing their project
    programSlug: "3d-designing",
    section: "student-projects",
    slot: "project-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Presentation Demo",
    caption: "Student walkthrough of their final project",
    description: "Write a short description of this video here — e.g. clip of a student presenting/demoing their project.",
    tag: "Showcase",
    order: 4,
  },

  // ==========================================================================
  // PROGRAM: Arduino Development   (slug: "arduino")
  // ==========================================================================

  // ---- "Program in Action" (section: "program-in-action") — 6 images + 1 video ----
  {
    // UPLOAD HERE (Arduino Development — program-in-action): MAIN video clip of students actively engaged in this program
    programSlug: "arduino",
    section: "program-in-action",
    slot: "hero-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Classroom Experience",
    caption: "Watch our students in action",
    description: "Write a short description of this video here — e.g. MAIN video clip of students actively engaged in this program.",
    tag: "Showcase",
    order: 1,
  },
  {
    // UPLOAD HERE (Arduino Development — program-in-action): photo of students practicing a core skill
    programSlug: "arduino",
    section: "program-in-action",
    slot: "image-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Skill Practice",
    caption: "Building core skills",
    description: "Write a short description of this image here — e.g. photo of students practicing a core skill.",
    tag: "Session",
    order: 2,
  },
  {
    // UPLOAD HERE (Arduino Development — program-in-action): photo of an instructor-led demonstration
    programSlug: "arduino",
    section: "program-in-action",
    slot: "image-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Instructor Demonstration",
    caption: "Guided learning sessions",
    description: "Write a short description of this image here — e.g. photo of an instructor-led demonstration.",
    tag: "Session",
    order: 3,
  },
  {
    // UPLOAD HERE (Arduino Development — program-in-action): photo of a group/team activity
    programSlug: "arduino",
    section: "program-in-action",
    slot: "image-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Group Activity",
    caption: "Collaboration & teamwork",
    description: "Write a short description of this image here — e.g. photo of a group/team activity.",
    tag: "Session",
    order: 4,
  },
  {
    // UPLOAD HERE (Arduino Development — program-in-action): photo of students using program-specific tools/equipment
    programSlug: "arduino",
    section: "program-in-action",
    slot: "image-4",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Hands-On Session",
    caption: "Working with real tools",
    description: "Write a short description of this image here — e.g. photo of students using program-specific tools/equipment.",
    tag: "Session",
    order: 5,
  },
  {
    // UPLOAD HERE (Arduino Development — program-in-action): photo showcasing a student project
    programSlug: "arduino",
    section: "program-in-action",
    slot: "image-5",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Project Showcase",
    caption: "Creative student projects",
    description: "Write a short description of this image here — e.g. photo showcasing a student project.",
    tag: "Project",
    order: 6,
  },
  {
    // UPLOAD HERE (Arduino Development — program-in-action): photo of a graduation/certificate/milestone moment
    programSlug: "arduino",
    section: "program-in-action",
    slot: "image-6",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Milestone Moment",
    caption: "Celebrating achievements",
    description: "Write a short description of this image here — e.g. photo of a graduation/certificate/milestone moment.",
    tag: "Session",
    order: 7,
  },

  // ---- "Skills in Action / Student Projects" (section: "student-projects") — 3 images + 1 video ----
  {
    // UPLOAD HERE (Arduino Development — student-projects): screenshot/photo of student project #1
    programSlug: "arduino",
    section: "student-projects",
    slot: "project-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 1",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #1.",
    tag: "Project",
    order: 1,
  },
  {
    // UPLOAD HERE (Arduino Development — student-projects): screenshot/photo of student project #2
    programSlug: "arduino",
    section: "student-projects",
    slot: "project-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 2",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #2.",
    tag: "Project",
    order: 2,
  },
  {
    // UPLOAD HERE (Arduino Development — student-projects): screenshot/photo of student project #3
    programSlug: "arduino",
    section: "student-projects",
    slot: "project-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 3",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #3.",
    tag: "Project",
    order: 3,
  },
  {
    // UPLOAD HERE (Arduino Development — student-projects): clip of a student presenting/demoing their project
    programSlug: "arduino",
    section: "student-projects",
    slot: "project-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Presentation Demo",
    caption: "Student walkthrough of their final project",
    description: "Write a short description of this video here — e.g. clip of a student presenting/demoing their project.",
    tag: "Showcase",
    order: 4,
  },

  // ==========================================================================
  // PROGRAM: Drone Technology   (slug: "drone-technology")
  // ==========================================================================

  // ---- "Program in Action" (section: "program-in-action") — 6 images + 1 video ----
  {
    // UPLOAD HERE (Drone Technology — program-in-action): MAIN video clip of students actively engaged in this program
    programSlug: "drone-technology",
    section: "program-in-action",
    slot: "hero-video",
    type: "video",
    src: droneProgramActionVideo,
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Classroom Experience",
    caption: "Watch our students in action",
    description: "students unfolding the E88 foldable drones and learning how to control them , our students are tech enthuisist and every opportunity drives them closer to their goals",
    tag: "Showcase",
    order: 1,
  },
  {
    // UPLOAD HERE (Drone Technology — program-in-action): photo of students practicing a core skill
    programSlug: "drone-technology",
    section: "program-in-action",
    slot: "image-1",
    type: "image",
    src: dropi1,
    title: "Skill Practice",
    caption: "Building core skills",
    description: "Students learning to handle and control drone equipment with focus and precision.",
    tag: "Session",
    order: 2,
  },
  {
    // UPLOAD HERE (Drone Technology — program-in-action): photo of an instructor-led demonstration
    programSlug: "drone-technology",
    section: "program-in-action",
    slot: "image-2",
    type: "image",
    src: dropi2,
    title: "Instructor Demonstration",
    caption: "Guided learning sessions",
    description: "Hands-on demonstrations help students understand drone controls and safe flight practices.",
    tag: "Session",
    order: 3,
  },
  {
    // UPLOAD HERE (Drone Technology — program-in-action): photo of a group/team activity
    programSlug: "drone-technology",
    section: "program-in-action",
    slot: "image-3",
    type: "image",
    src: dropi3,
    title: "Group Activity",
    caption: "Collaboration & teamwork",
    description: "Students work together to explore drone functions, teamwork, and problem-solving.",
    tag: "Session",
    order: 4,
  },
  {
    // UPLOAD HERE (Drone Technology — program-in-action): photo of students using program-specific tools/equipment
    programSlug: "drone-technology",
    section: "program-in-action",
    slot: "image-4",
    type: "image",
    src: dropi4,
    title: "Hands-On Session",
    caption: "Working with real tools",
    description: "Students engage directly with drone equipment, learning through practical, real-world experience.",
    tag: "Session",
    order: 5,
  },
  {
    // UPLOAD HERE (Drone Technology — program-in-action): photo showcasing a student project
    programSlug: "drone-technology",
    section: "program-in-action",
    slot: "image-5",
    type: "image",
    src: dropi5,
    title: "Project Showcase",
    caption: "Creative student projects",
    description: "Students showcase curiosity, creativity, and confidence as they explore drone technology.",
    tag: "Project",
    order: 6,
  },
  {
    // UPLOAD HERE (Drone Technology — program-in-action): photo of a graduation/certificate/milestone moment
    programSlug: "drone-technology",
    section: "program-in-action",
    slot: "image-6",
    type: "image",
    src: dropi6,
    title: "Milestone Moment",
    caption: "Celebrating achievements",
    description: "A proud moment as students build skills that move them closer to their future goals.",
    tag: "Session",
    order: 7,
  },

  // ---- "Skills in Action / Student Projects" (section: "student-projects") — 3 images + 1 video ----
  {
    // UPLOAD HERE (Drone Technology — student-projects): screenshot/photo of student project #1
    programSlug: "drone-technology",
    section: "student-projects",
    slot: "project-1",
    type: "image",
    src: dropi1,
    title: "Student Project 1",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #1.",
    tag: "Project",
    order: 1,
  },
  {
    // UPLOAD HERE (Drone Technology — student-projects): screenshot/photo of student project #2
    programSlug: "drone-technology",
    section: "student-projects",
    slot: "project-2",
    type: "image",
    src: dropi2,
    title: "Student Project 2",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #2.",
    tag: "Project",
    order: 2,
  },
  {
    // UPLOAD HERE (Drone Technology — student-projects): screenshot/photo of student project #3
    programSlug: "drone-technology",
    section: "student-projects",
    slot: "project-3",
    type: "image",
    src: dropi3,
    title: "Student Project 3",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #3.",
    tag: "Project",
    order: 3,
  },
  {
    // UPLOAD HERE (Drone Technology — student-projects): clip of a student presenting/demoing their project
    programSlug: "drone-technology",
    section: "student-projects",
    slot: "project-video",
    type: "video",
    src: droneProjectVideo,
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Presentation Demo",
    caption: "Student walkthrough of their final project",
    description: "Students are drone engineers tasked with delivering a small package from a “Starting Point” to a “Delivery Zone” marked on the classroom floor. To complete the mission, the drone must visit at least 2 checkpoints. Teams must calculate the best route using mathematical tools and measure actual flight performance.",
    tag: "Showcase",
    order: 4,
  },

  // ==========================================================================
  // PROGRAM: Electrical & Electronics   (slug: "electronics")
  // ==========================================================================

  // ---- "Program in Action" (section: "program-in-action") — 6 images + 1 video ----
  {
    // UPLOAD HERE (Electrical & Electronics — program-in-action): MAIN video clip of students actively engaged in this program
    programSlug: "electronics",
    section: "program-in-action",
    slot: "hero-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Classroom Experience",
    caption: "Watch our students in action",
    description: "Write a short description of this video here — e.g. MAIN video clip of students actively engaged in this program.",
    tag: "Showcase",
    order: 1,
  },
  {
    // UPLOAD HERE (Electrical & Electronics — program-in-action): photo of students practicing a core skill
    programSlug: "electronics",
    section: "program-in-action",
    slot: "image-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Skill Practice",
    caption: "Building core skills",
    description: "Write a short description of this image here — e.g. photo of students practicing a core skill.",
    tag: "Session",
    order: 2,
  },
  {
    // UPLOAD HERE (Electrical & Electronics — program-in-action): photo of an instructor-led demonstration
    programSlug: "electronics",
    section: "program-in-action",
    slot: "image-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Instructor Demonstration",
    caption: "Guided learning sessions",
    description: "Write a short description of this image here — e.g. photo of an instructor-led demonstration.",
    tag: "Session",
    order: 3,
  },
  {
    // UPLOAD HERE (Electrical & Electronics — program-in-action): photo of a group/team activity
    programSlug: "electronics",
    section: "program-in-action",
    slot: "image-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Group Activity",
    caption: "Collaboration & teamwork",
    description: "Write a short description of this image here — e.g. photo of a group/team activity.",
    tag: "Session",
    order: 4,
  },
  {
    // UPLOAD HERE (Electrical & Electronics — program-in-action): photo of students using program-specific tools/equipment
    programSlug: "electronics",
    section: "program-in-action",
    slot: "image-4",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Hands-On Session",
    caption: "Working with real tools",
    description: "Write a short description of this image here — e.g. photo of students using program-specific tools/equipment.",
    tag: "Session",
    order: 5,
  },
  {
    // UPLOAD HERE (Electrical & Electronics — program-in-action): photo showcasing a student project
    programSlug: "electronics",
    section: "program-in-action",
    slot: "image-5",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Project Showcase",
    caption: "Creative student projects",
    description: "Write a short description of this image here — e.g. photo showcasing a student project.",
    tag: "Project",
    order: 6,
  },
  {
    // UPLOAD HERE (Electrical & Electronics — program-in-action): photo of a graduation/certificate/milestone moment
    programSlug: "electronics",
    section: "program-in-action",
    slot: "image-6",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Milestone Moment",
    caption: "Celebrating achievements",
    description: "Write a short description of this image here — e.g. photo of a graduation/certificate/milestone moment.",
    tag: "Session",
    order: 7,
  },

  // ---- "Skills in Action / Student Projects" (section: "student-projects") — 3 images + 1 video ----
  {
    // UPLOAD HERE (Electrical & Electronics — student-projects): screenshot/photo of student project #1
    programSlug: "electronics",
    section: "student-projects",
    slot: "project-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 1",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #1.",
    tag: "Project",
    order: 1,
  },
  {
    // UPLOAD HERE (Electrical & Electronics — student-projects): screenshot/photo of student project #2
    programSlug: "electronics",
    section: "student-projects",
    slot: "project-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 2",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #2.",
    tag: "Project",
    order: 2,
  },
  {
    // UPLOAD HERE (Electrical & Electronics — student-projects): screenshot/photo of student project #3
    programSlug: "electronics",
    section: "student-projects",
    slot: "project-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 3",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #3.",
    tag: "Project",
    order: 3,
  },
  {
    // UPLOAD HERE (Electrical & Electronics — student-projects): clip of a student presenting/demoing their project
    programSlug: "electronics",
    section: "student-projects",
    slot: "project-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Presentation Demo",
    caption: "Student walkthrough of their final project",
    description: "Write a short description of this video here — e.g. clip of a student presenting/demoing their project.",
    tag: "Showcase",
    order: 4,
  },

  // ==========================================================================
  // PROGRAM: Web Development   (slug: "web-development")
  // ==========================================================================

  // ---- "Program in Action" (section: "program-in-action") — 6 images + 1 video ----
  {
    // UPLOAD HERE (Web Development — program-in-action): MAIN video clip of students actively engaged in this program
    programSlug: "web-development",
    section: "program-in-action",
    slot: "hero-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Classroom Experience",
    caption: "Watch our students in action",
    description: "Write a short description of this video here — e.g. MAIN video clip of students actively engaged in this program.",
    tag: "Showcase",
    order: 1,
  },
  {
    // UPLOAD HERE (Web Development — program-in-action): photo of students practicing a core skill
    programSlug: "web-development",
    section: "program-in-action",
    slot: "image-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Skill Practice",
    caption: "Building core skills",
    description: "Write a short description of this image here — e.g. photo of students practicing a core skill.",
    tag: "Session",
    order: 2,
  },
  {
    // UPLOAD HERE (Web Development — program-in-action): photo of an instructor-led demonstration
    programSlug: "web-development",
    section: "program-in-action",
    slot: "image-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Instructor Demonstration",
    caption: "Guided learning sessions",
    description: "Write a short description of this image here — e.g. photo of an instructor-led demonstration.",
    tag: "Session",
    order: 3,
  },
  {
    // UPLOAD HERE (Web Development — program-in-action): photo of a group/team activity
    programSlug: "web-development",
    section: "program-in-action",
    slot: "image-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Group Activity",
    caption: "Collaboration & teamwork",
    description: "Write a short description of this image here — e.g. photo of a group/team activity.",
    tag: "Session",
    order: 4,
  },
  {
    // UPLOAD HERE (Web Development — program-in-action): photo of students using program-specific tools/equipment
    programSlug: "web-development",
    section: "program-in-action",
    slot: "image-4",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Hands-On Session",
    caption: "Working with real tools",
    description: "Write a short description of this image here — e.g. photo of students using program-specific tools/equipment.",
    tag: "Session",
    order: 5,
  },
  {
    // UPLOAD HERE (Web Development — program-in-action): photo showcasing a student project
    programSlug: "web-development",
    section: "program-in-action",
    slot: "image-5",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Project Showcase",
    caption: "Creative student projects",
    description: "Write a short description of this image here — e.g. photo showcasing a student project.",
    tag: "Project",
    order: 6,
  },
  {
    // UPLOAD HERE (Web Development — program-in-action): photo of a graduation/certificate/milestone moment
    programSlug: "web-development",
    section: "program-in-action",
    slot: "image-6",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Milestone Moment",
    caption: "Celebrating achievements",
    description: "Write a short description of this image here — e.g. photo of a graduation/certificate/milestone moment.",
    tag: "Session",
    order: 7,
  },

  // ---- "Skills in Action / Student Projects" (section: "student-projects") — 3 images + 1 video ----
  {
    // UPLOAD HERE (Web Development — student-projects): screenshot/photo of student project #1
    programSlug: "web-development",
    section: "student-projects",
    slot: "project-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 1",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #1.",
    tag: "Project",
    order: 1,
  },
  {
    // UPLOAD HERE (Web Development — student-projects): screenshot/photo of student project #2
    programSlug: "web-development",
    section: "student-projects",
    slot: "project-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 2",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #2.",
    tag: "Project",
    order: 2,
  },
  {
    // UPLOAD HERE (Web Development — student-projects): screenshot/photo of student project #3
    programSlug: "web-development",
    section: "student-projects",
    slot: "project-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 3",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #3.",
    tag: "Project",
    order: 3,
  },
  {
    // UPLOAD HERE (Web Development — student-projects): clip of a student presenting/demoing their project
    programSlug: "web-development",
    section: "student-projects",
    slot: "project-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Presentation Demo",
    caption: "Student walkthrough of their final project",
    description: "Write a short description of this video here — e.g. clip of a student presenting/demoing their project.",
    tag: "Showcase",
    order: 4,
  },

  // ==========================================================================
  // PROGRAM: Scratch Programming   (slug: "scratch")
  // ==========================================================================

  // ---- "Program in Action" (section: "program-in-action") — 6 images + 1 video ----
  {
    // UPLOAD HERE (Scratch Programming — program-in-action): MAIN video clip of students actively engaged in this program
    programSlug: "scratch",
    section: "program-in-action",
    slot: "hero-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Classroom Experience",
    caption: "Watch our students in action",
    description: "Write a short description of this video here — e.g. MAIN video clip of students actively engaged in this program.",
    tag: "Showcase",
    order: 1,
  },
  {
    // UPLOAD HERE (Scratch Programming — program-in-action): photo of students practicing a core skill
    programSlug: "scratch",
    section: "program-in-action",
    slot: "image-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Skill Practice",
    caption: "Building core skills",
    description: "Write a short description of this image here — e.g. photo of students practicing a core skill.",
    tag: "Session",
    order: 2,
  },
  {
    // UPLOAD HERE (Scratch Programming — program-in-action): photo of an instructor-led demonstration
    programSlug: "scratch",
    section: "program-in-action",
    slot: "image-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Instructor Demonstration",
    caption: "Guided learning sessions",
    description: "Write a short description of this image here — e.g. photo of an instructor-led demonstration.",
    tag: "Session",
    order: 3,
  },
  {
    // UPLOAD HERE (Scratch Programming — program-in-action): photo of a group/team activity
    programSlug: "scratch",
    section: "program-in-action",
    slot: "image-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Group Activity",
    caption: "Collaboration & teamwork",
    description: "Write a short description of this image here — e.g. photo of a group/team activity.",
    tag: "Session",
    order: 4,
  },
  {
    // UPLOAD HERE (Scratch Programming — program-in-action): photo of students using program-specific tools/equipment
    programSlug: "scratch",
    section: "program-in-action",
    slot: "image-4",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Hands-On Session",
    caption: "Working with real tools",
    description: "Write a short description of this image here — e.g. photo of students using program-specific tools/equipment.",
    tag: "Session",
    order: 5,
  },
  {
    // UPLOAD HERE (Scratch Programming — program-in-action): photo showcasing a student project
    programSlug: "scratch",
    section: "program-in-action",
    slot: "image-5",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Project Showcase",
    caption: "Creative student projects",
    description: "Write a short description of this image here — e.g. photo showcasing a student project.",
    tag: "Project",
    order: 6,
  },
  {
    // UPLOAD HERE (Scratch Programming — program-in-action): photo of a graduation/certificate/milestone moment
    programSlug: "scratch",
    section: "program-in-action",
    slot: "image-6",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Milestone Moment",
    caption: "Celebrating achievements",
    description: "Write a short description of this image here — e.g. photo of a graduation/certificate/milestone moment.",
    tag: "Session",
    order: 7,
  },

  // ---- "Skills in Action / Student Projects" (section: "student-projects") — 3 images + 1 video ----
  {
    // UPLOAD HERE (Scratch Programming — student-projects): screenshot/photo of student project #1
    programSlug: "scratch",
    section: "student-projects",
    slot: "project-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 1",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #1.",
    tag: "Project",
    order: 1,
  },
  {
    // UPLOAD HERE (Scratch Programming — student-projects): screenshot/photo of student project #2
    programSlug: "scratch",
    section: "student-projects",
    slot: "project-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 2",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #2.",
    tag: "Project",
    order: 2,
  },
  {
    // UPLOAD HERE (Scratch Programming — student-projects): screenshot/photo of student project #3
    programSlug: "scratch",
    section: "student-projects",
    slot: "project-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 3",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #3.",
    tag: "Project",
    order: 3,
  },
  {
    // UPLOAD HERE (Scratch Programming — student-projects): clip of a student presenting/demoing their project
    programSlug: "scratch",
    section: "student-projects",
    slot: "project-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Presentation Demo",
    caption: "Student walkthrough of their final project",
    description: "Write a short description of this video here — e.g. clip of a student presenting/demoing their project.",
    tag: "Showcase",
    order: 4,
  },

  // ==========================================================================
  // PROGRAM: Space Science   (slug: "space-science")
  // ==========================================================================

  // ---- "Program in Action" (section: "program-in-action") — 6 images + 1 video ----
  {
    // UPLOAD HERE (Space Science — program-in-action): MAIN video clip of students actively engaged in this program
    programSlug: "space-science",
    section: "program-in-action",
    slot: "hero-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Classroom Experience",
    caption: "Watch our students in action",
    description: "Write a short description of this video here — e.g. MAIN video clip of students actively engaged in this program.",
    tag: "Showcase",
    order: 1,
  },
  {
    // UPLOAD HERE (Space Science — program-in-action): photo of students practicing a core skill
    programSlug: "space-science",
    section: "program-in-action",
    slot: "image-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Skill Practice",
    caption: "Building core skills",
    description: "Write a short description of this image here — e.g. photo of students practicing a core skill.",
    tag: "Session",
    order: 2,
  },
  {
    // UPLOAD HERE (Space Science — program-in-action): photo of an instructor-led demonstration
    programSlug: "space-science",
    section: "program-in-action",
    slot: "image-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Instructor Demonstration",
    caption: "Guided learning sessions",
    description: "Write a short description of this image here — e.g. photo of an instructor-led demonstration.",
    tag: "Session",
    order: 3,
  },
  {
    // UPLOAD HERE (Space Science — program-in-action): photo of a group/team activity
    programSlug: "space-science",
    section: "program-in-action",
    slot: "image-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Group Activity",
    caption: "Collaboration & teamwork",
    description: "Write a short description of this image here — e.g. photo of a group/team activity.",
    tag: "Session",
    order: 4,
  },
  {
    // UPLOAD HERE (Space Science — program-in-action): photo of students using program-specific tools/equipment
    programSlug: "space-science",
    section: "program-in-action",
    slot: "image-4",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Hands-On Session",
    caption: "Working with real tools",
    description: "Write a short description of this image here — e.g. photo of students using program-specific tools/equipment.",
    tag: "Session",
    order: 5,
  },
  {
    // UPLOAD HERE (Space Science — program-in-action): photo showcasing a student project
    programSlug: "space-science",
    section: "program-in-action",
    slot: "image-5",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Project Showcase",
    caption: "Creative student projects",
    description: "Write a short description of this image here — e.g. photo showcasing a student project.",
    tag: "Project",
    order: 6,
  },
  {
    // UPLOAD HERE (Space Science — program-in-action): photo of a graduation/certificate/milestone moment
    programSlug: "space-science",
    section: "program-in-action",
    slot: "image-6",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Milestone Moment",
    caption: "Celebrating achievements",
    description: "Write a short description of this image here — e.g. photo of a graduation/certificate/milestone moment.",
    tag: "Session",
    order: 7,
  },

  // ---- "Skills in Action / Student Projects" (section: "student-projects") — 3 images + 1 video ----
  {
    // UPLOAD HERE (Space Science — student-projects): screenshot/photo of student project #1
    programSlug: "space-science",
    section: "student-projects",
    slot: "project-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 1",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #1.",
    tag: "Project",
    order: 1,
  },
  {
    // UPLOAD HERE (Space Science — student-projects): screenshot/photo of student project #2
    programSlug: "space-science",
    section: "student-projects",
    slot: "project-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 2",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #2.",
    tag: "Project",
    order: 2,
  },
  {
    // UPLOAD HERE (Space Science — student-projects): screenshot/photo of student project #3
    programSlug: "space-science",
    section: "student-projects",
    slot: "project-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 3",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #3.",
    tag: "Project",
    order: 3,
  },
  {
    // UPLOAD HERE (Space Science — student-projects): clip of a student presenting/demoing their project
    programSlug: "space-science",
    section: "student-projects",
    slot: "project-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Presentation Demo",
    caption: "Student walkthrough of their final project",
    description: "Write a short description of this video here — e.g. clip of a student presenting/demoing their project.",
    tag: "Showcase",
    order: 4,
  },

  // ==========================================================================
  // PROGRAM: Science Experiments   (slug: "science-experiments")
  // ==========================================================================

  // ---- "Program in Action" (section: "program-in-action") — 6 images + 1 video ----
  {
    // UPLOAD HERE (Science Experiments — program-in-action): MAIN video clip of students actively engaged in this program
    programSlug: "science-experiments",
    section: "program-in-action",
    slot: "hero-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Classroom Experience",
    caption: "Watch our students in action",
    description: "Write a short description of this video here — e.g. MAIN video clip of students actively engaged in this program.",
    tag: "Showcase",
    order: 1,
  },
  {
    // UPLOAD HERE (Science Experiments — program-in-action): photo of students practicing a core skill
    programSlug: "science-experiments",
    section: "program-in-action",
    slot: "image-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Skill Practice",
    caption: "Building core skills",
    description: "Write a short description of this image here — e.g. photo of students practicing a core skill.",
    tag: "Session",
    order: 2,
  },
  {
    // UPLOAD HERE (Science Experiments — program-in-action): photo of an instructor-led demonstration
    programSlug: "science-experiments",
    section: "program-in-action",
    slot: "image-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Instructor Demonstration",
    caption: "Guided learning sessions",
    description: "Write a short description of this image here — e.g. photo of an instructor-led demonstration.",
    tag: "Session",
    order: 3,
  },
  {
    // UPLOAD HERE (Science Experiments — program-in-action): photo of a group/team activity
    programSlug: "science-experiments",
    section: "program-in-action",
    slot: "image-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Group Activity",
    caption: "Collaboration & teamwork",
    description: "Write a short description of this image here — e.g. photo of a group/team activity.",
    tag: "Session",
    order: 4,
  },
  {
    // UPLOAD HERE (Science Experiments — program-in-action): photo of students using program-specific tools/equipment
    programSlug: "science-experiments",
    section: "program-in-action",
    slot: "image-4",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Hands-On Session",
    caption: "Working with real tools",
    description: "Write a short description of this image here — e.g. photo of students using program-specific tools/equipment.",
    tag: "Session",
    order: 5,
  },
  {
    // UPLOAD HERE (Science Experiments — program-in-action): photo showcasing a student project
    programSlug: "science-experiments",
    section: "program-in-action",
    slot: "image-5",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Project Showcase",
    caption: "Creative student projects",
    description: "Write a short description of this image here — e.g. photo showcasing a student project.",
    tag: "Project",
    order: 6,
  },
  {
    // UPLOAD HERE (Science Experiments — program-in-action): photo of a graduation/certificate/milestone moment
    programSlug: "science-experiments",
    section: "program-in-action",
    slot: "image-6",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Milestone Moment",
    caption: "Celebrating achievements",
    description: "Write a short description of this image here — e.g. photo of a graduation/certificate/milestone moment.",
    tag: "Session",
    order: 7,
  },

  // ---- "Skills in Action / Student Projects" (section: "student-projects") — 3 images + 1 video ----
  {
    // UPLOAD HERE (Science Experiments — student-projects): screenshot/photo of student project #1
    programSlug: "science-experiments",
    section: "student-projects",
    slot: "project-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 1",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #1.",
    tag: "Project",
    order: 1,
  },
  {
    // UPLOAD HERE (Science Experiments — student-projects): screenshot/photo of student project #2
    programSlug: "science-experiments",
    section: "student-projects",
    slot: "project-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 2",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #2.",
    tag: "Project",
    order: 2,
  },
  {
    // UPLOAD HERE (Science Experiments — student-projects): screenshot/photo of student project #3
    programSlug: "science-experiments",
    section: "student-projects",
    slot: "project-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 3",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #3.",
    tag: "Project",
    order: 3,
  },
  {
    // UPLOAD HERE (Science Experiments — student-projects): clip of a student presenting/demoing their project
    programSlug: "science-experiments",
    section: "student-projects",
    slot: "project-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Presentation Demo",
    caption: "Student walkthrough of their final project",
    description: "Write a short description of this video here — e.g. clip of a student presenting/demoing their project.",
    tag: "Showcase",
    order: 4,
  },

  // ==========================================================================
  // PROGRAM: Robotics   (slug: "robotics")
  // ==========================================================================

  // ---- "Program in Action" (section: "program-in-action") — 6 images + 1 video ----
  {
    // UPLOAD HERE (Robotics — program-in-action): MAIN video clip of students actively engaged in this program
    programSlug: "robotics",
    section: "program-in-action",
    slot: "hero-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Classroom Experience",
    caption: "Watch our students in action",
    description: "Write a short description of this video here — e.g. MAIN video clip of students actively engaged in this program.",
    tag: "Showcase",
    order: 1,
  },
  {
    // UPLOAD HERE (Robotics — program-in-action): photo of students practicing a core skill
    programSlug: "robotics",
    section: "program-in-action",
    slot: "image-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Skill Practice",
    caption: "Building core skills",
    description: "Write a short description of this image here — e.g. photo of students practicing a core skill.",
    tag: "Session",
    order: 2,
  },
  {
    // UPLOAD HERE (Robotics — program-in-action): photo of an instructor-led demonstration
    programSlug: "robotics",
    section: "program-in-action",
    slot: "image-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Instructor Demonstration",
    caption: "Guided learning sessions",
    description: "Write a short description of this image here — e.g. photo of an instructor-led demonstration.",
    tag: "Session",
    order: 3,
  },
  {
    // UPLOAD HERE (Robotics — program-in-action): photo of a group/team activity
    programSlug: "robotics",
    section: "program-in-action",
    slot: "image-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Group Activity",
    caption: "Collaboration & teamwork",
    description: "Write a short description of this image here — e.g. photo of a group/team activity.",
    tag: "Session",
    order: 4,
  },
  {
    // UPLOAD HERE (Robotics — program-in-action): photo of students using program-specific tools/equipment
    programSlug: "robotics",
    section: "program-in-action",
    slot: "image-4",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Hands-On Session",
    caption: "Working with real tools",
    description: "Write a short description of this image here — e.g. photo of students using program-specific tools/equipment.",
    tag: "Session",
    order: 5,
  },
  {
    // UPLOAD HERE (Robotics — program-in-action): photo showcasing a student project
    programSlug: "robotics",
    section: "program-in-action",
    slot: "image-5",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Project Showcase",
    caption: "Creative student projects",
    description: "Write a short description of this image here — e.g. photo showcasing a student project.",
    tag: "Project",
    order: 6,
  },
  {
    // UPLOAD HERE (Robotics — program-in-action): photo of a graduation/certificate/milestone moment
    programSlug: "robotics",
    section: "program-in-action",
    slot: "image-6",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Milestone Moment",
    caption: "Celebrating achievements",
    description: "Write a short description of this image here — e.g. photo of a graduation/certificate/milestone moment.",
    tag: "Session",
    order: 7,
  },

  // ---- "Skills in Action / Student Projects" (section: "student-projects") — 3 images + 1 video ----
  {
    // UPLOAD HERE (Robotics — student-projects): screenshot/photo of student project #1
    programSlug: "robotics",
    section: "student-projects",
    slot: "project-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 1",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #1.",
    tag: "Project",
    order: 1,
  },
  {
    // UPLOAD HERE (Robotics — student-projects): screenshot/photo of student project #2
    programSlug: "robotics",
    section: "student-projects",
    slot: "project-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 2",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #2.",
    tag: "Project",
    order: 2,
  },
  {
    // UPLOAD HERE (Robotics — student-projects): screenshot/photo of student project #3
    programSlug: "robotics",
    section: "student-projects",
    slot: "project-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 3",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #3.",
    tag: "Project",
    order: 3,
  },
  {
    // UPLOAD HERE (Robotics — student-projects): clip of a student presenting/demoing their project
    programSlug: "robotics",
    section: "student-projects",
    slot: "project-video",
    type: "video",
    src: roboticsProjectVideo,
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Presentation Demo",
    caption: "Student walkthrough of their final project",
    description: "This group of students, aged 14 and 16, showcased their robotics project tackling waste management. The judges, including some from MMUST iHub, did an amazing job judging their work and asking thoughtful questions.",
    tag: "Showcase",
    order: 4,
  },

  // ==========================================================================
  // PROGRAM: Data Science   (slug: "data-science")
  // ==========================================================================

  // ---- "Program in Action" (section: "program-in-action") — 6 images + 1 video ----
  {
    // UPLOAD HERE (Data Science — program-in-action): MAIN video clip of students actively engaged in this program
    programSlug: "data-science",
    section: "program-in-action",
    slot: "hero-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Classroom Experience",
    caption: "Watch our students in action",
    description: "Write a short description of this video here — e.g. MAIN video clip of students actively engaged in this program.",
    tag: "Showcase",
    order: 1,
  },
  {
    // UPLOAD HERE (Data Science — program-in-action): photo of students practicing a core skill
    programSlug: "data-science",
    section: "program-in-action",
    slot: "image-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Skill Practice",
    caption: "Building core skills",
    description: "Write a short description of this image here — e.g. photo of students practicing a core skill.",
    tag: "Session",
    order: 2,
  },
  {
    // UPLOAD HERE (Data Science — program-in-action): photo of an instructor-led demonstration
    programSlug: "data-science",
    section: "program-in-action",
    slot: "image-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Instructor Demonstration",
    caption: "Guided learning sessions",
    description: "Write a short description of this image here — e.g. photo of an instructor-led demonstration.",
    tag: "Session",
    order: 3,
  },
  {
    // UPLOAD HERE (Data Science — program-in-action): photo of a group/team activity
    programSlug: "data-science",
    section: "program-in-action",
    slot: "image-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Group Activity",
    caption: "Collaboration & teamwork",
    description: "Write a short description of this image here — e.g. photo of a group/team activity.",
    tag: "Session",
    order: 4,
  },
  {
    // UPLOAD HERE (Data Science — program-in-action): photo of students using program-specific tools/equipment
    programSlug: "data-science",
    section: "program-in-action",
    slot: "image-4",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Hands-On Session",
    caption: "Working with real tools",
    description: "Write a short description of this image here — e.g. photo of students using program-specific tools/equipment.",
    tag: "Session",
    order: 5,
  },
  {
    // UPLOAD HERE (Data Science — program-in-action): photo showcasing a student project
    programSlug: "data-science",
    section: "program-in-action",
    slot: "image-5",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Project Showcase",
    caption: "Creative student projects",
    description: "Write a short description of this image here — e.g. photo showcasing a student project.",
    tag: "Project",
    order: 6,
  },
  {
    // UPLOAD HERE (Data Science — program-in-action): photo of a graduation/certificate/milestone moment
    programSlug: "data-science",
    section: "program-in-action",
    slot: "image-6",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Milestone Moment",
    caption: "Celebrating achievements",
    description: "Write a short description of this image here — e.g. photo of a graduation/certificate/milestone moment.",
    tag: "Session",
    order: 7,
  },

  // ---- "Skills in Action / Student Projects" (section: "student-projects") — 3 images + 1 video ----
  {
    // UPLOAD HERE (Data Science — student-projects): screenshot/photo of student project #1
    programSlug: "data-science",
    section: "student-projects",
    slot: "project-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 1",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #1.",
    tag: "Project",
    order: 1,
  },
  {
    // UPLOAD HERE (Data Science — student-projects): screenshot/photo of student project #2
    programSlug: "data-science",
    section: "student-projects",
    slot: "project-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 2",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #2.",
    tag: "Project",
    order: 2,
  },
  {
    // UPLOAD HERE (Data Science — student-projects): screenshot/photo of student project #3
    programSlug: "data-science",
    section: "student-projects",
    slot: "project-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 3",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #3.",
    tag: "Project",
    order: 3,
  },
  {
    // UPLOAD HERE (Data Science — student-projects): clip of a student presenting/demoing their project
    programSlug: "data-science",
    section: "student-projects",
    slot: "project-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Presentation Demo",
    caption: "Student walkthrough of their final project",
    description: "Write a short description of this video here — e.g. clip of a student presenting/demoing their project.",
    tag: "Showcase",
    order: 4,
  },

  // ==========================================================================
  // PROGRAM: Mathematics   (slug: "mathematics")
  // ==========================================================================

  // ---- "Program in Action" (section: "program-in-action") — 6 images + 1 video ----
  {
    // UPLOAD HERE (Mathematics — program-in-action): MAIN video clip of students actively engaged in this program
    programSlug: "mathematics",
    section: "program-in-action",
    slot: "hero-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Classroom Experience",
    caption: "Watch our students in action",
    description: "Write a short description of this video here — e.g. MAIN video clip of students actively engaged in this program.",
    tag: "Showcase",
    order: 1,
  },
  {
    // UPLOAD HERE (Mathematics — program-in-action): photo of students practicing a core skill
    programSlug: "mathematics",
    section: "program-in-action",
    slot: "image-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Skill Practice",
    caption: "Building core skills",
    description: "Write a short description of this image here — e.g. photo of students practicing a core skill.",
    tag: "Session",
    order: 2,
  },
  {
    // UPLOAD HERE (Mathematics — program-in-action): photo of an instructor-led demonstration
    programSlug: "mathematics",
    section: "program-in-action",
    slot: "image-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Instructor Demonstration",
    caption: "Guided learning sessions",
    description: "Write a short description of this image here — e.g. photo of an instructor-led demonstration.",
    tag: "Session",
    order: 3,
  },
  {
    // UPLOAD HERE (Mathematics — program-in-action): photo of a group/team activity
    programSlug: "mathematics",
    section: "program-in-action",
    slot: "image-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Group Activity",
    caption: "Collaboration & teamwork",
    description: "Write a short description of this image here — e.g. photo of a group/team activity.",
    tag: "Session",
    order: 4,
  },
  {
    // UPLOAD HERE (Mathematics — program-in-action): photo of students using program-specific tools/equipment
    programSlug: "mathematics",
    section: "program-in-action",
    slot: "image-4",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Hands-On Session",
    caption: "Working with real tools",
    description: "Write a short description of this image here — e.g. photo of students using program-specific tools/equipment.",
    tag: "Session",
    order: 5,
  },
  {
    // UPLOAD HERE (Mathematics — program-in-action): photo showcasing a student project
    programSlug: "mathematics",
    section: "program-in-action",
    slot: "image-5",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Project Showcase",
    caption: "Creative student projects",
    description: "Write a short description of this image here — e.g. photo showcasing a student project.",
    tag: "Project",
    order: 6,
  },
  {
    // UPLOAD HERE (Mathematics — program-in-action): photo of a graduation/certificate/milestone moment
    programSlug: "mathematics",
    section: "program-in-action",
    slot: "image-6",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Milestone Moment",
    caption: "Celebrating achievements",
    description: "Write a short description of this image here — e.g. photo of a graduation/certificate/milestone moment.",
    tag: "Session",
    order: 7,
  },

  // ---- "Skills in Action / Student Projects" (section: "student-projects") — 3 images + 1 video ----
  {
    // UPLOAD HERE (Mathematics — student-projects): screenshot/photo of student project #1
    programSlug: "mathematics",
    section: "student-projects",
    slot: "project-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 1",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #1.",
    tag: "Project",
    order: 1,
  },
  {
    // UPLOAD HERE (Mathematics — student-projects): screenshot/photo of student project #2
    programSlug: "mathematics",
    section: "student-projects",
    slot: "project-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 2",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #2.",
    tag: "Project",
    order: 2,
  },
  {
    // UPLOAD HERE (Mathematics — student-projects): screenshot/photo of student project #3
    programSlug: "mathematics",
    section: "student-projects",
    slot: "project-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 3",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #3.",
    tag: "Project",
    order: 3,
  },
  {
    // UPLOAD HERE (Mathematics — student-projects): clip of a student presenting/demoing their project
    programSlug: "mathematics",
    section: "student-projects",
    slot: "project-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Presentation Demo",
    caption: "Student walkthrough of their final project",
    description: "Write a short description of this video here — e.g. clip of a student presenting/demoing their project.",
    tag: "Showcase",
    order: 4,
  },

  // ==========================================================================
  // PROGRAM: Teacher Training   (slug: "teacher-training")
  // ==========================================================================

  // ---- "Program in Action" (section: "program-in-action") — 6 images + 1 video ----
  {
    // UPLOAD HERE (Teacher Training — program-in-action): MAIN video clip of students actively engaged in this program
    programSlug: "teacher-training",
    section: "program-in-action",
    slot: "hero-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Classroom Experience",
    caption: "Watch our students in action",
    description: "Write a short description of this video here — e.g. MAIN video clip of students actively engaged in this program.",
    tag: "Showcase",
    order: 1,
  },
  {
    // UPLOAD HERE (Teacher Training — program-in-action): photo of students practicing a core skill
    programSlug: "teacher-training",
    section: "program-in-action",
    slot: "image-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Skill Practice",
    caption: "Building core skills",
    description: "Write a short description of this image here — e.g. photo of students practicing a core skill.",
    tag: "Session",
    order: 2,
  },
  {
    // UPLOAD HERE (Teacher Training — program-in-action): photo of an instructor-led demonstration
    programSlug: "teacher-training",
    section: "program-in-action",
    slot: "image-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Instructor Demonstration",
    caption: "Guided learning sessions",
    description: "Write a short description of this image here — e.g. photo of an instructor-led demonstration.",
    tag: "Session",
    order: 3,
  },
  {
    // UPLOAD HERE (Teacher Training — program-in-action): photo of a group/team activity
    programSlug: "teacher-training",
    section: "program-in-action",
    slot: "image-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Group Activity",
    caption: "Collaboration & teamwork",
    description: "Write a short description of this image here — e.g. photo of a group/team activity.",
    tag: "Session",
    order: 4,
  },
  {
    // UPLOAD HERE (Teacher Training — program-in-action): photo of students using program-specific tools/equipment
    programSlug: "teacher-training",
    section: "program-in-action",
    slot: "image-4",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Hands-On Session",
    caption: "Working with real tools",
    description: "Write a short description of this image here — e.g. photo of students using program-specific tools/equipment.",
    tag: "Session",
    order: 5,
  },
  {
    // UPLOAD HERE (Teacher Training — program-in-action): photo showcasing a student project
    programSlug: "teacher-training",
    section: "program-in-action",
    slot: "image-5",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Project Showcase",
    caption: "Creative student projects",
    description: "Write a short description of this image here — e.g. photo showcasing a student project.",
    tag: "Project",
    order: 6,
  },
  {
    // UPLOAD HERE (Teacher Training — program-in-action): photo of a graduation/certificate/milestone moment
    programSlug: "teacher-training",
    section: "program-in-action",
    slot: "image-6",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Milestone Moment",
    caption: "Celebrating achievements",
    description: "Write a short description of this image here — e.g. photo of a graduation/certificate/milestone moment.",
    tag: "Session",
    order: 7,
  },

  // ---- "Skills in Action / Student Projects" (section: "student-projects") — 3 images + 1 video ----
  {
    // UPLOAD HERE (Teacher Training — student-projects): screenshot/photo of student project #1
    programSlug: "teacher-training",
    section: "student-projects",
    slot: "project-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 1",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #1.",
    tag: "Project",
    order: 1,
  },
  {
    // UPLOAD HERE (Teacher Training — student-projects): screenshot/photo of student project #2
    programSlug: "teacher-training",
    section: "student-projects",
    slot: "project-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 2",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #2.",
    tag: "Project",
    order: 2,
  },
  {
    // UPLOAD HERE (Teacher Training — student-projects): screenshot/photo of student project #3
    programSlug: "teacher-training",
    section: "student-projects",
    slot: "project-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 3",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #3.",
    tag: "Project",
    order: 3,
  },
  {
    // UPLOAD HERE (Teacher Training — student-projects): clip of a student presenting/demoing their project
    programSlug: "teacher-training",
    section: "student-projects",
    slot: "project-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Presentation Demo",
    caption: "Student walkthrough of their final project",
    description: "Write a short description of this video here — e.g. clip of a student presenting/demoing their project.",
    tag: "Showcase",
    order: 4,
  },

  // ==========================================================================
  // PROGRAM: Artificial Intelligence   (slug: "ai")
  // ==========================================================================

  // ---- "Program in Action" (section: "program-in-action") — 6 images + 1 video ----
  {
    // UPLOAD HERE (Artificial Intelligence — program-in-action): MAIN video clip of students actively engaged in this program
    programSlug: "ai",
    section: "program-in-action",
    slot: "hero-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Classroom Experience",
    caption: "Watch our students in action",
    description: "Write a short description of this video here — e.g. MAIN video clip of students actively engaged in this program.",
    tag: "Showcase",
    order: 1,
  },
  {
    // UPLOAD HERE (Artificial Intelligence — program-in-action): photo of students practicing a core skill
    programSlug: "ai",
    section: "program-in-action",
    slot: "image-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Skill Practice",
    caption: "Building core skills",
    description: "Write a short description of this image here — e.g. photo of students practicing a core skill.",
    tag: "Session",
    order: 2,
  },
  {
    // UPLOAD HERE (Artificial Intelligence — program-in-action): photo of an instructor-led demonstration
    programSlug: "ai",
    section: "program-in-action",
    slot: "image-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Instructor Demonstration",
    caption: "Guided learning sessions",
    description: "Write a short description of this image here — e.g. photo of an instructor-led demonstration.",
    tag: "Session",
    order: 3,
  },
  {
    // UPLOAD HERE (Artificial Intelligence — program-in-action): photo of a group/team activity
    programSlug: "ai",
    section: "program-in-action",
    slot: "image-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Group Activity",
    caption: "Collaboration & teamwork",
    description: "Write a short description of this image here — e.g. photo of a group/team activity.",
    tag: "Session",
    order: 4,
  },
  {
    // UPLOAD HERE (Artificial Intelligence — program-in-action): photo of students using program-specific tools/equipment
    programSlug: "ai",
    section: "program-in-action",
    slot: "image-4",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Hands-On Session",
    caption: "Working with real tools",
    description: "Write a short description of this image here — e.g. photo of students using program-specific tools/equipment.",
    tag: "Session",
    order: 5,
  },
  {
    // UPLOAD HERE (Artificial Intelligence — program-in-action): photo showcasing a student project
    programSlug: "ai",
    section: "program-in-action",
    slot: "image-5",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Project Showcase",
    caption: "Creative student projects",
    description: "Write a short description of this image here — e.g. photo showcasing a student project.",
    tag: "Project",
    order: 6,
  },
  {
    // UPLOAD HERE (Artificial Intelligence — program-in-action): photo of a graduation/certificate/milestone moment
    programSlug: "ai",
    section: "program-in-action",
    slot: "image-6",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Milestone Moment",
    caption: "Celebrating achievements",
    description: "Write a short description of this image here — e.g. photo of a graduation/certificate/milestone moment.",
    tag: "Session",
    order: 7,
  },

  // ---- "Skills in Action / Student Projects" (section: "student-projects") — 3 images + 1 video ----
  {
    // UPLOAD HERE (Artificial Intelligence — student-projects): screenshot/photo of student project #1
    programSlug: "ai",
    section: "student-projects",
    slot: "project-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 1",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #1.",
    tag: "Project",
    order: 1,
  },
  {
    // UPLOAD HERE (Artificial Intelligence — student-projects): screenshot/photo of student project #2
    programSlug: "ai",
    section: "student-projects",
    slot: "project-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 2",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #2.",
    tag: "Project",
    order: 2,
  },
  {
    // UPLOAD HERE (Artificial Intelligence — student-projects): screenshot/photo of student project #3
    programSlug: "ai",
    section: "student-projects",
    slot: "project-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 3",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #3.",
    tag: "Project",
    order: 3,
  },
  {
    // UPLOAD HERE (Artificial Intelligence — student-projects): clip of a student presenting/demoing their project
    programSlug: "ai",
    section: "student-projects",
    slot: "project-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Presentation Demo",
    caption: "Student walkthrough of their final project",
    description: "Write a short description of this video here — e.g. clip of a student presenting/demoing their project.",
    tag: "Showcase",
    order: 4,
  },

  // ==========================================================================
  // PROGRAM: Python Programming   (slug: "python-programming")
  // ==========================================================================

  // ---- "Program in Action" (section: "program-in-action") — 6 images + 1 video ----
  {
    // UPLOAD HERE (Python Programming — program-in-action): MAIN video clip of students actively engaged in this program
    programSlug: "python-programming",
    section: "program-in-action",
    slot: "hero-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Classroom Experience",
    caption: "Watch our students in action",
    description: "Write a short description of this video here — e.g. MAIN video clip of students actively engaged in this program.",
    tag: "Showcase",
    order: 1,
  },
  {
    // UPLOAD HERE (Python Programming — program-in-action): photo of students practicing a core skill
    programSlug: "python-programming",
    section: "program-in-action",
    slot: "image-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Skill Practice",
    caption: "Building core skills",
    description: "Write a short description of this image here — e.g. photo of students practicing a core skill.",
    tag: "Session",
    order: 2,
  },
  {
    // UPLOAD HERE (Python Programming — program-in-action): photo of an instructor-led demonstration
    programSlug: "python-programming",
    section: "program-in-action",
    slot: "image-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Instructor Demonstration",
    caption: "Guided learning sessions",
    description: "Write a short description of this image here — e.g. photo of an instructor-led demonstration.",
    tag: "Session",
    order: 3,
  },
  {
    // UPLOAD HERE (Python Programming — program-in-action): photo of a group/team activity
    programSlug: "python-programming",
    section: "program-in-action",
    slot: "image-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Group Activity",
    caption: "Collaboration & teamwork",
    description: "Write a short description of this image here — e.g. photo of a group/team activity.",
    tag: "Session",
    order: 4,
  },
  {
    // UPLOAD HERE (Python Programming — program-in-action): photo of students using program-specific tools/equipment
    programSlug: "python-programming",
    section: "program-in-action",
    slot: "image-4",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Hands-On Session",
    caption: "Working with real tools",
    description: "Write a short description of this image here — e.g. photo of students using program-specific tools/equipment.",
    tag: "Session",
    order: 5,
  },
  {
    // UPLOAD HERE (Python Programming — program-in-action): photo showcasing a student project
    programSlug: "python-programming",
    section: "program-in-action",
    slot: "image-5",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Project Showcase",
    caption: "Creative student projects",
    description: "Write a short description of this image here — e.g. photo showcasing a student project.",
    tag: "Project",
    order: 6,
  },
  {
    // UPLOAD HERE (Python Programming — program-in-action): photo of a graduation/certificate/milestone moment
    programSlug: "python-programming",
    section: "program-in-action",
    slot: "image-6",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Milestone Moment",
    caption: "Celebrating achievements",
    description: "Write a short description of this image here — e.g. photo of a graduation/certificate/milestone moment.",
    tag: "Session",
    order: 7,
  },

  // ---- "Skills in Action / Student Projects" (section: "student-projects") — 3 images + 1 video ----
  {
    // UPLOAD HERE (Python Programming — student-projects): screenshot/photo of student project #1
    programSlug: "python-programming",
    section: "student-projects",
    slot: "project-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 1",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #1.",
    tag: "Project",
    order: 1,
  },
  {
    // UPLOAD HERE (Python Programming — student-projects): screenshot/photo of student project #2
    programSlug: "python-programming",
    section: "student-projects",
    slot: "project-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 2",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #2.",
    tag: "Project",
    order: 2,
  },
  {
    // UPLOAD HERE (Python Programming — student-projects): screenshot/photo of student project #3
    programSlug: "python-programming",
    section: "student-projects",
    slot: "project-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 3",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #3.",
    tag: "Project",
    order: 3,
  },
  {
    // UPLOAD HERE (Python Programming — student-projects): clip of a student presenting/demoing their project
    programSlug: "python-programming",
    section: "student-projects",
    slot: "project-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Presentation Demo",
    caption: "Student walkthrough of their final project",
    description: "Write a short description of this video here — e.g. clip of a student presenting/demoing their project.",
    tag: "Showcase",
    order: 4,
  },

  // ==========================================================================
  // PROGRAM: DIY   (slug: "diy")
  // ==========================================================================

  // ---- "Program in Action" (section: "program-in-action") — 6 images + 1 video ----
  {
    // UPLOAD HERE (DIY — program-in-action): MAIN video clip of students actively engaged in this program
    programSlug: "diy",
    section: "program-in-action",
    slot: "hero-video",
    type: "video",
    src: diyProgramActionVideo,
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Classroom Experience",
    caption: "Watch our students in action",
    description: "This is amazing! This boy is preparing his presentation for the upcoming STEM Expo/Challenge on December 10–11. Next year, he and his cohort will be introduced to 3D design using Tinkercad or SketchUp, where they will transition from 2D drawing to 3D modeling. Through these experiences, our goal is to nurture such talents from a young age, providing opportunities for students to discover and grow their interests and abilities.",
    tag: "Showcase",
    order: 1,
  },
  {
    // UPLOAD HERE (DIY — program-in-action): photo of students practicing a core skill
    programSlug: "diy",
    section: "program-in-action",
    slot: "image-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Skill Practice",
    caption: "Building core skills",
    description: "Write a short description of this image here — e.g. photo of students practicing a core skill.",
    tag: "Session",
    order: 2,
  },
  {
    // UPLOAD HERE (DIY — program-in-action): photo of an instructor-led demonstration
    programSlug: "diy",
    section: "program-in-action",
    slot: "image-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Instructor Demonstration",
    caption: "Guided learning sessions",
    description: "Write a short description of this image here — e.g. photo of an instructor-led demonstration.",
    tag: "Session",
    order: 3,
  },
  {
    // UPLOAD HERE (DIY — program-in-action): photo of a group/team activity
    programSlug: "diy",
    section: "program-in-action",
    slot: "image-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Group Activity",
    caption: "Collaboration & teamwork",
    description: "Write a short description of this image here — e.g. photo of a group/team activity.",
    tag: "Session",
    order: 4,
  },
  {
    // UPLOAD HERE (DIY — program-in-action): photo of students using program-specific tools/equipment
    programSlug: "diy",
    section: "program-in-action",
    slot: "image-4",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Hands-On Session",
    caption: "Working with real tools",
    description: "Write a short description of this image here — e.g. photo of students using program-specific tools/equipment.",
    tag: "Session",
    order: 5,
  },
  {
    // UPLOAD HERE (DIY — program-in-action): photo showcasing a student project
    programSlug: "diy",
    section: "program-in-action",
    slot: "image-5",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Project Showcase",
    caption: "Creative student projects",
    description: "Write a short description of this image here — e.g. photo showcasing a student project.",
    tag: "Project",
    order: 6,
  },
  {
    // UPLOAD HERE (DIY — program-in-action): photo of a graduation/certificate/milestone moment
    programSlug: "diy",
    section: "program-in-action",
    slot: "image-6",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Milestone Moment",
    caption: "Celebrating achievements",
    description: "Write a short description of this image here — e.g. photo of a graduation/certificate/milestone moment.",
    tag: "Session",
    order: 7,
  },

  // ---- "Skills in Action / Student Projects" (section: "student-projects") — 3 images + 1 video ----
  {
    // UPLOAD HERE (DIY — student-projects): screenshot/photo of student project #1
    programSlug: "diy",
    section: "student-projects",
    slot: "project-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 1",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #1.",
    tag: "Project",
    order: 1,
  },
  {
    // UPLOAD HERE (DIY — student-projects): screenshot/photo of student project #2
    programSlug: "diy",
    section: "student-projects",
    slot: "project-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 2",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #2.",
    tag: "Project",
    order: 2,
  },
  {
    // UPLOAD HERE (DIY — student-projects): screenshot/photo of student project #3
    programSlug: "diy",
    section: "student-projects",
    slot: "project-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 3",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #3.",
    tag: "Project",
    order: 3,
  },
  {
    // UPLOAD HERE (DIY — student-projects): clip of a student presenting/demoing their project
    programSlug: "diy",
    section: "student-projects",
    slot: "project-video",
    type: "video",
    src: diyProjectVideo,
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Presentation Demo",
    caption: "Student walkthrough of their final project",
    description: "These young students imagined what a sustainable home could look like and brought their ideas to life through a model. From imagination to creation, the result is both thoughtful and beautiful.Challenging students with such projects empowers them to translate their imagination into tangible solutions, demonstrating how creativity, sustainability, and local resources can be harnessed to address real-world challenges through hands-on, design-based learning.",
    tag: "Showcase",
    order: 4,
  },

  // ==========================================================================
  // PROGRAM: Creativity & Communication   (slug: "creativity-and-communication")
  // ==========================================================================

  // ---- "Program in Action" (section: "program-in-action") — 6 images + 1 video ----
  {
    // UPLOAD HERE (Creativity & Communication — program-in-action): MAIN video clip of students actively engaged in this program
    programSlug: "creativity-and-communication",
    section: "program-in-action",
    slot: "hero-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Classroom Experience",
    caption: "Watch our students in action",
    description: "Write a short description of this video here — e.g. MAIN video clip of students actively engaged in this program.",
    tag: "Showcase",
    order: 1,
  },
  {
    // UPLOAD HERE (Creativity & Communication — program-in-action): photo of students practicing a core skill
    programSlug: "creativity-and-communication",
    section: "program-in-action",
    slot: "image-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Skill Practice",
    caption: "Building core skills",
    description: "Write a short description of this image here — e.g. photo of students practicing a core skill.",
    tag: "Session",
    order: 2,
  },
  {
    // UPLOAD HERE (Creativity & Communication — program-in-action): photo of an instructor-led demonstration
    programSlug: "creativity-and-communication",
    section: "program-in-action",
    slot: "image-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Instructor Demonstration",
    caption: "Guided learning sessions",
    description: "Write a short description of this image here — e.g. photo of an instructor-led demonstration.",
    tag: "Session",
    order: 3,
  },
  {
    // UPLOAD HERE (Creativity & Communication — program-in-action): photo of a group/team activity
    programSlug: "creativity-and-communication",
    section: "program-in-action",
    slot: "image-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Group Activity",
    caption: "Collaboration & teamwork",
    description: "Write a short description of this image here — e.g. photo of a group/team activity.",
    tag: "Session",
    order: 4,
  },
  {
    // UPLOAD HERE (Creativity & Communication — program-in-action): photo of students using program-specific tools/equipment
    programSlug: "creativity-and-communication",
    section: "program-in-action",
    slot: "image-4",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Hands-On Session",
    caption: "Working with real tools",
    description: "Write a short description of this image here — e.g. photo of students using program-specific tools/equipment.",
    tag: "Session",
    order: 5,
  },
  {
    // UPLOAD HERE (Creativity & Communication — program-in-action): photo showcasing a student project
    programSlug: "creativity-and-communication",
    section: "program-in-action",
    slot: "image-5",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Project Showcase",
    caption: "Creative student projects",
    description: "Write a short description of this image here — e.g. photo showcasing a student project.",
    tag: "Project",
    order: 6,
  },
  {
    // UPLOAD HERE (Creativity & Communication — program-in-action): photo of a graduation/certificate/milestone moment
    programSlug: "creativity-and-communication",
    section: "program-in-action",
    slot: "image-6",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Milestone Moment",
    caption: "Celebrating achievements",
    description: "Write a short description of this image here — e.g. photo of a graduation/certificate/milestone moment.",
    tag: "Session",
    order: 7,
  },

  // ---- "Skills in Action / Student Projects" (section: "student-projects") — 3 images + 1 video ----
  {
    // UPLOAD HERE (Creativity & Communication — student-projects): screenshot/photo of student project #1
    programSlug: "creativity-and-communication",
    section: "student-projects",
    slot: "project-1",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 1",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #1.",
    tag: "Project",
    order: 1,
  },
  {
    // UPLOAD HERE (Creativity & Communication — student-projects): screenshot/photo of student project #2
    programSlug: "creativity-and-communication",
    section: "student-projects",
    slot: "project-2",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 2",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #2.",
    tag: "Project",
    order: 2,
  },
  {
    // UPLOAD HERE (Creativity & Communication — student-projects): screenshot/photo of student project #3
    programSlug: "creativity-and-communication",
    section: "student-projects",
    slot: "project-3",
    type: "image",
    src: 'PLACEHOLDER_IMAGE_URL',    // <-- replace with your image file/URL
    title: "Student Project 3",
    caption: "Student project",
    description: "Write a short description of this image here — e.g. screenshot/photo of student project #3.",
    tag: "Project",
    order: 3,
  },
  {
    // UPLOAD HERE (Creativity & Communication — student-projects): clip of a student presenting/demoing their project
    programSlug: "creativity-and-communication",
    section: "student-projects",
    slot: "project-video",
    type: "video",
    src: 'PLACEHOLDER_VIDEO_URL',    // <-- replace with your video file/URL
    poster: 'PLACEHOLDER_VIDEO_POSTER_URL',  // <-- replace with a thumbnail image for the video
    title: "Presentation Demo",
    caption: "Student walkthrough of their final project",
    description: "Write a short description of this video here — e.g. clip of a student presenting/demoing their project.",
    tag: "Showcase",
    order: 4,
  },

];

export default programEvidence;

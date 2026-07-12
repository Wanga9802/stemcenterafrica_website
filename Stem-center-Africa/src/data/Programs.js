import calculatorIcon from '../assets/calculator.png';
import roboIcon from '../assets/robo.png';
import design3dIcon from '../assets/3d.png';
import computerIcon from '../assets/computer.png';
import circuitIcon from '../assets/circuit-board.png';
import teacherIcon from '../assets/teacher.png';
import droneIcon from '../assets/drone.png';
import codeIcon from '../assets/code (1).png';

const programs = [
  {
    id: 1,
    slug: "computer-basics",
    title: "Computer Basics",
    description: "Building digital skills for the modern world.",
    icon: computerIcon,
    color: "#2F80ED",
  },
  {
    id: 2,
    slug: "3d-designing",
    title: "3D Design & Printing",
    description: "Design thinking and prototyping in 3D.",
    icon: design3dIcon,
    color: "#8E44AD",
  },
  {
    id: 3,
    slug: "arduino",
    title: "Arduino Development",
    description: "Hands-on circuits, sensors and embedded systems.",
    icon: "bi bi-cpu-fill",
    color: "#E67E22",
  },
  {
    id: 4,
    slug: "drone-technology",
    title: "Drone Technology",
    description: "Learning drone design, flying and applications.",
    icon: droneIcon,
    color: "#2980B9",
  },
  {
    id: 5,
    slug: "electronics",
    title: "Electrical & Electronics",
    description: "Hands-on circuits, sensors and embedded systems.",
    icon: circuitIcon,
    color: "#E74C3C",
  },
  {
    id: 6,
    slug: "web-development",
    title: "Web Development",
    description: "From HTML to full-stack, building for the web.",
    icon: codeIcon,
    color: "#27AE60",
  },
  {
    id: 7,
    slug: "scratch",
    title: "Scratch Programming",
    description: "From Scratch to Python and beyond.",
    icon: "bi bi-puzzle-fill",
    color: "#F1C40F",
  },
  {
    id: 8,
    slug: "space-science",
    title: "Space Science",
    description: "Exploring the universe through STEM.",
    icon: "bi bi-rocket-takeoff-fill",
    color: "#34495E",
  },
  {
    id: 9,
    slug: "science-experiments",
    title: "Science Experiments",
    description: "Hands-on discovery through practical experiments.",
    icon: "bi bi-flask-fill",
    color: "#16A085",
  },
  {
    id: 10,
    slug: "robotics",
    title: "Robotics",
    description: "Design, build and program intelligent robots.",
    icon: roboIcon,
    color: "#D35400",
  },
  {
    id: 11,
    slug: "data-science",
    title: "Data Science",
    description: "Exploring the future with data and AI.",
    icon: "bi bi-bar-chart-fill",
    color: "#9B59B6",
  },
  {
    id: 12,
    slug: "mathematics",
    title: "Mathematics",
    description: "Strengthening problem solving and critical thinking.",
    icon: calculatorIcon,
    color: "#F39C12",
  },
  {
    id: 13,
    slug: "teacher-training",
    title: "Teacher Training",
    description: "Empowering educators to inspire the next generation.",
    icon: teacherIcon,
    color: "#8E44AD",
  },
  {
    id: 14,
    slug: "ai",
    title: "Artificial Intelligence",
    description: "Exploring the future with artificial intelligence and machine learning.",
    icon: "bi bi-cpu",
    color: "#6C5CE7",
  },
  {
    id: 15,
    slug: "python-programming",
    title: "Python Programming",
    description: "Write clean code and build real-world projects with Python.",
    icon: "bi bi-filetype-py",
    color: "#3776AB",
  },
  {
    id: 16,
    slug: "diy",
    title: "DIY",
    description: "Hands-on maker projects that build practical, creative skills.",
    icon: "bi bi-tools",
    color: "#C0392B",
  },
  {
    id: 17,
    slug: "creativity-and-communication",
    title: "Creativity & Communication",
    description: "Building confidence, creative thinking and communication skills.",
    icon: "bi bi-chat-square-text-fill",
    color: "#00B894",
  },
];

export default programs;
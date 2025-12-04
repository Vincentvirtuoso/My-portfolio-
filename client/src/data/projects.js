const projects = [
  {
    id: 1,
    title: "Vigilo Attendance System",
    tagline: "Smart class attendance with geolocation and analytics.",
    category: "Web App",
    date: "2025-07",
    role: "Full Stack Developer",
    status: "In Progress",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
    ],
    tech: [
      { name: "React", icon: "react" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "express" },
      { name: "MongoDB", icon: "mongodb" },
    ],
    collaborators: [],
    // github: "https://github.com/example/vigilo",
    live: "https://vigilo-app.onrender.com",
    details: {
      longDescription:
        "Vigilo is a modern attendance management system built for universities. It allows lecturers to manage sessions, approve absence pleas, and track stats with geolocation-based verification. Students can mark attendance, view records, and get smart insights.",
      features: [
        "Live geolocation attendance check-in",
        "Session auto-closing cron jobs",
        "Role-based access for Lecturers and Students",
        "Analytics dashboard with charts and stats",
      ],
      architecture: {
        frontend: "React + GSAP + Framer Motion",
        backend: "Node.js + Express",
        database: "MongoDB",
        hosting: "Render",
      },
      challenges:
        "Ensuring accurate geolocation validation and managing real-time state across multiple roles without redundancy.",
      outcome:
        "Improved attendance accuracy by 95% and simplified session management for lecturers.",
      lessonsLearned: [
        "Optimizing MongoDB queries for dynamic attendance checks.",
        "Designing reusable React components for complex role-based UIs.",
      ],
      tags: ["attendance", "education", "geolocation", "mern"],
    },
  },
  {
    id: 2,
    title: "Portfolio Website",
    tagline:
      "Minimal and animated personal portfolio built with motion and style.",
    category: "Personal Project",
    date: "2025-09",
    role: "Frontend Developer",
    status: "Active",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    ],
    tech: [
      { name: "React", icon: "react" },
      { name: "Tailwind", icon: "css3" },
    ],
    collaborators: [],
    live: "https://splenddev-portfolio.onrender.com",
    details: {
      longDescription:
        "A personal portfolio showcasing creative projects, design experiments, and development work. It focuses on a clean layout, smooth animations, and mobile responsiveness.",
      features: [
        "Dynamic project cards",
        "Smooth page transitions with Framer Motion",
        "Responsive design with CSS Modules",
      ],
      architecture: {
        frontend: "React + Vite + Framer Motion",
        backend: "None (Static Site)",
        database: "N/A",
        hosting: "Render",
      },
      challenges:
        "Balancing aesthetic animations with page performance and loading time.",
      outcome:
        "Achieved a fast, visually appealing portfolio with strong personal branding.",
      lessonsLearned: [
        "Optimizing animation performance with motion variants.",
        "Creating reusable layout sections with React props.",
      ],
      tags: ["portfolio", "frontend", "animation", "ui"],
    },
  },
  {
    id: 3,
    title: "AffilHomes Property App",
    tagline: "Real estate listing platform for agents and buyers.",
    category: "Startup Project",
    date: "2025-04",
    role: "Frontend Lead",
    status: "In Progress",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=800&q=80",
    tech: [
      { name: "React.js", icon: "react" },
      { name: "Css Modules", icon: "css3" },
      { name: "Vite", icon: "vite" },
    ],
    collaborators: [{ name: "Mr Dimeji", role: "Backend Engineer" }],
    github: "https://github.com/Affilhomes",
    live: "https://affilhomes.onrender.com",
    details: {
      longDescription:
        "A property marketplace that connects agents and buyers with smart filters, authentication, and property exploration.",
      features: [],
      architecture: {
        frontend: "React.js + Vite",
        hosting: "Render",
      },
      challenges:
        "Integrating real-time map updates and efficient property queries for a scalable experience.",
      outcome:
        "Created a seamless user flow for agents to upload and manage listings.",
      lessonsLearned: ["Designing responsive grids for large data sets."],
      tags: ["real-estate", "reactjs"],
    },
  },
  {
    id: 4,
    title: "Kitchen Connect",
    tagline: "Seemless food ordering platform.",
    category: "Food ordering",
    date: "2025-01",
    role: "Lead Developer",
    status: "In Progress",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590608897129-79da98d1593d",
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
    ],
    tech: [
      { name: "React", icon: "react" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "express" },
      { name: "MongoDB", icon: "mongodb" },
    ],
    collaborators: [{ name: "Kamaldeen", role: "Frontend Developer" }],
    live: "https://kitchen-connect-com.onreder.com",
    details: {
      longDescription:
        "Kitchen connect is a secure food ordering app for placing orders, find listings from famous kitchens, and getting fast home delivery all within KWASU.",
      features: [
        "Order progress tracking",
        "User authentication and access control",
        "Featured Listings",
      ],
      architecture: {
        frontend: "React + Vite",
        backend: "Node.js + Express + Mongoose",
        database: "MongoDB",
        hosting: "Render",
      },
      challenges: "",
      outcome: "",
      lessonsLearned: [],
      tags: ["orders", "food-app", "paystack", "react"],
    },
  },
];

export default projects;

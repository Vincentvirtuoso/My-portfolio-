const projects = [
  {
    id: 1,
    title: "Vigilo Attendance System",
    tagline: "Smart class attendance with geolocation and analytics.",
    category: "Web App",
    date: "2025-07",
    role: "Full Stack Developer",
    status: "Completed",
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
    collaborators: [
      { name: "John Doe", role: "UI Designer" },
      { name: "Jane Smith", role: "Backend Engineer" },
    ],
    github: "https://github.com/example/vigilo",
    live: "https://vigilo-demo.netlify.app",
    details: {
      longDescription:
        "Vigilo is a modern attendance management system built for universities. It allows class representatives to manage sessions, approve absence pleas, and track stats with geolocation-based verification. Students can mark attendance, view records, and get smart insights.",
      features: [
        "Live geolocation attendance check-in",
        "Absence plea with proof upload",
        "Session auto-closing cron jobs",
        "Role-based access for Class Reps and Students",
        "Analytics dashboard with charts and stats",
      ],
      architecture: {
        frontend: "React + Redux + Framer Motion",
        backend: "Node.js + Express",
        database: "MongoDB",
        hosting: "Netlify & Render",
      },
      challenges:
        "Ensuring accurate geolocation validation and managing real-time state across multiple roles without redundancy.",
      outcome:
        "Improved attendance accuracy by 95% and simplified session management for class reps.",
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
      { name: "CSS Modules", icon: "css3" },
      { name: "Framer Motion", icon: "framer" },
    ],
    collaborators: [],
    github: "https://github.com/example/portfolio",
    live: "https://example-portfolio.vercel.app",
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
        hosting: "Vercel",
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
      { name: "Next.js", icon: "nextjs" },
      { name: "Firebase", icon: "firebase" },
      { name: "Mapbox", icon: "mapbox" },
    ],
    collaborators: [{ name: "Michael Lee", role: "Backend Engineer" }],
    github: "https://github.com/example/affilhomes",
    live: "https://affilhomes.netlify.app",
    details: {
      longDescription:
        "A property marketplace that connects agents and buyers with smart filters, authentication, and map-based property exploration.",
      features: [
        "Interactive map search using Mapbox",
        "User authentication with Firebase",
        "Admin dashboard for property management",
      ],
      architecture: {
        frontend: "Next.js + TailwindCSS",
        backend: "Firebase Functions",
        database: "Firestore",
        hosting: "Netlify",
      },
      challenges:
        "Integrating real-time map updates and efficient property queries for a scalable experience.",
      outcome:
        "Created a seamless user flow for agents to upload and manage listings.",
      lessonsLearned: [
        "Handling map performance in SSR environments.",
        "Designing responsive grids for large data sets.",
      ],
      tags: ["real-estate", "maps", "firebase", "nextjs"],
    },
  },
  {
    id: 4,
    title: "ChatX Realtime Messenger",
    tagline: "Realtime messaging with media sharing and presence tracking.",
    category: "Web App",
    date: "2025-03",
    role: "Full Stack Developer",
    status: "Completed",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1603791452906-bb9d23eeb7f9?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581093588401-22d3f70b7e3a",
      "https://images.unsplash.com/photo-1508873699372-7ae4be9ab6c2",
    ],
    tech: [
      { name: "React", icon: "react" },
      { name: "Socket.io", icon: "socketio" },
      { name: "Express", icon: "express" },
      { name: "MongoDB", icon: "mongodb" },
    ],
    collaborators: [
      { name: "Daniel Okon", role: "UI/UX Designer" },
      { name: "Tina James", role: "Backend Developer" },
    ],
    github: "https://github.com/example/chatx",
    live: "https://chatx-demo.vercel.app",
    details: {
      longDescription:
        "ChatX is a realtime messaging platform supporting individual and group conversations with online status indicators, image/file sharing, and dark mode UI. It features an event-driven backend powered by Socket.io for instant updates.",
      features: [
        "Realtime 1-on-1 and group chats",
        "Online/offline status tracking",
        "Media and file sharing",
        "Custom emojis and reactions",
        "Dark/light theme switcher",
      ],
      architecture: {
        frontend: "React + Context API + SCSS",
        backend: "Node.js + Express + Socket.io",
        database: "MongoDB + GridFS for file storage",
        hosting: "Vercel + Render",
      },
      challenges:
        "Managing socket disconnections gracefully and optimizing message delivery without message duplication.",
      outcome:
        "Delivered a responsive, low-latency chat platform with active users exceeding 500 in testing.",
      lessonsLearned: [
        "Socket namespace and room handling for scalability.",
        "Optimizing image uploads with GridFS streams.",
      ],
      tags: ["chat", "realtime", "socketio", "mern"],
    },
  },
  {
    id: 5,
    title: "Taskify Productivity App",
    tagline: "Collaborative task boards and progress tracking for teams.",
    category: "Productivity",
    date: "2025-02",
    role: "Frontend Engineer",
    status: "Completed",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521790797524-b2497295b8a0",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    ],
    tech: [
      { name: "Vue.js", icon: "vuejs" },
      { name: "Firebase", icon: "firebase" },
      { name: "Chart.js", icon: "chartjs" },
    ],
    collaborators: [{ name: "Olivia Cruz", role: "Project Manager" }],
    github: "https://github.com/example/taskify",
    live: "https://taskify-app.netlify.app",
    details: {
      longDescription:
        "Taskify helps remote teams track tasks and visualize progress in real-time using interactive Kanban boards. It includes user authentication, notifications, and performance analytics via charts.",
      features: [
        "Drag-and-drop Kanban boards",
        "Team collaboration with role permissions",
        "Realtime updates using Firebase",
        "Analytics dashboard with progress charts",
      ],
      architecture: {
        frontend: "Vue.js + Vuex + Chart.js",
        backend: "Firebase Functions",
        database: "Firestore",
        hosting: "Netlify",
      },
      challenges:
        "Implementing realtime board syncing across multiple users with minimal write operations.",
      outcome:
        "Enhanced team coordination by 40% and reduced update delays with Firebase triggers.",
      lessonsLearned: [
        "Designing for concurrent data edits in realtime apps.",
        "Creating a clean component architecture in Vue.",
      ],
      tags: ["kanban", "productivity", "vue", "team"],
    },
  },
  {
    id: 6,
    title: "MediaVault Cloud",
    tagline: "Secure cloud storage and media sharing solution.",
    category: "Cloud & Storage",
    date: "2025-01",
    role: "Backend Developer",
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
      { name: "AWS S3", icon: "aws" },
    ],
    collaborators: [
      { name: "Sarah Kim", role: "DevOps Engineer" },
      { name: "Leo Martins", role: "Frontend Developer" },
    ],
    github: "https://github.com/example/mediavault",
    live: "https://mediavault.cloud",
    details: {
      longDescription:
        "MediaVault is a secure cloud storage app for uploading, organizing, and sharing photos and videos. It integrates AWS S3 for scalable storage and access management via pre-signed URLs.",
      features: [
        "File uploads with progress tracking",
        "User authentication and access control",
        "Shareable links with expiration",
        "Media previews and tagging",
      ],
      architecture: {
        frontend: "React + Redux Toolkit",
        backend: "Node.js + Express + AWS SDK",
        database: "MongoDB",
        hosting: "AWS EC2 + S3",
      },
      challenges:
        "Managing large file uploads and maintaining consistent metadata between frontend and backend.",
      outcome:
        "Successfully implemented a scalable architecture with efficient S3 file streaming.",
      lessonsLearned: [
        "Optimizing AWS S3 multipart uploads.",
        "Building robust upload UIs with progress management.",
      ],
      tags: ["cloud", "storage", "aws", "react"],
    },
  },
];

export default projects;

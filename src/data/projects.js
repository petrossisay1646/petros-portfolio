// ═══════════════════════════════════════════════════════════════════
// PROJECTS DATA — Petros Sisay Gelan Portfolio
// Updated with screenshots and new projects
// ═══════════════════════════════════════════════════════════════════

export const projects = [
  {
    id: 'ace-meklit',
    title: 'ACE Meklit Business Website',
    tagline: 'Polished, responsive corporate site for ACE Meklit with custom layout.',
    description:
      'A fully responsive business website built for ACE Meklit using clean semantic HTML, CSS layout techniques, and smooth scroll interactions. Delivered as a real freelance project.',
    longDescription:
      'ACE Meklit is a business website built from scratch with focus on layout hierarchy, visual appeal, and device responsiveness. It showcases company services, organized navigation, and cross-browser performance without heavy framework dependencies.',
    problem: 'The business needed a crisp, professional digital presence that displays services clearly across mobile and desktop devices.',
    solution: 'Designed and engineered a custom mobile-first website utilizing clean HTML5 structure, CSS Grid/Flexbox layout, and JavaScript interactive elements.',
    features: [
      'Mobile-first responsive design for all screen sizes',
      'Clean navigation hierarchy and smooth scrolling',
      'Structured service presentation cards',
      'Cross-browser optimization and fast load times',
      'Accessible semantic HTML architecture',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    category: ['frontend', 'personal'],
    liveUrl: 'https://ace-meklit.netlify.app/',
    githubUrl: 'https://github.com/petrossisay1646/ACE-Meklit',
    featured: true,
    image: '/projects/ace-meklit.webp',
    color: '#3b82f6',
  },
  {
    id: 'apple-website',
    title: 'Apple Marketing Page Replica',
    tagline: 'Pixel-accurate frontend replication of Apple\'s product showcase.',
    description:
      'A frontend clone of Apple\'s product page focusing on minimal design, precise typographic scale, and modern CSS layout mastery — a study in world-class UI precision.',
    longDescription:
      'Replicating Apple\'s design language provided an excellent opportunity to master fine-grained visual details, precise spacing rules, typography, and responsive container behavior across multiple breakpoints using modern CSS.',
    problem: 'Challenge to reproduce world-class UI design accuracy and typography rules without external libraries.',
    solution: 'Meticulously crafted the page using raw HTML5 and modern CSS flexbox/grid layout techniques.',
    features: [
      'Pixel-accurate typography and section spacing',
      'Responsive design handling high-DPI displays',
      'Subtle hover states and micro-interactions',
      'Clean semantic code organization',
    ],
    tech: ['HTML5', 'CSS3', 'Flexbox', 'CSS Grid'],
    category: ['frontend', 'personal'],
    liveUrl: 'https://melodic-hummingbird-fdca26.netlify.app/',
    githubUrl: 'https://github.com/petrossisay1646/Apple-website',
    featured: true,
    image: '/projects/apple-website.webp',
    color: '#60a5fa',
  },
  {
    id: 'group-chat-app',
    title: 'Java Multi-Client Group Chat',
    tagline: 'Real-time multi-threaded Java desktop chat application over TCP sockets.',
    description:
      'A Java desktop application enabling real-time group chat among multiple concurrent client instances connected to a central TCP server with message broadcasting.',
    longDescription:
      'Built using core Java networking APIs and multithreading, this system implements a dedicated server thread pool to handle concurrent client sockets, broadcast messages in real-time, and manage connection states cleanly.',
    problem: 'Required implementing reliable multi-client concurrent network communication in standard Java.',
    solution: 'Engineered a TCP socket server architecture managing multiple client handlers with thread safety and message broadcasting.',
    features: [
      'Multi-threaded server architecture with socket handlers',
      'Real-time message broadcasting to active clients',
      'Client connection/disconnection lifecycle management',
      'Java Swing desktop user interface',
      'Event-driven communication flow',
    ],
    tech: ['Java', 'Java Swing', 'TCP Sockets', 'Multithreading'],
    category: ['java', 'personal'],
    liveUrl: null,
    githubUrl: 'https://github.com/petrossisay1646/GroupChatApp',
    featured: true,
    image: '/projects/group-chat-app.webp',
    color: '#f59e0b',
  },
  {
    id: 'student-registration',
    title: 'Student Registration System',
    tagline: 'Database-driven Java desktop CRUD application for student records.',
    description:
      'A Java desktop application for managing student academic records with complete CRUD operations, JDBC database connectivity, and Java Swing UI.',
    longDescription:
      'Developed as an academic software engineering project, this system features JDBC connectivity to MySQL, data validation routines, search/filter algorithms, and structured record storage.',
    problem: 'Academic requirement to build a reliable data management system with persistent storage and interactive UI.',
    solution: 'Created a Java Swing application connected via JDBC to a MySQL database schema with robust SQL query execution.',
    features: [
      'Full CRUD operations (Create, Read, Update, Delete)',
      'Relational database integration via JDBC',
      'Input validation and error handling',
      'Search and filter student records by ID or department',
    ],
    tech: ['Java', 'Java Swing', 'JDBC', 'MySQL', 'SQL'],
    category: ['java', 'academic'],
    liveUrl: null,
    githubUrl: 'https://github.com/petrossisay1646/StudentRegisterSystem',
    featured: false,
    image: '/projects/student-registration.webp',
    color: '#22c55e',
  },
  {
    id: 'puppy-lovers',
    title: 'Puppy Lovers Experience',
    tagline: 'Creative, interactive web page showcasing expressive CSS styling.',
    description:
      'A fun, responsive web page built to experiment with expressive CSS animations, card layout compositions, and mobile-friendly interactive elements.',
    longDescription:
      'This project explores visual creativity, custom CSS keyframe animations, card compositions, and mobile-friendly interactions for web users.',
    problem: 'Exploring creative layout design and user engagement through CSS animations.',
    solution: 'Built an interactive, visually engaging responsive web page with clean HTML/CSS.',
    features: [
      'Custom CSS keyframe animations',
      'Responsive grid layout for image cards',
      'Interactive UI elements and smooth hover effects',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    category: ['frontend', 'personal'],
    liveUrl: 'https://frolicking-entremet-b5f6f4.netlify.app/',
    githubUrl: 'https://github.com/petrossisay1646/puppy-lovers-page',
    featured: false,
    image: '/projects/puppy-lovers.webp',
    color: '#a78bfa',
  },
  {
    id: 'portfolio-v1',
    title: 'Personal Portfolio (v1)',
    tagline: 'First personal portfolio website — where the developer journey began.',
    description:
      'My original developer portfolio featuring custom dark styling, CSS animations, and project showcase cards built entirely with vanilla HTML, CSS, and JavaScript.',
    longDescription:
      'The initial milestone in my developer journey. Building this site established foundational concepts in responsive layouts, document structure, and basic script interaction.',
    problem: 'Establishing an initial online presence to present early projects.',
    solution: 'Created a multi-section dark themed portfolio site with vanilla web technologies.',
    features: [
      'Custom dark aesthetic design',
      'Smooth section navigation',
      'Responsive project card grid',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    category: ['frontend', 'personal'],
    liveUrl: 'https://beamish-pavlova-feadd8.netlify.app/',
    githubUrl: null,
    featured: false,
    image: '/projects/portfolio-v1.webp',
    color: '#06b6d4',
  },
  {
    id: 'portfolio-v2',
    title: 'Professional Portfolio (v2 — This Site)',
    tagline: 'Production-quality React portfolio with command palette and dark theme.',
    description:
      'A fully engineered React SPA portfolio featuring dark/light mode, Ctrl+K command palette, scroll animations, project showcases, and a responsive mobile-first layout.',
    longDescription:
      'This portfolio itself represents my most complete engineering effort — designed from scratch as a production-quality React application with custom CSS design tokens, reusable component architecture, and interactive features that go beyond standard templates.',
    problem: 'Needed a professional online presence that reflects serious engineering skills rather than an obvious template.',
    solution: 'Architected a complete React SPA from scratch with its own design system, custom hooks, and interactive features.',
    features: [
      'Dark/light theme with localStorage persistence',
      'Ctrl+K command palette for keyboard navigation',
      'Scroll-reveal animations throughout',
      'Project filtering with case-study modal dialogs',
      'Fully accessible (ARIA, keyboard navigation)',
      'Deployed on Vercel with optimized production build',
    ],
    tech: ['React', 'Vite', 'CSS Modules', 'JavaScript'],
    category: ['frontend', 'personal'],
    liveUrl: 'https://petros-portfolio-one.vercel.app',
    githubUrl: 'https://github.com/petrossisay1646/petros-portfolio',
    featured: true,
    image: '/projects/portfolio-v2.webp',
    color: '#8b5cf6',
  },
];

export const filterCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'java', label: 'Java' },
  { id: 'academic', label: 'Academic' },
  { id: 'personal', label: 'Personal' },
];

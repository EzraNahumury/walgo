export type Project = {
  id: string;
  name: string;
  tagline: string;
  stack: string[];
  year: string;
  category: "Web/Apps" | "Machine Learning";
  link?: string;
};

export type Skill = {
  name: string;
  level: number; // 0..100
  category: "Frontend" | "Backend" | "ML/AI" | "Cloud" | "Tools";
};

export type Experience = {
  role: string;
  org: string;
  period: string;
  summary: string;
};

export type Certificate = {
  title: string;
  issuer: string;
  year: string;
  highlight?: boolean;
};

export const identity = {
  handle: "@ezranhmry_",
  name: "Ezra Kristanto Nahumury",
  title: "Front-End Developer · Fresh Graduate UKDW",
  location: "Yogyakarta, Indonesia",
  bio: "Fresh graduate of Duta Wacana Christian University (UKDW), focused on front-end development and modern web technologies. Top graduate of the Cloud Computing cohort at Bangkit Academy 2024 Batch 2 — led by Google, Tokopedia, Gojek, and Traveloka.",
  motto: "Whoever strives shall succeed.",
  email: "ezra.kristanto@ti.ukdw.ac.id",
  socials: [
    { label: "GitHub", href: "https://github.com/EzraNahumury" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ezranhmry/" },
    { label: "Instagram", href: "https://www.instagram.com/ezranhmry_/" },
  ],
  // Replace after publishing the site to Walrus.
  chain: {
    network: "Walrus Mainnet",
    blobId: "0xA91F…7E2D",
    hash: "sha256:9b4f8c1e2aa7…",
    timestamp: "2026-04-18T00:00:00Z",
    explorer: "https://walruscan.com/",
  },
};

export const projects: Project[] = [
  {
    id: "smartwaste",
    name: "SmartWaste · CNN Classifier",
    tagline:
      "A CNN-based waste classification system with Flask + PWA, delivering real-time detection on Android devices. (Undergraduate thesis project.)",
    stack: ["Python", "TensorFlow", "Keras", "Flask", "PWA"],
    year: "2024",
    category: "Machine Learning",
    link:
      "https://github.com/EzraNahumury/SmartWaste-Sistem-Klasifikasi-Sampah-Berbasis-CNN-dengan-Implementasi-Flask-dan-PWA-untuk-Android",
  },
  {
    id: "trashup",
    name: "TrashUp App",
    tagline:
      "Waste management app for sustainable living — Capstone Project at Bangkit Academy 2024.",
    stack: ["Kotlin", "Firebase", "Google Cloud", "Postman"],
    year: "2024",
    category: "Web/Apps",
    link: "https://github.com/EzraNahumury/CAPSTONE-PROJECT-BANGKIT",
  },
  {
    id: "yolo-waste",
    name: "YOLOv8 Waste Detection",
    tagline:
      "Real-time waste object detection with YOLOv8 for urban cleanliness monitoring systems.",
    stack: ["YOLOv8", "Python", "Computer Vision"],
    year: "2024",
    category: "Machine Learning",
    link: "https://github.com/EzraNahumury/SKRIPSI/tree/main/YOLOv8/CODE",
  },
  {
    id: "federated-fraud",
    name: "Federated Fraud Detection",
    tagline:
      "Collaborative banking fraud detection with Federated Learning — preserves customer data privacy.",
    stack: ["Python", "Federated Learning", "AI"],
    year: "2024",
    category: "Machine Learning",
    link:
      "https://github.com/EzraNahumury/Collaborative-Intelligence-Network-Federated-Learning-",
  },
  {
    id: "subsidi-ledger",
    name: "Subsidy Ledger · FL",
    tagline:
      "Decentralized eligibility scoring for subsidy recipients using Federated Learning.",
    stack: ["Python", "Federated Learning", "Data Analysis"],
    year: "2024",
    category: "Machine Learning",
    link: "https://github.com/EzraNahumury/SubsidiLedger",
  },
  {
    id: "dokgarut",
    name: "Dusun Dokgarut Tourism",
    tagline:
      "A profile site for a tourist village — showcasing the natural beauty and culture of Dusun Dokgarut.",
    stack: ["React", "TailwindCSS", "Framer Motion"],
    year: "2024",
    category: "Web/Apps",
    link: "https://github.com/EzraNahumury/DESIGN-WEBSITE-DUSUN-DOKGGARUT",
  },
  {
    id: "ticket-booking",
    name: "Ticket Booking System",
    tagline:
      "Full-stack concert ticket booking platform with interactive seat selection and online payment.",
    stack: ["JavaScript", "PHP", "MySQL", "CSS3"],
    year: "2024",
    category: "Web/Apps",
    link:
      "https://github.com/EzraNahumury/WEBSITE-PEMESANAN-TIKET-KONSER-Full",
  },
  {
    id: "maybemay",
    name: "MaybeMay E-Commerce",
    tagline:
      "Exclusive online bag store — minimalist design and a frictionless shopping experience.",
    stack: ["HTML5", "CSS3", "JavaScript", "PHP"],
    year: "2023",
    category: "Web/Apps",
    link: "https://github.com/EzraNahumury/WEBSITE-PENJUALAN-TAS",
  },
  {
    id: "petshop",
    name: "Pet Shop Management",
    tagline:
      "Operational management system for a pet shop — grooming, boarding, and product inventory.",
    stack: ["Laravel", "Bootstrap", "MySQL"],
    year: "2023",
    category: "Web/Apps",
    link: "https://github.com/EzraNahumury/PET-SHOP-MANAGEMENT",
  },
  {
    id: "campus-maps",
    name: "Campus Maps UKDW",
    tagline:
      "Best First Search algorithm implementation for shortest-path navigation across the UKDW campus.",
    stack: ["Python", "Algorithms"],
    year: "2023",
    category: "Machine Learning",
    link: "https://github.com/EzraNahumury/Campus-Maps-UKDW-",
  },
  {
    id: "image-processing",
    name: "Digital Image Processing",
    tagline:
      "Image-processing experiments — feature extraction, filtering, and image restoration.",
    stack: ["Python", "OpenCV", "NumPy"],
    year: "2023",
    category: "Machine Learning",
    link:
      "https://github.com/EzraNahumury/Pengolahan-Citra-Digital---Image-Processing",
  },
  {
    id: "membership",
    name: "Membership App",
    tagline:
      "Digital membership management system for organizations and communities.",
    stack: ["Java", "SQLite", "XML"],
    year: "2022",
    category: "Web/Apps",
    link: "https://github.com/EzraNahumury/Aplikasi-Membership",
  },
];

export const skills: Skill[] = [
  // Frontend
  { name: "React", level: 90, category: "Frontend" },
  { name: "Next.js", level: 82, category: "Frontend" },
  { name: "JavaScript", level: 88, category: "Frontend" },
  { name: "Tailwind CSS", level: 92, category: "Frontend" },
  { name: "HTML5 / CSS3", level: 94, category: "Frontend" },
  { name: "Framer Motion", level: 78, category: "Frontend" },
  // Backend
  { name: "Node.js", level: 76, category: "Backend" },
  { name: "Laravel / PHP", level: 74, category: "Backend" },
  { name: "Java", level: 78, category: "Backend" },
  { name: "Flask", level: 70, category: "Backend" },
  { name: "MySQL", level: 80, category: "Backend" },
  // ML / AI
  { name: "Python", level: 85, category: "ML/AI" },
  { name: "TensorFlow / Keras", level: 78, category: "ML/AI" },
  { name: "YOLOv8 · CV", level: 72, category: "ML/AI" },
  { name: "Federated Learning", level: 70, category: "ML/AI" },
  // Cloud
  { name: "Google Cloud Platform", level: 86, category: "Cloud" },
  { name: "Firebase", level: 78, category: "Cloud" },
  { name: "Terraform", level: 65, category: "Cloud" },
  { name: "Kubernetes (GKE)", level: 62, category: "Cloud" },
  // Tools
  { name: "Git & GitHub", level: 90, category: "Tools" },
  { name: "Figma", level: 80, category: "Tools" },
  { name: "Vercel", level: 82, category: "Tools" },
];

export const experience: Experience[] = [
  {
    role: "Cloud Computing Cohort — Top Graduate",
    org: "Bangkit Academy · Google · Tokopedia · Gojek · Traveloka",
    period: "2024",
    summary:
      "Top graduate of the Cloud Computing learning path. Shipped the 'TrashUp App' capstone (Kotlin + Firebase + GCP) with a multi-disciplinary team. Earned 30+ GCP skill badges and completed Associate Cloud Engineer preparation.",
  },
  {
    role: "Member · Ministry of Social & Cultural Affairs",
    org: "Student Executive Board (BEM) — UKDW",
    period: "2024 — 2025",
    summary:
      "Ran university-level social and cultural programs, coordinating events and student initiatives.",
  },
  {
    role: "Member · Fundraising Department",
    org: "Informatics Student Association (HMTI) — UKDW",
    period: "2023",
    summary:
      "Fundraising department for the Informatics student association — ran funding programs for academic and non-academic activities.",
  },
  {
    role: "B.Sc. Informatics Engineering",
    org: "Duta Wacana Christian University (UKDW)",
    period: "2021 — 2025",
    summary:
      "Thesis: CNN + YOLOv8 waste classification, deployed via Flask & PWA for Android.",
  },
];

export const certificates: Certificate[] = [
  { title: "Bangkit Academy 2024 Batch 2 — Cloud Computing", issuer: "Google · Tokopedia · Gojek · Traveloka", year: "2024", highlight: true },
  { title: "Becoming a Google Cloud Engineer", issuer: "Dicoding", year: "2024", highlight: true },
  { title: "IT Specialist — Python", issuer: "Certiport", year: "2024", highlight: true },
  { title: "Java Programming", issuer: "Oracle Academy", year: "2024" },
  { title: "Java Foundations", issuer: "Oracle Academy", year: "2023" },
  { title: "Cybersecurity Essentials", issuer: "Cisco", year: "2023" },
  { title: "Introduction to Cybersecurity", issuer: "Cisco", year: "2023" },
  { title: "AI Fundamentals", issuer: "Dicoding", year: "2024" },
  { title: "JavaScript Programming Fundamentals", issuer: "Dicoding", year: "2024" },
  { title: "Web Programming Fundamentals", issuer: "Dicoding", year: "2024" },
  { title: "Git & GitHub Fundamentals", issuer: "Dicoding", year: "2024" },
  { title: "Back-End App Development with GCP (Beginner)", issuer: "Dicoding", year: "2024" },
  { title: "Programming Fundamentals for Software Developers", issuer: "Dicoding", year: "2024" },
  { title: "Introduction to Programming Logic", issuer: "Dicoding", year: "2024" },
  { title: "Google Cloud Fundamentals — Core Infrastructure", issuer: "Google Cloud", year: "2024" },
  { title: "Cloud Computing Fundamentals", issuer: "Google Cloud", year: "2024" },
  { title: "Essential Google Cloud Infrastructure — Foundation", issuer: "Google Cloud", year: "2024" },
  { title: "Essential Google Cloud Infrastructure — Core Services", issuer: "Google Cloud", year: "2024" },
  { title: "Elastic Google Cloud Infrastructure — Scaling & Automation", issuer: "Google Cloud", year: "2024" },
  { title: "Reliable Google Cloud Infrastructure — Design & Process", issuer: "Google Cloud", year: "2024" },
  { title: "Preparing for Associate Cloud Engineer Journey", issuer: "Google Cloud", year: "2024" },
  { title: "Application Development with Cloud Run", issuer: "Google Cloud", year: "2024" },
  { title: "Implement Load Balancing on Compute Engine", issuer: "Google Cloud", year: "2024" },
  { title: "Develop your Google Cloud Network", issuer: "Google Cloud", year: "2024" },
  { title: "Networking and Security in Google Cloud", issuer: "Google Cloud", year: "2024" },
  { title: "Build a Secure Google Cloud Network", issuer: "Google Cloud", year: "2024" },
  { title: "Getting Started with Google Kubernetes Engine", issuer: "Google Cloud", year: "2024" },
  { title: "Build Infrastructure with Terraform on GCP", issuer: "Google Cloud", year: "2024" },
  { title: "Getting Started with Terraform for Google Cloud", issuer: "Google Cloud", year: "2024" },
  { title: "Implement DevOps Workflows in Google Cloud", issuer: "Google Cloud", year: "2024" },
  { title: "Using DevSecOps in your Google Cloud Environment", issuer: "Google Cloud", year: "2024" },
  { title: "Developing a Google SRE Culture", issuer: "Google Cloud", year: "2024" },
  { title: "Set Up an App Dev Environment on Google Cloud", issuer: "Google Cloud", year: "2024" },
  { title: "Logging and Monitoring in Google Cloud", issuer: "Google Cloud", year: "2024" },
  { title: "Monitor and Log with Google Cloud Observability", issuer: "Google Cloud", year: "2024" },
  { title: "Observability in Google Cloud", issuer: "Google Cloud", year: "2024" },
  { title: "Data, ML, and AI in Google Cloud", issuer: "Google Cloud", year: "2024" },
  { title: "Prepare Data for ML APIs on Google Cloud", issuer: "Google Cloud", year: "2024" },
  { title: "Infrastructure in Google Cloud", issuer: "Google Cloud", year: "2024" },
  { title: "Enumerator Certificate", issuer: "Indonesian Survey Institute", year: "2023" },
];

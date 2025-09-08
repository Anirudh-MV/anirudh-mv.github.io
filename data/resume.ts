// Edit this file to update your resume content and metadata.
// Replace placeholder content with your real info. No other files need changes.

import type { Metadata } from "next"

import { SocialItem } from "@/app/typedef"

import {
  Github,
  Link as LinkIcon,
  Linkedin,
  Mail,
  Phone,
  AudioLines,
  Sparkles,
  Rss,
} from "lucide-react"


const socials: Record<string, SocialItem> = {
  github: { href: "https://github.com/Anirudh-MV", label: "Github", SocialIcon: Github, visible: true },
  linkedin: { href: "https://www.linkedin.com/in/anirudh-mv-3ba53879/", label: "LinkedIn", SocialIcon: Linkedin, visible: true },
  substack: { href: "https://anirudhmv21.substack.com", label: "Substack", SocialIcon: Rss, visible: true },
  soundcloud: { href: "https://soundcloud.com/anirudh-mv", label: "SoundCloud", SocialIcon: AudioLines, visible: true },
  email: { href: "contact@anirudhmv.in", label: "Email", SocialIcon: Mail, action: "mailto", visible: true },
  magic: { href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", label: "Magic Button", SocialIcon: Sparkles, visible: true },
  phone: { href: "+91 xxxxxxxxxxx", label: "Phone", SocialIcon: Phone, action: "tel", visible: false },
  website: { href: "https://anirudhmv.in", label: "Website", SocialIcon: LinkIcon, visible: false },
}

// Basic profile info
export const resume = {
  name: "Anirudh MV",
  title: "Software Engineer | Software Architect | Backend Engineering",
  summary:
    "Experienced backend software developer with a proven track record of building and managing highly available, scalable, and cost-efficient systems. Proficient in multiple programming languages and passionate about creating innovative solutions that align with business goals. Driven by curiosity and continuous learning, I focus on improving system performance and optimizing costs.\n\nCurrently exploring NixOS and OPNSense in my free time.",
  location: "Bengaluru, India",
  availability: "Working at Satisfi Labs; Trying my best at FOSS contributions.",
  profile: {
    imageSrc: "/images/anirudh-mv.webp",
    imageAlt: "Photo of Anirudh MV looking cool while playing the bass on stage.",
  },
  socials,
  nav: [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
  ],
  // Experience timeline
  experience: [
    {
      company: "Satisfi Labs Inc.",
      role: "Software Engineer",
      period: "Jun. 2025 — Present",
      location: "Remote",
      description: "",
      highlights: [
      ],
      tech: ["Node.js", "Python-Flask", "GCP", "Kafka", "MySQL", "MS-SQL Server Stored Procedures", "MySQL Stored Procedures"],
    },
    {
      company: "Ather Energy Ltd.",
      role: "Senior Software Engineer",
      period: "Apr. 2024 — May 2025",
      location: "Bengaluru",
      description: "Led initiatives across backend services, database performance, and production reliability.",
      highlights: [
        "Architected and executed the migration of a monolithic Node.js application to a dedicated Spring Boot microservice for user data and consent, driving the transition to a microservices architecture.",
        "Reduced database insert time by 75% and query read time by 50% through strategic partitioning.",
        "Improved 95th percentile API response time by 60% for the order management system through optimized database queries and indexing.",
        "Resolved P0 production issues with hotfixes and optimized database queries for faster API responses.",
        "Initiated weekly team reviews to share work and personal learnings, promoting continuous education and collaboration.",
      ],
      tech: ["Java", "Spring Boot", "Node.js", "PostgreSQL", "Kafka", "Clickhouse"],
    },
    {
      company: "Ather Energy Ltd.",
      role: "Software Engineer",
      period: "Apr. 2022 — Mar. 2024",
      location: "Bengaluru",
      description: "Owned multiple Node/Express applications, deployment workflows, and reliability improvements.",
      highlights: [
        "Optimized Kubernetes node-pool resource utilization, reducing costs.",
        "Designed, tested, and maintained multiple ExpressJS (NodeJS) apps, overseeing deployments and ensuring regression stability.",
        "Implemented real-time sync of PostgreSQL data to OLAP, reducing query load and improving transactional DB performance.",
        "Developed a Python package for migrating data from OLTP to OLAP systems, utilizing Spark and Airflow.",
      ],
      tech: ["Node.js", "Express", "Kubernetes", "PostgreSQL", "Airflow", "PySpark"],
    },
    {
      company: "iAXIS Technology Services Pvt. Ltd.",
      role: "Software and Product Engineer",
      period: "Sep. 2020 — Mar. 2022",
      location: "Bengaluru",
      description: "",
      highlights: [
        "Developed a TOTP-based MFA solution on .NET for Windows applications, enabling online/offline auth for 1,000+ users.",
        "Built a backend pipeline generating custom .msi installers with client logos, available for on-demand download.",
      ],
      tech: [".NET", "C#", "Windows", "Auth"],
    },
  ],
  // Projects
  projects: [
    {
      name: "Band Portfolio - Same as Them",
      role: "Maintainer",
      description: "Band portfolio and web presskit for the band Same as Them, a Bangalore-based Nepali alt-rock band, that I was a part of.",
      link: "https://sameasthem.in",
      stack: ["Astro", "Node"],
    },
    {
      name: "HelpApp",
      role: "Maintainer",
      description: "WiFi Direct based Group Chat and Ledger app built for disaster management.",
      link: "https://github.com/Anirudh-MV/HelpApp",
      stack: ["Kotlin", "Android", "Custom application layer protocol over TCP"],
    },
  ],
  // Skills (flat list keeps things simple to maintain)
  skills: [
    "NodeJS",
    "Kafka",
    "PostgreSQL",
    "Java",
    "Springboot",
    "OOP",
    "ClickHouse",
    "Git",
    "Docker",
    "Kubernetes",
    "Python3",
    "Linux CLI & FS",
    "Problem Solving",
    "AWS",
    "GCP",
    "ESLint",
    "PySpark",
    "ELK",
    "GitLab CI/CD",
  ],
  // Education
  education: [
    {
      school: "Sai Vidya Institute of Technology",
      degree: "Bachelor of Engineering in Computer Science and Engineering",
      period: "Aug. 2016 — Aug. 2020",
      details: "GPA: 7.62",
    },
  ],
} as const

// Metadata derived from resume (edit as needed)
export const metadataForResume: Metadata = {
  title: `${resume.name} — ${resume.title}`,
  description: resume.summary,
  openGraph: {
    title: `${resume.name} — ${resume.title}`,
    description: resume.summary,
    url: "https://anirudhmv.in",
    siteName: resume.name,
    type: "profile",
    images: [{ url: resume.profile.imageSrc }],
  },
  twitter: {
    card: "summary",
    title: `${resume.name} — ${resume.title}`,
    description: resume.summary,
    images: [resume.profile.imageSrc],
  },
}

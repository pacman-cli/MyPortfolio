import React from "react"
import {
  ArrowRightLeft,
  Cloud,
  Code2,
  Database,
  Globe,
  Network,
  Server,
  ShieldCheck,
  Workflow,
  Wrench
} from "lucide-react"
import {
  FaAws, FaDocker, FaGitAlt,
  FaJava, FaPython,
  FaReact
} from "react-icons/fa"
import {
  SiC,
  SiCanva,
  SiCplusplus,
  SiFigma,
  SiGithubactions,
  SiGo,
  SiHibernate,
  SiIntellijidea,
  SiJavascript,
  SiKubernetes,
  SiLinux,
  SiMysql,
  SiNeovim,
  SiNextdotjs,
  SiNotion,
  SiPostgresql,
  SiReactquery,
  SiSpring,
  SiSpringboot,
  SiSpringsecurity,
  SiVercel
} from "react-icons/si"
import { VscVscode } from "react-icons/vsc"

export interface SkillItem {
  name: string
  icon: React.ReactNode
  description?: string
}

export interface SkillCategory {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  color: string // Tailwind color class for accents
  borderColor: string // Explicit border color class
  skills: SkillItem[]
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    subtitle: "Polyglot programming foundation",
    icon: <Code2 className="w-6 h-6" />,
    color: "text-blue-500",
    borderColor: "border-blue-500/50",
    skills: [
      { name: "Java", icon: <FaJava className="text-orange-500" /> },
      { name: "Python", icon: <FaPython className="text-yellow-500" /> },
      { name: "C++", icon: <SiCplusplus className="text-blue-600" /> },
      { name: "C", icon: <SiC className="text-blue-500" /> },
      { name: "Go", icon: <SiGo className="text-cyan-500" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
    ],
  },
  {
    id: "backend",
    title: "Backend Engineering",
    subtitle: "Scalable server-side architectures",
    icon: <Server className="w-6 h-6" />,
    color: "text-emerald-500",
    borderColor: "border-emerald-500/50",
    skills: [
      { name: "Spring Boot", icon: <SiSpringboot className="text-green-500" /> },
      { name: "REST APIs", icon: <Network className="text-purple-500" /> },
      { name: "Spring MVC", icon: <SiSpring className="text-green-600" /> },
      { name: "Spring Data JPA", icon: <Database className="text-gray-400" /> },
      { name: "Spring Security", icon: <SiSpringsecurity className="text-green-700" /> },
      { name: "Microservices", icon: <Workflow className="text-blue-400" /> },
    ],
  },
  {
    id: "database",
    title: "Database Engineering",
    subtitle: "Persistence, integrity & performance",
    icon: <Database className="w-6 h-6" />,
    color: "text-orange-500",
    borderColor: "border-orange-500/50",
    skills: [
      { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" /> },
      { name: "MySQL", icon: <SiMysql className="text-blue-600" /> },
      { name: "Hibernate", icon: <SiHibernate className="text-amber-600" /> },
      { name: "Migrations", icon: <ArrowRightLeft className="text-gray-500" /> },
      { name: "ACID Transactions", icon: <ShieldCheck className="text-green-500" /> },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    subtitle: "Responsive & interactive UIs",
    icon: <Globe className="w-6 h-6" />,
    color: "text-cyan-500",
    borderColor: "border-cyan-500/50",
    skills: [
      { name: "Next.js", icon: <SiNextdotjs className="dark:text-white text-black" /> },
      { name: "React", icon: <FaReact className="text-cyan-400" /> },
      { name: "TanStack Query", icon: <SiReactquery className="text-red-500" /> },
      { name: "API Integration", icon: <Workflow className="text-indigo-400" /> },
      { name: "Client-Server", icon: <ArrowRightLeft className="text-pink-400" /> },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    subtitle: "CI/CD, containers & cloud infra",
    icon: <Cloud className="w-6 h-6" />,
    color: "text-purple-500",
    borderColor: "border-purple-500/50",
    skills: [
      { name: "AWS", icon: <FaAws className="text-orange-500" /> },
      { name: "Docker", icon: <FaDocker className="text-blue-500" /> },
      { name: "Kubernetes", icon: <SiKubernetes className="text-blue-600" /> },
      { name: "GitHub Actions", icon: <SiGithubactions className="text-blue-500" /> },
      { name: "Vercel", icon: <SiVercel className="dark:text-white text-black" /> },
      { name: "Linux", icon: <SiLinux className="text-yellow-500" /> },
    ],
  },
  {
    id: "tools",
    title: "Developer Tools",
    subtitle: "Workflow efficiency & design",
    icon: <Wrench className="w-6 h-6" />,
    color: "text-gray-500",
    borderColor: "border-gray-500/50",
    skills: [
      { name: "VS Code", icon: <VscVscode className="text-blue-500" /> },
      { name: "Neovim", icon: <SiNeovim className="text-green-500" /> },
      { name: "IntelliJ IDEA", icon: <SiIntellijidea className="text-pink-500" /> },
      { name: "Git & GitHub", icon: <FaGitAlt className="text-orange-600" /> },
      { name: "Notion", icon: <SiNotion className="text-black dark:text-white" /> },
      { name: "Figma", icon: <SiFigma className="text-purple-400" /> },
      { name: "Canva", icon: <SiCanva className="text-cyan-500" /> },
    ],
  },
]

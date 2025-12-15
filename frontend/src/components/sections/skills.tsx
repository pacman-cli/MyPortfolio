"use client";

import { useState, useEffect } from 'react';
import { 
    Layout, 
    Github, 
    Server, 
    Database, 
    Code2,
    Globe,
    Cpu
} from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { getGithubRepos, getTechStackFromRepos } from '@/lib/github';

// React Icons
import { 
  FaJava, FaNodeJs, FaReact, FaDocker, FaAws, FaGitAlt 
} from "react-icons/fa";
import { 
  SiSpringboot, SiHibernate, SiNextdotjs, SiTypescript, 
  SiTailwindcss, SiFramer, SiRedux, SiMysql, 
  SiPostgresql, SiRedis, SiMongodb, SiJavascript, 
  SiHtml5, SiCss3, SiPython, SiGo, SiRust 
} from "react-icons/si";
import { BiLogoSpringBoot } from "react-icons/bi";

// Define explicit categories with icons
const SKILL_CATEGORIES = [
  {
    id: 'backend',
    title: "Backend Engineering",
    icon: <Server className="w-6 h-6" />,
    description: "Robust server-side architectures",
    skills: ["Spring Boot", "Java", "Hibernate", "REST APIs", "Microservices", "Node.js"]
  },
  {
    id: 'frontend',
    title: "Frontend Development",
    icon: <Layout className="w-6 h-6" />,
    description: "Responsive & interactive UIs",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux"]
  },
  {
    id: 'database',
    title: "Database & Cloud",
    icon: <Database className="w-6 h-6" />,
    description: "Data persistence & deployment",
    skills: ["MySQL", "PostgreSQL", "Docker", "AWS", "Redis", "MongoDB"]
  }
];

// Helper to map skill names to icons
const getSkillIcon = (skillName: string) => {
    const normalized = skillName.toLowerCase();
    
    if (normalized.includes('spring')) return <SiSpringboot className="w-4 h-4 text-green-500" />;
    if (normalized.includes('java')) return <FaJava className="w-4 h-4 text-orange-500" />;
    if (normalized.includes('hibernate')) return <SiHibernate className="w-4 h-4 text-gray-400 dark:text-gray-300" />;
    if (normalized.includes('rest')) return <Globe className="w-4 h-4 text-blue-400" />;
    if (normalized.includes('microservices')) return <Cpu className="w-4 h-4 text-purple-500" />;
    if (normalized.includes('node')) return <FaNodeJs className="w-4 h-4 text-green-600" />;
    
    if (normalized.includes('next')) return <SiNextdotjs className="w-4 h-4" />;
    if (normalized.includes('react')) return <FaReact className="w-4 h-4 text-cyan-400" />;
    if (normalized.includes('typescript')) return <SiTypescript className="w-4 h-4 text-blue-500" />;
    if (normalized.includes('tailwind')) return <SiTailwindcss className="w-4 h-4 text-cyan-300" />;
    if (normalized.includes('framer')) return <SiFramer className="w-4 h-4 text-purple-400" />;
    if (normalized.includes('redux')) return <SiRedux className="w-4 h-4 text-purple-600" />;
    
    if (normalized.includes('mysql')) return <SiMysql className="w-4 h-4 text-blue-600" />;
    if (normalized.includes('postgres')) return <SiPostgresql className="w-4 h-4 text-blue-400" />;
    if (normalized.includes('docker')) return <FaDocker className="w-4 h-4 text-blue-500" />;
    if (normalized.includes('aws')) return <FaAws className="w-4 h-4 text-yellow-500" />;
    if (normalized.includes('redis')) return <SiRedis className="w-4 h-4 text-red-500" />;
    if (normalized.includes('mongo')) return <SiMongodb className="w-4 h-4 text-green-500" />;

    // Generic fallback for others detected from GitHub
    if (normalized.includes('script') && !normalized.includes('type')) return <SiJavascript className="w-4 h-4 text-yellow-400" />;
    if (normalized.includes('html')) return <SiHtml5 className="w-4 h-4 text-orange-600" />;
    if (normalized.includes('css')) return <SiCss3 className="w-4 h-4 text-blue-500" />;
    if (normalized.includes('python')) return <SiPython className="w-4 h-4 text-blue-400" />;
    if (normalized.includes('go')) return <SiGo className="w-4 h-4 text-cyan-500" />;
    if (normalized.includes('rust')) return <SiRust className="w-4 h-4 text-orange-400" />;
    if (normalized.includes('git')) return <FaGitAlt className="w-4 h-4 text-orange-600" />;

    return <Code2 className="w-4 h-4 text-muted-foreground" />;
};

export const Skills = () => {
  const [githubLanguages, setGithubLanguages] = useState<string[]>([]);

  useEffect(() => {
    getGithubRepos().then(repos => {
        const langs = getTechStackFromRepos(repos);
        setGithubLanguages(langs.slice(0, 8)); // Top 8 detected
    });
  }, []);

  return (
    <section id="skills" className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Expertise</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                A comprehensive overview of my technical proficiency, ranging from robust backend systems to modern frontend interfaces.
            </p>
          </div>
        </Reveal>

        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Manual Categories */}
            {SKILL_CATEGORIES.map((category, index) => (
                <Reveal key={category.id} delay={index * 0.1}>
                    <div className="bg-muted/30 rounded-2xl p-8 border border-border/50 hover:border-blue-500/30 transition-colors group">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {/* Icon & Title */}
                            <div className="flex items-center gap-4 md:w-1/3 w-full">
                                <div className="p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform shadow-sm">
                                    {category.icon}
                                </div>
                                <div className="text-left">
                                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{category.title}</h3>
                                    <p className="text-xs text-muted-foreground">{category.description}</p>
                                </div>
                            </div>
                            
                            {/* Skills List */}
                            <div className="flex-1 flex flex-wrap gap-3 justify-center md:justify-start w-full">
                                {category.skills.map(skill => (
                                    <span 
                                        key={skill}
                                        className="flex items-center gap-2 px-4 py-2 bg-background border rounded-full text-sm font-medium shadow-sm hover:border-primary/50 transition-colors cursor-default whitespace-nowrap"
                                    >
                                        {getSkillIcon(skill)}
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Reveal>
            ))}

            {/* GitHub Detected Languages Strip */}
            <Reveal delay={0.4}>
                <div className="bg-muted/30 rounded-2xl p-8 border border-border/50 hover:border-blue-500/30 transition-colors group">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="flex items-center gap-4 md:w-1/3 w-full">
                            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm text-foreground">
                                <Github className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <h4 className="font-bold text-lg group-hover:text-primary transition-colors">GitHub Detected</h4>
                                <p className="text-xs text-muted-foreground">Languages from my code</p>
                            </div>
                        </div>
                        
                        <div className="flex-1 flex flex-wrap gap-3 justify-center md:justify-start w-full">
                            {githubLanguages.length > 0 ? githubLanguages.map((lang, i) => (
                                <span 
                                    key={lang} 
                                    className="flex items-center gap-2 px-4 py-2 bg-background border rounded-full text-sm font-medium shadow-sm hover:border-primary/50 transition-colors"
                                >
                                    {getSkillIcon(lang)}
                                    {lang}
                                </span>
                            )) : (
                                <span className="text-sm text-muted-foreground italic">Fetching data from GitHub...</span>
                            )}
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
      </div>
    </section>
  );
};

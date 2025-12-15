"use client";

import { useEffect, useState } from 'react';
import { Github, ExternalLink, Star, GitFork, Folder } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Project Type Definition
interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

// Hardcoded Selected Projects
const SELECTED_PROJECTS: Project[] = [
  {
    title: "Expense Tracker",
    description: "Track daily expenses efficiently with detailed analytics and categorization. Features a robust backend and intuitive frontend for seamless financial monitoring.",
    techStack: ["Next.js", "Spring Boot", "MySQL"],
    githubUrl: "https://github.com/pacman-cli/expense-tracker",
    // demoUrl: "", // Skipped as per request
  },
  {
    title: "TakaTrack",
    description: "A comprehensive personal finance management web application. empowering users to track income, expenses, and savings goals with real-time visualizations.",
    techStack: ["Next.js", "Spring Boot", "MySQL"],
    // githubUrl: "", // Skipped as per request
    demoUrl: "https://www.takatrack.puspo.online/",
    featured: true
  },
  {
    title: "Java Learning",
    description: "A comprehensive repository of Java learning projects, exercises, and examples. Covers core concepts, algorithms, and advanced object-oriented programming patterns.",
    techStack: ["Java", "OOP", "Algorithms"],
    githubUrl: "https://github.com/pacman-cli/Java-Learning",
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div className="container mx-auto px-6">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              A curated selection of my key projects, demonstrating full-stack capabilities and continuous learning.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {SELECTED_PROJECTS.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.1}>
              <Card hoverEffect className="h-full flex flex-col justify-between p-6 group border-t-4 border-t-transparent hover:border-t-primary transition-all">
                <div>
                    <div className="flex items-center justify-between mb-6">
                         <div className={`p-3 rounded-xl ${project.featured ? 'bg-primary/20 text-primary' : 'bg-secondary/50 text-muted-foreground'} group-hover:scale-110 transition-transform`}>
                            <Folder className="w-6 h-6" />
                         </div>
                         {/* Placeholder for stats if we want to fetch them later, for now just decorative dots/icons could go here logic */}
                    </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto">
                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.map(tech => (
                             <span key={tech} className="text-xs px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full font-medium border border-transparent group-hover:border-primary/20 transition-colors">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-border/50">
                        {project.githubUrl && (
                            <Button size="sm" variant="outline" className="flex-1" asChild>
                                <Link href={project.githubUrl} target="_blank">
                                    <Github className="w-4 h-4 mr-2" /> Code
                                </Link>
                            </Button>
                        )}
                        {project.demoUrl && (
                            <Button size="sm" className="flex-1" asChild>
                                <Link href={project.demoUrl} target="_blank">
                                    <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                                </Link>
                            </Button>
                        )}
                        {/* If only one button exists, make it full width (flex-1 handles this in flex container? No, usually buttons don't grow unless set. Added flex-1) */}
                    </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

"use client";

import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Reveal } from '@/components/ui/reveal';

const experienceData = [
  {
    type: 'work',
    role: 'Software Developer Intern',
    company: 'XYZ Company',
    period: 'June 2024 – Aug 2024',
    description: 'Worked on backend APIs using Spring Boot, integrated MySQL database, improved performance by 20%.',
    icon: <Briefcase className="w-5 h-5" />,
    skills: ['Spring Boot', 'MySQL', 'API']
  },
  {
    type: 'education',
    role: 'B.Sc. in Computer Science & Engineering',
    company: 'United International University',
    period: '2022 – Present',
    description: 'Focused on full-stack development, algorithms, and system design. Active in tech communities.',
    icon: <GraduationCap className="w-5 h-5" />,
    skills: ['Algorithms', 'System Design']
  }
];

export const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-background/50">
      <div className="container mx-auto px-6">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience & Education</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              My professional journey and skills development.
            </p>
          </div>
        </Reveal>

        <div className="max-w-3xl mx-auto space-y-8">
          {experienceData.map((item, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <Card className="group p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start border-border/50 hover:shadow-lg transition-all duration-300 hover:border-primary/20 bg-card/40 backdrop-blur-sm">
                
                {/* Icon Box */}
                <div className={`
                  shrink-0 p-4 rounded-2xl flex items-center justify-center transition-colors duration-300
                  ${item.type === 'work' ? 'bg-blue-500/10 text-blue-600 group-hover:bg-blue-500/20' : 'bg-purple-500/10 text-purple-600 group-hover:bg-purple-500/20'}
                `}>
                  {item.icon}
                </div>

                {/* Content */}
                <div className="flex-1 w-full">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.role}
                      </h3>
                      <p className="text-base font-medium text-muted-foreground">
                        {item.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full w-fit">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <span key={skill} className="text-xs font-medium px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border/50">
                        {skill}
                      </span>
                    ))}
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

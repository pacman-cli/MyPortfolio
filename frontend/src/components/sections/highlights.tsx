"use client";

import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Palette, Rocket } from 'lucide-react';

const highlights = [
  {
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    title: "Fast & Scalable",
    description: "Optimized for speed and high performance."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    title: "Secure Backends",
    description: "Robust security practices with Spring Security."
  },
  {
    icon: <Palette className="w-6 h-6 text-purple-500" />,
    title: "Modern UI/UX",
    description: "Beautiful, responsive interfaces with Tailwind."
  },
  {
    icon: <Rocket className="w-6 h-6 text-red-500" />,
    title: "Production Ready",
    description: "Clean code structure and best practices."
  }
];

export const Highlights = () => {
    return (
        <section className="py-12 bg-muted/30 border-y border-border/50">
            <div className="container px-6 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {highlights.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 transition-all group"
                        >
                            <div className="bg-background w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 transition-colors dark:group-hover:text-green-400">
                                {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

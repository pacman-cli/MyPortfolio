"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo / Branding */}
        <Link href="/" className="group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}>
                <div className="flex items-center gap-2">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                        <path d="M20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0Z" fill="url(#paint0_linear)" fillOpacity="0.1"/>
                        <path d="M14 11H22C25.3137 11 28 13.6863 28 17C28 20.3137 25.3137 23 22 23H18V29H14V11Z" fill="url(#paint1_linear)"/>
                        <defs>
                            <linearGradient id="paint0_linear" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#2563EB"/>
                                <stop offset="1" stopColor="#06B6D4"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear" x1="14" y1="11" x2="28" y2="29" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#2563EB"/>
                                <stop offset="1" stopColor="#06B6D4"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    <span className="sr-only">Home</span>
                </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
             <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                onClick={(e) => {
                    if (link.href.startsWith('#')) {
                        e.preventDefault();
                        const element = document.querySelector(link.href);
                        element?.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
             >
                {link.name}
             </Link>
          ))}
          <button 
             onClick={() => {
                 document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
             }}
             className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 hover:bg-green-500/20 transition-colors border border-green-500/20 group"
             title="I am currently open for work opportunities"
          >
             <span className="relative flex h-2 w-2">
               <motion.span 
                 animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                 className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF7F] opacity-75"
               />
               <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF7F]"></span>
             </span>
             <span className="text-xs md:text-sm font-semibold text-[#00FF7F] whitespace-nowrap">
               Open for Work
             </span>
          </button>
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-800" />
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
            <button 
                 onClick={() => {
                     document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                 }}
                 className="flex items-center gap-2 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20"
            >
             <span className="relative flex h-1.5 w-1.5">
               <motion.span 
                 animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="absolute inline-flex h-full w-full rounded-full bg-[#00FF7F] opacity-75"
               />
               <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00FF7F]"></span>
             </span>
             <span className="text-[10px] font-semibold text-[#00FF7F] whitespace-nowrap">
               Open for Work
             </span>
            </button>
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-gray-900 dark:text-gray-100 py-2 border-b border-gray-100 dark:border-gray-800/50 last:border-0"
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    if (link.href.startsWith('#')) {
                        e.preventDefault();
                        const element = document.querySelector(link.href);
                        element?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

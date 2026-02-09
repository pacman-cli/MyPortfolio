"use client"

import { Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import { SiX } from "react-icons/si"

export const Footer = () => {
  return (
    <footer className="py-8 bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-gray-600 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} <span className="font-bold text-gray-900 dark:text-white">MD. Ashikur Rahman</span>. All rights reserved.
        </div>

        <div className="flex items-center gap-6">
          <Link href="https://github.com/pacman-cli" target="_blank" className="text-gray-500 hover:text-primary transition-colors">
            <Github className="w-5 h-5" />
          </Link>
          <Link href="https://www.linkedin.com/in/iampuspo/" target="_blank" className="text-gray-500 hover:text-primary transition-colors">
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link href="https://x.com/iam_puspo" target="_blank" className="text-gray-500 hover:text-primary transition-colors">
            <SiX className="w-4 h-4" />
          </Link>
          <Link href="mailto:puspopuspo520@gmail.com" className="text-gray-500 hover:text-primary transition-colors">
            <Mail className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer >
  )
}

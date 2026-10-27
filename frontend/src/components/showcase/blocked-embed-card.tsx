'use client'

import React from 'react'
import type { ShowcaseProject } from '@/data/showcase-projects'
import {
  ExternalLink,
  ShieldCheck,
  Search,
  BookOpen,
  Home,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Code2,
  Check,
  Star,
  Users,
} from 'lucide-react'

// --- DevForge Developer Workstation Preview ---
const DevForgePreview: React.FC<{ project: ShowcaseProject }> = ({ project }) => {
  return (
    <div className="w-full h-full p-2.5 sm:p-3 flex flex-col justify-between bg-zinc-950 text-zinc-100 font-sans select-none overflow-hidden">
      {/* DevForge Top Navigation */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
            DF
          </div>
          <span className="text-xs font-semibold tracking-tight text-zinc-200">
            DevForge Studio
          </span>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 hidden sm:inline-block">
            v1.4
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            0ms Latency
          </span>
        </div>
      </div>

      {/* Editor & Tool Workspace */}
      <div className="flex-1 grid grid-cols-12 gap-2 text-[10px] overflow-hidden">
        {/* Left: Tools Palette */}
        <div className="col-span-4 border-r border-zinc-800/80 pr-1.5 space-y-1 hidden sm:block">
          <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
            Utilities
          </div>
          {[
            { name: 'JSON Formatter', active: true },
            { name: 'JWT Inspector', active: false },
            { name: 'UUID Gen', active: false },
            { name: 'Regex Tester', active: false },
          ].map((item) => (
            <div
              key={item.name}
              className={`px-2 py-1 rounded text-[10px] font-mono truncate flex items-center justify-between ${
                item.active
                  ? 'bg-emerald-500/15 text-emerald-300 font-medium'
                  : 'text-zinc-400 hover:bg-zinc-900'
              }`}
            >
              <span className="truncate">{item.name}</span>
              {item.active && <Check className="w-2.5 h-2.5 text-emerald-400 shrink-0" />}
            </div>
          ))}
        </div>

        {/* Right: Code Editor Mockup */}
        <div className="col-span-12 sm:col-span-8 flex flex-col justify-between bg-zinc-900/90 rounded-lg p-2 border border-zinc-800 font-mono text-[9px] sm:text-[10px]">
          <div className="space-y-0.5 leading-relaxed text-zinc-300">
            <div className="text-zinc-500">{`// Formatted JSON Output`}</div>
            <div>
              <span className="text-rose-400">{'{'}</span>
            </div>
            <div className="pl-2">
              <span className="text-cyan-400">&quot;status&quot;</span>: <span className="text-amber-300">&quot;healthy&quot;</span>,
            </div>
            <div className="pl-2">
              <span className="text-cyan-400">&quot;mode&quot;</span>: <span className="text-emerald-400">&quot;zero-server-roundtrip&quot;</span>,
            </div>
            <div className="pl-2">
              <span className="text-cyan-400">&quot;utilities&quot;</span>: [<span className="text-amber-300">&quot;JWT&quot;</span>, <span className="text-amber-300">&quot;UUID&quot;</span>, <span className="text-amber-300">&quot;Regex&quot;</span>]
            </div>
            <div>
              <span className="text-rose-400">{'}'}</span>
            </div>
          </div>

          <div className="mt-1 pt-1 border-t border-zinc-800/80 flex items-center justify-between text-[9px] text-zinc-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" /> Valid JSON
            </span>
            <span className="font-mono text-zinc-500">UTF-8 • 64 bytes</span>
          </div>
        </div>
      </div>

      {/* Footer launch action */}
      <div className="pt-2 border-t border-zinc-800/80 mt-1 flex items-center justify-between text-[10px]">
        <span className="text-zinc-400 font-mono flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-amber-400" />
          <span>Embed Protected by Host</span>
        </span>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-500 text-zinc-950 font-semibold text-[10px] hover:bg-emerald-400 transition-colors"
          aria-label={`Launch ${project.shortTitle} in a new tab`}
        >
          <span>Open Full DevForge</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </div>
  )
}

// --- StayMate Rental & Roommate Platform Preview ---
const StayMatePreview: React.FC<{ project: ShowcaseProject }> = ({ project }) => {
  return (
    <div className="w-full h-full p-2.5 sm:p-3 flex flex-col justify-between bg-zinc-950 text-zinc-100 font-sans select-none overflow-hidden">
      {/* Header & Search */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Home className="w-3 h-3" />
          </div>
          <span className="text-xs font-semibold tracking-tight text-zinc-200">
            StayMate
          </span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[9px] text-zinc-400">
          <Search className="w-2.5 h-2.5 text-zinc-500" />
          <span>Mirpur, Dhaka • $200-$400</span>
        </div>
      </div>

      {/* Listing Cards Grid */}
      <div className="flex-1 grid grid-cols-2 gap-2 text-[10px] overflow-hidden">
        {/* Listing Card 1 */}
        <div className="rounded-lg bg-zinc-900/90 border border-zinc-800 p-2 flex flex-col justify-between">
          <div>
            <div className="h-10 rounded bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-800/30 mb-1.5 flex items-center justify-center text-[9px] font-mono text-blue-300">
              Master Bed w/ Balcony
            </div>
            <div className="font-semibold text-zinc-200 truncate text-[11px]">
              Sublet Room in Sector 11
            </div>
            <div className="flex items-center gap-1 text-[9px] text-zinc-400 mt-0.5">
              <span className="text-emerald-400 font-medium">98% Match</span>
              <span>•</span>
              <span>Verified Host</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-zinc-800/60 mt-1">
            <span className="font-mono font-semibold text-zinc-200">$220/mo</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-mono">
              Furnished
            </span>
          </div>
        </div>

        {/* Listing Card 2 */}
        <div className="rounded-lg bg-zinc-900/90 border border-zinc-800 p-2 flex flex-col justify-between">
          <div>
            <div className="h-10 rounded bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-800/30 mb-1.5 flex items-center justify-center text-[9px] font-mono text-emerald-300">
              Cozy Studio Flat
            </div>
            <div className="font-semibold text-zinc-200 truncate text-[11px]">
              Shared Apartment Floor
            </div>
            <div className="flex items-center gap-1 text-[9px] text-zinc-400 mt-0.5">
              <span className="text-emerald-400 font-medium">94% Match</span>
              <span>•</span>
              <span>Student Friendly</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-zinc-800/60 mt-1">
            <span className="font-mono font-semibold text-zinc-200">$180/mo</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">
              Attached Bath
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-zinc-800/80 mt-1 flex items-center justify-between text-[10px]">
        <span className="text-zinc-400 font-mono flex items-center gap-1">
          <Users className="w-3 h-3 text-blue-400" />
          <span>Roommate Compatibility AI</span>
        </span>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-blue-500 text-zinc-950 font-semibold text-[10px] hover:bg-blue-400 transition-colors"
          aria-label={`Launch ${project.shortTitle} in a new tab`}
        >
          <span>Explore StayMate</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </div>
  )
}

// --- Expense Tracker / TakaTrack Dashboard Preview ---
const ExpenseTrackerPreview: React.FC<{ project: ShowcaseProject }> = ({ project }) => {
  return (
    <div className="w-full h-full p-2.5 sm:p-3 flex flex-col justify-between bg-zinc-950 text-zinc-100 font-sans select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
            $
          </div>
          <span className="text-xs font-semibold tracking-tight text-zinc-200">
            TakaTrack
          </span>
          <span className="text-[9px] font-mono text-zinc-500 hidden sm:inline">
            Personal Finance
          </span>
        </div>
        <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-400">
          <TrendingUp className="w-3 h-3" />
          <span>+14.2% Savings Rate</span>
        </div>
      </div>

      {/* Financial Overview Metrics */}
      <div className="flex-1 space-y-2 text-[10px] overflow-hidden">
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
            <span className="text-[9px] text-zinc-500 uppercase font-mono block">
              Total Balance
            </span>
            <div className="text-sm font-mono font-bold text-zinc-100 mt-0.5">
              $14,850.00
            </div>
          </div>
          <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
            <span className="text-[9px] text-zinc-500 uppercase font-mono block">
              October Spending
            </span>
            <div className="text-sm font-mono font-bold text-rose-400 mt-0.5">
              $2,140.50
            </div>
          </div>
        </div>

        {/* Savings Goal Bar */}
        <div className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800/80">
          <div className="flex items-center justify-between text-[9px] font-mono mb-1">
            <span className="text-zinc-300">Savings Target: Emergency Fund</span>
            <span className="text-emerald-400 font-semibold">82% ($8,200 / $10,000)</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-[82%]" />
          </div>
        </div>

        {/* Categories Breakdown */}
        <div className="flex items-center gap-1.5 pt-0.5 font-mono text-[9px]">
          <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
            Housing 42%
          </span>
          <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
            Food 28%
          </span>
          <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
            Cloud 18%
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-zinc-800/80 mt-1 flex items-center justify-between text-[10px]">
        <span className="text-zinc-400 font-mono flex items-center gap-1">
          <DollarSign className="w-3 h-3 text-emerald-400" />
          <span>Real-time Sync</span>
        </span>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-500 text-zinc-950 font-semibold text-[10px] hover:bg-emerald-400 transition-colors"
          aria-label={`Launch ${project.shortTitle} in a new tab`}
        >
          <span>Open Finance App</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </div>
  )
}

// --- Shelf to Tales Community Bookstore Preview ---
const ShelfToTalesPreview: React.FC<{ project: ShowcaseProject }> = ({ project }) => {
  return (
    <div className="w-full h-full p-2.5 sm:p-3 flex flex-col justify-between bg-zinc-950 text-zinc-100 font-sans select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <BookOpen className="w-3 h-3" />
          </div>
          <span className="text-xs font-semibold tracking-tight text-zinc-200">
            ShelfToTales
          </span>
          <span className="text-[9px] font-mono text-zinc-500 hidden sm:inline">
            Community Books
          </span>
        </div>
        <div className="flex items-center gap-1 text-[9px] font-mono text-amber-400">
          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
          <span>Community Choice</span>
        </div>
      </div>

      {/* Book Covers Showcase */}
      <div className="flex-1 grid grid-cols-3 gap-2 text-[10px] overflow-hidden">
        {[
          {
            title: 'Designing Systems',
            author: 'M. Kleppmann',
            tag: 'Architecture',
            gradient: 'from-amber-600/30 to-orange-700/30 border-amber-600/40',
            rating: '4.9',
          },
          {
            title: 'Clean Codecraft',
            author: 'R. Martin',
            tag: 'Software',
            gradient: 'from-purple-600/30 to-indigo-700/30 border-purple-600/40',
            rating: '4.8',
          },
          {
            title: 'Pragmatic Dev',
            author: 'D. Thomas',
            tag: 'Engineering',
            gradient: 'from-emerald-600/30 to-teal-700/30 border-emerald-600/40',
            rating: '4.9',
          },
        ].map((book) => (
          <div
            key={book.title}
            className={`p-1.5 rounded-lg bg-gradient-to-b ${book.gradient} border flex flex-col justify-between`}
          >
            <div>
              <div className="text-[8px] font-mono uppercase text-zinc-400 tracking-wider">
                {book.tag}
              </div>
              <div className="font-semibold text-zinc-100 text-[10px] leading-tight line-clamp-2 mt-0.5">
                {book.title}
              </div>
            </div>
            <div className="pt-1 mt-1 border-t border-zinc-800/40 flex items-center justify-between text-[8px] text-zinc-400">
              <span className="truncate">{book.author}</span>
              <span className="text-amber-400 font-mono">★ {book.rating}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-zinc-800/80 mt-1 flex items-center justify-between text-[10px]">
        <span className="text-zinc-400 font-mono flex items-center gap-1">
          <Code2 className="w-3 h-3 text-amber-400" />
          <span>2,400+ Readers Active</span>
        </span>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-amber-500 text-zinc-950 font-semibold text-[10px] hover:bg-amber-400 transition-colors"
          aria-label={`Launch ${project.shortTitle} in a new tab`}
        >
          <span>Visit Bookstore</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </div>
  )
}

// --- Main BlockedEmbedCard Router ---
export const BlockedEmbedCard: React.FC<{ project: ShowcaseProject }> = ({
  project,
}) => {
  switch (project.id) {
    case 'devforge':
      return <DevForgePreview project={project} />
    case 'stay-mate':
      return <StayMatePreview project={project} />
    case 'expense-tracker':
      return <ExpenseTrackerPreview project={project} />
    case 'shelf-to-tales':
      return <ShelfToTalesPreview project={project} />
    default:
      return <DevForgePreview project={project} />
  }
}

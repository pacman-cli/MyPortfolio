'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  CreditCard,
  Cpu,
  Server,
  Rocket,
  Terminal,
  Sparkles,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AIResourceItem, ResourceCategory } from '@/data/ai-resources'

interface ResourceCardProps {
  resource: AIResourceItem
}

const CATEGORY_STYLES: Record<
  Exclude<ResourceCategory, 'all'>,
  {
    label: string
    badgeClasses: string
    icon: React.ComponentType<{ className?: string }>
  }
> = {
  'llm-apis': {
    label: 'Free LLM APIs',
    badgeClasses:
      'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    icon: Cpu,
  },
  'gpu-compute': {
    label: 'GPU Compute',
    badgeClasses:
      'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    icon: Server,
  },
  'programs-startups': {
    label: 'Student & Startup',
    badgeClasses:
      'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    icon: Rocket,
  },
  'coding-assistants': {
    label: 'Coding Assistant',
    badgeClasses:
      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    icon: Terminal,
  },
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const categoryMeta =
    resource.category !== 'all'
      ? CATEGORY_STYLES[resource.category]
      : {
          label: 'AI Resource',
          badgeClasses:
            'bg-muted text-muted-foreground border-border',
          icon: Sparkles,
        }

  const CategoryIcon = categoryMeta.icon

  return (
    <div
      data-testid={`resource-card-${resource.id}`}
      className="group relative flex flex-col justify-between rounded-xl border border-border/70 bg-card/60 p-5 shadow-xs hover:border-foreground/30 hover:shadow-md transition-all duration-200"
    >
      <div>
        {/* Card Header: Category Badge & No CC Tag */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border',
              categoryMeta.badgeClasses
            )}
          >
            <CategoryIcon className="w-3 h-3 shrink-0" />
            <span>{categoryMeta.label}</span>
          </span>

          {resource.noCreditCard && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
              title="No credit card required for signup"
            >
              <CreditCard className="w-2.5 h-2.5 shrink-0" />
              <span>No CC</span>
            </span>
          )}
        </div>

        {/* Resource Title */}
        <h3 className="text-base font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1.5">
          {resource.name}
        </h3>

        {/* Summary */}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3.5">
          {resource.summary}
        </p>

        {/* Key Perks / Allocation Box */}
        <div className="rounded-lg bg-muted/40 border border-border/60 p-2.5 text-xs space-y-2 mb-3.5">
          <div className="flex items-start gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold text-foreground text-[11px] block mb-0.5">
                Free Tier Allocation:
              </span>
              <span className="text-[11px] text-muted-foreground leading-normal line-clamp-2">
                {resource.freeTierDetails}
              </span>
            </div>
          </div>

          {/* Models Highlight if present */}
          {resource.models && resource.models.length > 0 && (
            <div className="pt-1.5 border-t border-border/40 flex flex-wrap items-center gap-1">
              <span className="text-[10px] font-mono text-muted-foreground font-semibold">
                Models:
              </span>
              {resource.models.slice(0, 3).map((model) => (
                <span
                  key={model}
                  className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-background/80 text-foreground border border-border/60"
                >
                  {model}
                </span>
              ))}
              {resource.models.length > 3 && (
                <span className="text-[10px] font-mono text-muted-foreground">
                  +{resource.models.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Benefits Highlight if present and no models */}
          {(!resource.models || resource.models.length === 0) &&
            resource.benefits &&
            resource.benefits.length > 0 && (
              <div className="pt-1.5 border-t border-border/40 space-y-1">
                <span className="text-[10px] font-mono text-muted-foreground font-semibold block">
                  Top Benefits:
                </span>
                <ul className="text-[11px] text-muted-foreground space-y-0.5">
                  {resource.benefits.slice(0, 2).map((b, idx) => (
                    <li key={idx} className="line-clamp-1 flex items-start gap-1">
                      <span className="text-emerald-500 font-bold">&bull;</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Hardware Highlight for GPU compute */}
          {resource.hardware && resource.hardware.length > 0 && (
            <div className="pt-1.5 border-t border-border/40 flex flex-wrap items-center gap-1">
              <span className="text-[10px] font-mono text-muted-foreground font-semibold">
                Hardware:
              </span>
              <span className="text-[10px] font-mono text-foreground">
                {resource.hardware.slice(0, 3).join(', ')}
              </span>
            </div>
          )}

          {/* Supported IDEs for Coding Assistants */}
          {resource.supportedIdes && resource.supportedIdes.length > 0 && (
            <div className="pt-1.5 border-t border-border/40 flex flex-wrap items-center gap-1">
              <span className="text-[10px] font-mono text-muted-foreground font-semibold">
                IDEs:
              </span>
              <span className="text-[10px] font-mono text-foreground">
                {resource.supportedIdes.slice(0, 3).join(', ')}
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {resource.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted/60 text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
          {resource.tags.length > 4 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-muted-foreground">
              +{resource.tags.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Access / Claim External Button */}
      <Link
        href={resource.signupUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 text-xs font-semibold rounded-lg bg-secondary hover:bg-foreground hover:text-background text-foreground transition-all duration-200 border border-border/80 group-hover:border-foreground/30 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`Access or claim free tier for ${resource.name}`}
      >
        <span>Access / Claim</span>
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  )
}

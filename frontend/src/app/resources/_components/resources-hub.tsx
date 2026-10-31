'use client'

import React, { useState, useMemo, useCallback } from 'react'
import {
  Search,
  X,
  CreditCard,
  RotateCcw,
  Sparkles,
  Cpu,
  Server,
  Rocket,
  Terminal,
  Filter,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AIResourceItem, ResourceCategory } from '@/data/ai-resources'
import { ResourceCard } from './resource-card'

interface ResourcesHubProps {
  initialResources: AIResourceItem[]
}

interface CategoryTab {
  id: ResourceCategory
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const CATEGORY_TABS: CategoryTab[] = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'llm-apis', label: 'Free LLM APIs', icon: Cpu },
  { id: 'gpu-compute', label: 'GPU Compute', icon: Server },
  { id: 'programs-startups', label: 'Student & Startup Programs', icon: Rocket },
  { id: 'coding-assistants', label: 'Coding Assistants', icon: Terminal },
]

export const ResourcesHub: React.FC<ResourcesHubProps> = ({
  initialResources,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('all')
  const [onlyNoCreditCard, setOnlyNoCreditCard] = useState(false)

  // Filtered resources based on search, category tab, and No CC toggle
  const filteredResources = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return initialResources.filter((item) => {
      // 1. Category check
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false
      }

      // 2. No credit card check
      if (onlyNoCreditCard && !item.noCreditCard) {
        return false
      }

      // 3. Search query check
      if (!query) {
        return true
      }

      // Filter by name
      if (item.name.toLowerCase().includes(query)) return true

      // Filter by summary
      if (item.summary.toLowerCase().includes(query)) return true

      // Filter by tags
      if (item.tags.some((tag) => tag.toLowerCase().includes(query))) return true

      // Filter by models
      if (item.models && item.models.some((m) => m.toLowerCase().includes(query))) {
        return true
      }

      // Filter by benefits
      if (
        item.benefits &&
        item.benefits.some((b) => b.toLowerCase().includes(query))
      ) {
        return true
      }

      // Filter by hardware
      if (
        item.hardware &&
        item.hardware.some((h) => h.toLowerCase().includes(query))
      ) {
        return true
      }

      // Filter by freeTierDetails
      if (item.freeTierDetails.toLowerCase().includes(query)) return true

      // Filter by bestUseCases
      if (item.bestUseCases.toLowerCase().includes(query)) return true

      return false
    })
  }, [initialResources, searchQuery, selectedCategory, onlyNoCreditCard])

  // Count items per category (honoring the noCreditCard filter)
  const categoryCounts = useMemo(() => {
    const counts: Record<ResourceCategory, number> = {
      all: 0,
      'llm-apis': 0,
      'gpu-compute': 0,
      'programs-startups': 0,
      'coding-assistants': 0,
    }

    initialResources.forEach((item) => {
      if (onlyNoCreditCard && !item.noCreditCard) return
      counts.all += 1
      if (item.category in counts) {
        counts[item.category] += 1
      }
    })

    return counts
  }, [initialResources, onlyNoCreditCard])

  // Reset all filters callback
  const handleResetFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedCategory('all')
    setOnlyNoCreditCard(false)
  }, [])

  const isFilterActive =
    searchQuery.trim().length > 0 ||
    selectedCategory !== 'all' ||
    onlyNoCreditCard

  return (
    <div className="space-y-8">
      {/* Search & Filter Control Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Instant Search Input */}
          <div className="relative flex-1">
            <label htmlFor="resource-search" className="sr-only">
              Search free developer resources
            </label>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="resource-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, summary, tags, models, benefits..."
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-card border border-border/80 rounded-xl placeholder:text-muted-foreground/70 focus:outline-hidden focus:ring-2 focus:ring-foreground/20 focus:border-foreground/40 transition-colors shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle: No Credit Card Required */}
          <button
            type="button"
            onClick={() => setOnlyNoCreditCard((prev) => !prev)}
            aria-pressed={onlyNoCreditCard}
            className={cn(
              'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 select-none shrink-0 shadow-2xs',
              onlyNoCreditCard
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-bold ring-1 ring-emerald-500/30'
                : 'bg-card border-border/80 text-muted-foreground hover:text-foreground hover:border-foreground/30'
            )}
          >
            <CreditCard
              className={cn(
                'w-4 h-4 transition-colors',
                onlyNoCreditCard
                  ? 'text-emerald-500'
                  : 'text-muted-foreground'
              )}
            />
            <span>No Credit Card Required</span>
            {onlyNoCreditCard && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
            )}
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon
            const isSelected = selectedCategory === tab.id
            const count = categoryCounts[tab.id]

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={cn(
                  'inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap border shrink-0',
                  isSelected
                    ? 'bg-foreground text-background font-semibold border-foreground shadow-xs'
                    : 'bg-card/70 border-border/60 text-muted-foreground hover:text-foreground hover:border-border'
                )}
                aria-pressed={isSelected}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
                <span
                  className={cn(
                    'text-[10px] font-mono px-1.5 py-0.2 rounded-full',
                    isSelected
                      ? 'bg-background/20 text-background'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Results Counter & Status Row */}
      <div className="flex items-center justify-between border-b border-border/80 pb-3 pt-1">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-mono font-medium text-foreground">
            {isFilterActive
              ? `Showing ${filteredResources.length} of ${initialResources.length} resources`
              : `Showing ${filteredResources.length} resources`}
          </span>
        </div>

        {isFilterActive && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Responsive Cards Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        /* Empty State with Reset Button */
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-border bg-card/30 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-4">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1">
            No resources match your filters
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm mb-6 leading-relaxed">
            We couldn&apos;t find any resources matching your search query &ldquo;
            {searchQuery}&rdquo; with the selected filters.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-foreground text-background hover:opacity-90 transition-opacity"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  )
}

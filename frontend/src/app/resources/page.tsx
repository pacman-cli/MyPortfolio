import type { Metadata } from 'next'
import { BreadcrumbSchema, JsonLd } from '@/components/seo/json-ld'
import { Footer } from '@/components/footer'
import { absoluteUrl, siteConfig } from '@/lib/site'
import { constructMetadata } from '@/lib/seo'
import { AI_RESOURCES } from '@/data/ai-resources'
import { ResourcesHub } from './_components/resources-hub'
import {
  Sparkles,
  Cpu,
  Server,
  CreditCard,
  Layers,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = constructMetadata({
  title: 'Free AI Developer Resources & APIs (2025-2026 Guide) | MD Ashikur Rahman Puspo',
  description:
    'A curated directory of 95+ free LLM APIs, GPU compute, cloud credits, vector databases, startup programs, and AI coding assistants to build products for $0.',
  url: absoluteUrl('/resources'),
})

export default function ResourcesPage() {
  const totalCount = AI_RESOURCES.length
  const llmCount = AI_RESOURCES.filter((r) => r.category === 'llm-apis').length
  const gpuCount = AI_RESOURCES.filter((r) => r.category === 'gpu-compute').length
  const noCcCount = AI_RESOURCES.filter((r) => r.noCreditCard).length

  const resourcesPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl('/resources')}#webpage`,
    url: absoluteUrl('/resources'),
    name: 'Free AI Developer Resources & APIs | MD Ashikur Rahman Puspo',
    description:
      'Curated directory of 95+ free LLM APIs, GPU compute, cloud credits, vector databases, startup programs, and AI coding assistants by MD Ashikur Rahman Puspo.',
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    about: { '@id': `${siteConfig.url}/#person` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: totalCount,
      itemListElement: AI_RESOURCES.slice(0, 30).map((resource, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: resource.name,
        description: resource.summary,
        url: resource.signupUrl,
      })),
    },
  }

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-16">
      <JsonLd data={resourcesPageJsonLd} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Resources', item: '/resources' },
        ]}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Page Header */}
        <header className="border-b border-border/80 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-muted text-muted-foreground mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Curated 2025–2026 Developer Directory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Free AI Developer Resources &amp; APIs
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground mt-3 max-w-3xl leading-relaxed">
            A comprehensive, verified catalog of 95+ free LLM inference providers, GPU compute hours, startup and student grants, and AI coding assistants to build, experiment, and deploy production software for $0.
          </p>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-border/50 text-xs">
            <div className="p-3 rounded-xl bg-card/60 border border-border/60">
              <span className="text-muted-foreground block text-[11px] font-mono">
                Total Resources
              </span>
              <span className="text-lg font-bold text-foreground">
                {totalCount}+ Tools
              </span>
            </div>

            <div className="p-3 rounded-xl bg-card/60 border border-border/60">
              <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] font-mono">
                <Cpu className="w-3 h-3 text-purple-500" />
                <span>Free LLM APIs</span>
              </div>
              <span className="text-lg font-bold text-foreground">
                {llmCount} Providers
              </span>
            </div>

            <div className="p-3 rounded-xl bg-card/60 border border-border/60">
              <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] font-mono">
                <Server className="w-3 h-3 text-amber-500" />
                <span>GPU Compute</span>
              </div>
              <span className="text-lg font-bold text-foreground">
                {gpuCount} Platforms
              </span>
            </div>

            <div className="p-3 rounded-xl bg-card/60 border border-border/60">
              <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] font-mono">
                <CreditCard className="w-3 h-3 text-emerald-500" />
                <span>No CC Needed</span>
              </div>
              <span className="text-lg font-bold text-foreground">
                {noCcCount} Available
              </span>
            </div>
          </div>
        </header>

        {/* Client-Side Interactive Hub */}
        <section aria-label="Interactive Resources Filter and Catalog">
          <ResourcesHub initialResources={AI_RESOURCES} />
        </section>

        {/* Production $0 AI Stack Architecture Guide */}
        <section className="mt-16 pt-10 border-t border-border/80">
          <div className="p-6 rounded-2xl border border-border/80 bg-card/40">
            <div className="flex items-center gap-2.5 mb-3">
              <Layers className="w-5 h-5 text-emerald-500" />
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                The Zero-Dollar Production AI Stack
              </h2>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl mb-4">
              By combining these free tiers, developers can engineer and host production-grade AI platforms with zero upfront capital:
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-background/60 border border-border/60">
                <span className="font-semibold text-foreground block mb-1">
                  1. Edge &amp; UI
                </span>
                <span className="text-muted-foreground leading-normal block">
                  Cloudflare Workers &amp; Pages or Vercel for zero-cold-start globally distributed delivery.
                </span>
              </div>

              <div className="p-3 rounded-lg bg-background/60 border border-border/60">
                <span className="font-semibold text-foreground block mb-1">
                  2. LLM Inference
                </span>
                <span className="text-muted-foreground leading-normal block">
                  Google Gemini 2.0 Flash (1,500 RPD free) or Groq Cloud (ultra-fast Llama 3.3).
                </span>
              </div>

              <div className="p-3 rounded-lg bg-background/60 border border-border/60">
                <span className="font-semibold text-foreground block mb-1">
                  3. Vector &amp; DB
                </span>
                <span className="text-muted-foreground leading-normal block">
                  Neon Postgres with pgvector (0.5 GiB free) or Pinecone Serverless (2 GB free index).
                </span>
              </div>

              <div className="p-3 rounded-lg bg-background/60 border border-border/60">
                <span className="font-semibold text-foreground block mb-1">
                  4. Dev &amp; Batch GPU
                </span>
                <span className="text-muted-foreground leading-normal block">
                  Codeium or GitHub Copilot Free for IDE, Modal ($30/mo credits) for batch serverless GPU jobs.
                </span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-muted-foreground font-mono">
                Have a free developer tool or student program to recommend?
              </span>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-primary transition-colors"
              >
                <span>Suggest a Resource</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}

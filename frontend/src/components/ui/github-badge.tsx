import { GithubRepo, getGithubRepos } from '@/lib/github'
import { Clock, GitFork, Star } from 'lucide-react'

/**
 * Server component that fetches and displays GitHub stats for a repository.
 * Uses ISR-compatible fetch with revalidation.
 */
export async function GithubBadge({ repoUrl }: { repoUrl: string }) {
  // Extract owner/repo from URL like https://github.com/pacman-cli/expense-tracker
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
  if (!match) return null

  const [, owner, repoName] = match

  let repo: GithubRepo | null = null
  try {
    const repos = await getGithubRepos()
    repo = repos.find((r) => r.name.toLowerCase() === repoName.toLowerCase()) || null
  } catch {
    return null
  }

  if (!repo) return null

  const lastUpdated = new Date(repo.updated_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="inline-flex items-center gap-4 px-4 py-2 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 text-sm">
      <a
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-muted-foreground hover:text-foreground transition-colors"
      >
        {owner}/{repoName}
      </a>
      <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
        <Star className="w-3.5 h-3.5" />
        {repo.stargazers_count}
      </span>
      <span className="flex items-center gap-1 text-muted-foreground">
        <GitFork className="w-3.5 h-3.5" />
        {repo.forks_count}
      </span>
      <span className="flex items-center gap-1 text-muted-foreground">
        <Clock className="w-3.5 h-3.5" />
        {lastUpdated}
      </span>
    </div>
  )
}

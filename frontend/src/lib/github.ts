import axios from 'axios'

const GITHUB_USERNAME = 'pacman-cli'
const BASE_URL = 'https://api.github.com'

// Types
export interface GithubProfile {
    login: string
    avatar_url: string
    html_url: string
    bio: string
    public_repos: number
    followers: number
    following: number
    name: string
    location: string
}

export interface GithubRepo {
    id: number
    name: string
    html_url: string
    description: string
    stargazers_count: number
    forks_count: number
    language: string
    updated_at: string
    topics: string[]
    homepage: string | null
    fork: boolean
}

export const getGithubProfile = async (): Promise<GithubProfile | null> => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${GITHUB_USERNAME}`)
        return response.data
    } catch (error) {
        console.error('Error fetching GitHub profile:', error)
        return null
    }
}

export const getGithubRepos = async (): Promise<GithubRepo[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${GITHUB_USERNAME}/repos`, {
            params: {
                sort: 'updated',
                per_page: 100
            }
        })
        // Filter out forks if desired, or keep them.
        // For a portfolio, usually sources are better, but we keep all public for now.
        return response.data.filter((repo: GithubRepo) => !repo.fork)
    } catch (error) {
        console.error('Error fetching GitHub repos:', error)
        return []
    }
}

export const getTechStackFromRepos = (repos: GithubRepo[]): string[] => {
    const languages = new Set<string>()
    repos.forEach(repo => {
        if (repo.language) languages.add(repo.language)
    })
    return Array.from(languages)
}

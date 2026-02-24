// GitHub API utilities with smart caching
// Fetches once, revalidates periodically (not on every page load)

const REPO = 'microsoft/amplifier'
const REVALIDATE_SECONDS = 3600 // 1 hour

export interface GitHubStats {
  stars: number
  forks: number
  updatedAt: string
}

export async function getGitHubStats(): Promise<GitHubStats> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Add token if available for higher rate limits
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        })
      }
    })
    
    if (!res.ok) {
      console.warn(`GitHub API returned ${res.status}`)
      return { stars: 0, forks: 0, updatedAt: new Date().toISOString() }
    }
    
    const data = await res.json()
    
    return {
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      updatedAt: new Date().toISOString()
    }
  } catch (error) {
    console.warn('Failed to fetch GitHub stats:', error)
    return { stars: 0, forks: 0, updatedAt: new Date().toISOString() }
  }
}

import { Blog } from "@/types"
import { fetchJson } from "@/lib/utils"

/** Static slug list for generateStaticParams fallback when backend is unavailable. */
export const STATIC_BLOG_SLUGS = [
  "llm-deep-thinking",
  "spring-security-architecture-linkedin",
  "microservices-spring-boot-architecture",
  "data-cleaning-model-training",
]

const API_BASE: string =
  process.env.BACKEND_URL
    ? `${process.env.BACKEND_URL}/api/v1`
    : process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/v1`
      : "http://localhost:8082/api/v1"


interface PagedResponse<T> {
  items: T[]
  total: number
  page: number
  size: number
  totalPages: number
}

interface BlogDTO {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  tags: string[]
  imageUrl: string | null
  publishedAt: string
}

function toBlog(dto: BlogDTO): Blog {
  return {
    id: dto.id,
    title: dto.title,
    slug: dto.slug,
    excerpt: dto.excerpt,
    content: dto.content,
    tags: dto.tags.join(", "),
    imageUrl: dto.imageUrl ?? undefined,
    publishedAt: dto.publishedAt,
  }
}

async function fetchAllBlogs(): Promise<BlogDTO[]> {
  const first = await fetchJson<PagedResponse<BlogDTO>>(
    `${API_BASE}/blogs?page=0&size=50`,
  )
  if (first.totalPages <= 1) return first.items

  const rest = await Promise.all(
    Array.from({ length: first.totalPages - 1 }, (_, i) =>
      fetchJson<PagedResponse<BlogDTO>>(
        `${API_BASE}/blogs?page=${i + 1}&size=50`,
      ),
    ),
  )
  return first.items.concat(...rest.map((p) => p.items))
}

export async function getBlogs(): Promise<Blog[]> {
  try {
    const dtos = await fetchAllBlogs()
    return dtos
      .map(toBlog)
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )
  } catch (error) {
    console.error("Failed to fetch blogs:", error)
    return []
  }
}

export async function getBlogSummaries(): Promise<Omit<Blog, "content">[]> {
  const blogs = await getBlogs()
  return blogs.map((blog) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content, ...rest } = blog
    return rest
  })

}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const dto = await fetchJson<BlogDTO>(`${API_BASE}/blogs/${slug}`)
    return toBlog(dto)
  } catch (error) {
    console.error(`Failed to fetch blog "${slug}":`, error)
    return null
  }
}

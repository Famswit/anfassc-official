export interface ExternalNews {
  id: number
  title: string
  author?: string
  publishedAt?: string
  image?: string
  content: string
}

interface WPAuthor {
  name?: string
}

interface WPFeaturedMedia {
  source_url?: string
}

interface WPPost {
  id: number
  date: string
  title: { rendered: string }
  content: { rendered: string }
  _embedded?: {
    author?: WPAuthor[]
    "wp:featuredmedia"?: WPFeaturedMedia[]
  }
}

export async function fetchNigeriaSportsNews(page = 1): Promise<ExternalNews[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/news?page=${page}`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) return []

    const posts: WPPost[] = await res.json()

    return posts.map((post) => ({
      id: post.id,
      title: post.title.rendered,
      author: post._embedded?.author?.[0]?.name || "Unknown",
      publishedAt: post.date,
      image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/default-image.jpg",
      content: post.content.rendered,
    }))
  } catch (err: unknown) {
    return []
  }
}

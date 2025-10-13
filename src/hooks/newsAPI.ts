export interface ExternalNews {
  id: number;
  title: string;
  author?: string;
  publishedAt?: string;
  image?: string;
  content: string;
}

interface WPAuthor {
  name?: string;
}

interface WPFeaturedMedia {
  source_url?: string;
}

interface WPPost {
  id: number;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    author?: WPAuthor[];
    "wp:featuredmedia"?: WPFeaturedMedia[];
  };
}

export async function fetchNigeriaSportsNews(
  page: number = 1
): Promise<ExternalNews[]> {
  try {
    const res = await fetch(`/api/news?page=${page}`);
    if (!res.ok) return [];

    const posts: WPPost[] = await res.json();

    return posts.map((post) => ({
      id: post.id,
      title: post.title.rendered,
      author: post._embedded?.author?.[0]?.name || "Unknown",
      publishedAt: post.date,
      image:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "/default-image.jpg",
      content: post.content.rendered,
    }));
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Client fetch failed:", err.message);
    } else {
      console.error("Client fetch failed:", err);
    }
    return [];
  }
}

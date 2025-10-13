import { NextResponse } from "next/server";

const BASE_URL = "http://authenticnfassc.org.ng/wp-json/wp/v2/posts";

// Revalidate every 1 hour
export const revalidate = 3600;

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get("page") || "1";

    const response = await fetch(`${BASE_URL}?_embed&per_page=10&page=${page}`);
    if (!response.ok) {
      return NextResponse.json(
        { error: `WordPress API returned ${response.status}` },
        { status: response.status }
      );
    }

    const posts = await response.json();

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Server-side fetch failed:", error);
    return NextResponse.json({ error: "Server fetch failed" }, { status: 500 });
  }
}
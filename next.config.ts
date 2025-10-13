import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", 

  env: {
    NEWS_API_KEY: process.env.NEWS_API_KEY,
    WORLDNEWS_API_KEY: process.env.WORLDNEWS_API_KEY,
  },

  images: {
    unoptimized: true, 
    domains: [
      "leadership.ng",
      "i0.wp.com",
      "www.sports247.ng",
      "cdn.thenationonlineng.net",
      "gongnews.net",
    ],
  },
};

export default nextConfig;

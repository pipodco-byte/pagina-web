/**
 * Blog types - Shared TypeScript interfaces for blog components
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  ogImage?: string;
  publishDate: string; // ISO date string
  author: string;
  readingTime?: string; // e.g., "5 min de lectura"
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}

export interface BlogAuthor {
  name: string;
  bio?: string;
  avatar?: string;
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getPosts() {
  const res = await fetch("http://localhost:3001/api/posts/getPosts");
  const posts = await res.json();
  return posts;
}

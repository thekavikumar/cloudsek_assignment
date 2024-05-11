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

export async function deletePost(postId: string, userId: string) {
  const res = await fetch(
    `http://localhost:3001/api/posts/deletePost/${userId}/${postId}`,
    {
      method: "DELETE",
    }
  );
  const data = await res.json();
  return data;
}

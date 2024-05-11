import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getPosts() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backend}/api/posts/getPosts`);
  const posts = await res.json();
  return posts;
}

export async function deletePost(postId: string, userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/deletePost/${userId}/${postId}`,
    {
      method: "DELETE",
    }
  );
  const data = await res.json();
  return data;
}

export async function getPostById(postId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/getPost/${postId}`
  );
  const post = await res.json();
  return post;
}

export async function createComment(
  postId: string,
  userId: string,
  content: string,
  author: string,
  profileImage: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/createComment/${postId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, userId, author, profileImage }),
    }
  );
  const data = await res.json();
  return data;
}

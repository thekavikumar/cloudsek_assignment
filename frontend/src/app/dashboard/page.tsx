import React from "react";
import {
  LogoutLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { getPosts } from "@/lib/utils";
import { IPost } from "../../..";
import { Button } from "@/components/ui/button";

const Page = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const posts = await getPosts();
  console.log(posts);
  return (await isAuthenticated()) ? (
    <div>
      <h1>Welcome {user?.given_name}</h1>
      <LogoutLink>
        <Button> Logout </Button>
      </LogoutLink>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post: IPost) => (
            <li key={post._id}>{post._id}</li>
          ))}
        </ul>
      ) : (
        <p>No posts found</p>
      )}
    </div>
  ) : (
    <h1>Unauthorized</h1>
  );
};

export default Page;

"use client";
import React from "react";
import { IPost } from "../lib/types";
import { getPosts } from "@/lib/utils";
import LogoutButton from "./LogoutButton";
import MaxWidthWrapper from "./MaxWidthWrapper";
import TextEditor from "./TextEditor/TextEditor";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Post from "./Post";

const Dashboard = () => {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();
  const [posts, setPosts] = React.useState([]);
  const [isNewPostCreated, setIsNewPostCreated] = React.useState(false);
  const [isPostDeleted, setIsPostDeleted] = React.useState(false);

  React.useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, [isNewPostCreated, isPostDeleted]); // Fetch posts whenever isNewPostCreated changes

  const handlePostCreated = () => {
    setIsNewPostCreated(!isNewPostCreated);
  };

  const handlePostDeleted = () => {
    setIsPostDeleted(!isPostDeleted);
  };

  // const posts: [] = [];
  return (
    <MaxWidthWrapper>
      <nav className="flex items-center justify-between w-full border-b p-2 shadow-sm sticky top-0 bg-opacity-50 backdrop-blur-lg bg-white">
        <h1 className="text-xl font-semibold">Welcome {user?.given_name}</h1>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user?.picture!} alt="profile image" />
          </Avatar>
          <LogoutButton />
        </div>
      </nav>
      <TextEditor onPostCreated={handlePostCreated} />
      <div className="mt-5 pb-8">
        <h1 className="text-2xl font-semibold text-center mb-3">Posts</h1>
        {posts.length > 0 ? (
          <div className="flex items-center flex-col gap-4">
            {posts.map((post: IPost) => (
              <Post
                post={post}
                key={post._id}
                userId={user?.id}
                onDelete={handlePostDeleted}
              />
            ))}
          </div>
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default Dashboard;

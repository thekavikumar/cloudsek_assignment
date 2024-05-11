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
import { ResizableScreen } from "./ResizeableScreen";
import { X } from "lucide-react";

const Dashboard = () => {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();
  const [posts, setPosts] = React.useState([]);
  const [isNewPostCreated, setIsNewPostCreated] = React.useState(false);
  const [isPostDeleted, setIsPostDeleted] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState<IPost | null>(null);

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

  const handlePostSelected = (post: IPost) => {
    setSelectedPost(post);
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
      <ResizableScreen
        firstScreen={
          <div className="flex flex-col gap-6 h-full overflow-y-auto scrollable-container pb-24">
            <TextEditor onPostCreated={handlePostCreated} />
            {posts.map((post: IPost) => (
              <Post
                key={post._id}
                post={post}
                userId={user?.id}
                onDelete={handlePostDeleted}
                onClick={() => handlePostSelected(post)}
              />
            ))}
          </div>
        }
        secondScreen={
          <div className="flex flex-col w-full h-full  overflow-y-auto scrollable-container">
            {selectedPost && (
              <div className="flex item-center self-end mr-6 ">
                <button className="" onClick={() => setSelectedPost(null)}>
                  <X size={18} />
                </button>
              </div>
            )}
            {selectedPost ? (
              <div className="flex flex-col gap-6 w-full mt-3 ">
                <Post
                  post={selectedPost}
                  userId={user?.id}
                  onDelete={handlePostDeleted}
                  onClick={() => handlePostSelected(selectedPost)}
                />
              </div>
            ) : (
              <h1 className="text-2xl font-semibold text-center">
                No post selected
              </h1>
            )}
          </div>
        }
      />
    </MaxWidthWrapper>
  );
};

export default Dashboard;

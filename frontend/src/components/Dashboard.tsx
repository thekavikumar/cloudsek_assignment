"use client";
import React from "react";
import { IPost } from "../lib/types";
import { getPostById, getPosts } from "@/lib/utils";
import LogoutButton from "./LogoutButton";
import MaxWidthWrapper from "./MaxWidthWrapper";
import TextEditor from "./TextEditor/TextEditor";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Post from "./Post";
import { ResizableScreen } from "./ResizeableScreen";
import { X } from "lucide-react";
import CommentEditor from "./CommentEditor/TextEditor";
import Comment from "./Comment";

const Dashboard = () => {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();
  const [posts, setPosts] = React.useState([]);
  const [isNewPostCreated, setIsNewPostCreated] = React.useState(false);
  const [isNewCommentCreated, setIsNewCommentCreated] = React.useState(false);
  const [isPostUpdated, setIsPostUpdated] = React.useState(false);
  const [isPostDeleted, setIsPostDeleted] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState<IPost | null>(null);
  const [isCommentDeleted, setIsCommentDeleted] = React.useState(false);
  const [isCommentUpdated, setIsCommentUpdated] = React.useState(false);

  React.useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, [
    isNewPostCreated,
    isPostDeleted,
    isNewCommentCreated,
    isCommentDeleted,
    isPostUpdated,
    isCommentUpdated,
  ]); // Fetch posts whenever isNewPostCreated changes

  React.useEffect(() => {
    if (
      (selectedPost && isNewCommentCreated) ||
      (selectedPost && isCommentDeleted) ||
      (selectedPost && isPostUpdated) ||
      (selectedPost && isCommentUpdated)
    ) {
      const fetchPost = async () => {
        const fetchedPost = await getPostById(selectedPost._id);
        setSelectedPost(fetchedPost);
        setIsNewCommentCreated(false); // Reset isNewCommentCreated after fetching post
        setIsCommentDeleted(false);
        setIsPostUpdated(false);
        setIsCommentUpdated(false);
      };

      fetchPost();
    }
  }, [
    isNewCommentCreated,
    selectedPost,
    isCommentDeleted,
    isPostUpdated,
    isCommentUpdated,
  ]);

  const handlePostCreated = () => {
    setIsNewPostCreated(!isNewPostCreated);
  };

  const handlePostUpdated = () => {
    setIsPostUpdated(!isPostUpdated);
  };

  const handlePostDeleted = () => {
    setIsPostDeleted(!isPostDeleted);
  };

  const handlePostSelected = (post: IPost) => {
    setSelectedPost(post);
  };

  const handleCommentCreated = (postId: string) => {
    setIsNewCommentCreated(true);
  };

  const handleCommentDeleted = () => {
    setIsCommentDeleted(!isCommentDeleted);
  };

  const handleCommentUpdated = () => {
    setIsCommentUpdated(true);
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
                onPostCreated={handlePostCreated}
                onClick={() => handlePostSelected(post)}
                handleUpdate={handlePostUpdated}
              />
            ))}
          </div>
        }
        secondScreen={
          <div className="flex flex-col w-full h-full  overflow-y-auto scrollable-container pb-24">
            {selectedPost && (
              <div className="flex item-center self-end mr-6 ">
                <button className="" onClick={() => setSelectedPost(null)}>
                  <X size={18} />
                </button>
              </div>
            )}
            {selectedPost ? (
              <div className="flex flex-col gap-2 w-full mt-3 ">
                <Post
                  post={selectedPost}
                  userId={user?.id}
                  onDelete={handlePostDeleted}
                  handleUpdate={handlePostUpdated}
                  onClick={() => handlePostSelected(selectedPost)}
                />
                <div className="mx-auto">
                  <CommentEditor
                    onCommentCreated={handleCommentCreated}
                    postId={selectedPost._id}
                  />
                  {selectedPost.comments.length > 0 && (
                    <h1 className="text-2xl font-semibold mt-5">Comments</h1>
                  )}
                  {selectedPost.comments.map((comment: any) => (
                    <div key={comment._id} className="mt-3">
                      <Comment
                        handleUpdate={handleCommentUpdated}
                        post={selectedPost}
                        comment={comment}
                        userId={user?.id}
                        onDelete={handleCommentDeleted}
                      />
                    </div>
                  ))}
                </div>
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

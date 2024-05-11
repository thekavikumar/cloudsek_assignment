"use client";
import { IPost } from "@/lib/types";
import React from "react";
import DOMPurify from "dompurify";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Heart, MessageCircle, Share, Trash2 } from "lucide-react";
import { deletePost } from "@/lib/utils";
import toast from "react-hot-toast";

const Post = ({
  post,
  userId,
  onDelete,
  onClick,
}: {
  post: IPost;
  userId: string | undefined;
  onDelete: () => void;
  onClick: () => void;
}) => {
  const createMarkup = (html: string) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const handleDelete = async () => {
    await deletePost(post._id, userId!).then((res) => {
      onDelete();
      toast.success("Post deleted successfully");
    });
  };

  return (
    <div className="max-w-[29rem] mx-auto border border-gray-300 shadow w-full rounded-md p-4 hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
      <div className="flex items-center gap-3" onClick={onClick}>
        <Avatar>
          <AvatarImage src={post.profileImage} alt="profile image" />
        </Avatar>
        <h1 className="text-lg font-semibold">{post.author}</h1>
      </div>
      <div
        className="mt-4"
        dangerouslySetInnerHTML={createMarkup(post.content)}
        onClick={onClick}
      ></div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 mt-3">
          <button className="flex items-center gap-2">
            <Heart size={18} color="#000" fill="red" />
            <h1>500</h1>
          </button>
          <button className="flex items-center gap-2" onClick={onClick}>
            <MessageCircle size={18} color="#000" />
            <h1>421</h1>
          </button>
          <button className="flex items-center gap-2">
            <Share size={18} color="#000" />
            <h1>366</h1>
          </button>
        </div>
        {userId === post.userId && (
          <button className="flex items-center gap-2" onClick={handleDelete}>
            <Trash2 size={18} color="#000" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;

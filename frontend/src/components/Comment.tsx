"use client";
import { IPost } from "@/lib/types";
import React from "react";
import DOMPurify from "dompurify";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Heart, MessageCircle, Share, Trash2 } from "lucide-react";
import { deletePost } from "@/lib/utils";
import toast from "react-hot-toast";

const Comment = ({
  comment,
  userId,
  onDelete,
}: {
  comment: IPost;
  userId: string | undefined;
  onDelete: () => void;
}) => {
  const createMarkup = (html: string) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const handleDelete = async () => {
    await deletePost(comment._id, userId!).then((res) => {
      onDelete();
      toast.success("comment deleted successfully");
    });
  };

  return (
    <div className="max-w-[29rem] mx-auto border border-gray-300 shadow w-full rounded-md p-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={comment?.profileImage} alt="profile image" />
        </Avatar>
        <h1 className="text-lg font-semibold">{comment.author}</h1>
      </div>
      <div
        className="mt-4"
        dangerouslySetInnerHTML={createMarkup(comment.content)}
      ></div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 mt-3">
          <button className="flex items-center gap-2">
            <Heart size={18} color="#000" />
            <h1>{comment.stats?.likes.count}</h1>
          </button>
          <button className="flex items-center gap-2">
            <MessageCircle size={18} color="#000" />
            <h1>{comment.comments?.length}</h1>
          </button>
          <button className="flex items-center gap-2">
            <Share size={18} color="#000" />
            <h1>{comment.stats?.shares}</h1>
          </button>
        </div>
        {userId === comment.userId && (
          <button className="flex items-center gap-2" onClick={handleDelete}>
            <Trash2 size={18} color="#000" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;

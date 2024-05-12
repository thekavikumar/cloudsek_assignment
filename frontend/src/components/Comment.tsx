"use client";
import { IComment, IPost } from "@/lib/types";
import React from "react";
import DOMPurify from "dompurify";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Heart, MessageCircle, Share, Trash2 } from "lucide-react";
import { deleteComment, deletePost } from "@/lib/utils";
import toast from "react-hot-toast";

const Comment = ({
  post,
  comment,
  userId,
  onDelete,
}: {
  post: IPost;
  comment: IComment;
  userId: string | undefined;
  onDelete: () => void;
}) => {
  const createMarkup = (html: string) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  console.log(comment);

  const handleDelete = async () => {
    if (userId !== undefined) {
      await deleteComment(post._id, comment.commentId, userId)
        .then((data) => {
          onDelete();
          toast.success("Comment deleted successfully");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
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
            <MessageCircle size={18} color="#000" />
            <h1>{post.comments?.length}</h1>
          </button>
          {(userId === comment.userId || post.userId === userId) && (
            <button className="flex items-center gap-2" onClick={handleDelete}>
              <Trash2 size={18} color="#000" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;

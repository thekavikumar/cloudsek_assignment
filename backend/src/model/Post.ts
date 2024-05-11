const mongoose = require("mongoose");
const { Schema, model } = mongoose;

export interface IComment {
  commentId: string;
  user: string;
  content: string;
  likes: number;
}

export interface IPost extends Document {
  userId: string;
  author: string;
  profileImage: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  content: string;
  createdAt: Date;
  updatedAt: Date;
  comments: IComment[] | [];
}

const postScheme = new Schema({
  userId: String,
  author: String,
  profileImage: String,
  content: String,
  createdAt: Date,
  updatedAt: Date,
  comments:
    [
      {
        commentId: String,
        user: String,
        content: String,
        likes: Number,
      },
    ] || [],
  stats: {
    likes: Number,
    comments: Number,
    shares: Number,
  },
});

const Post = model("Post", postScheme);
export default Post;

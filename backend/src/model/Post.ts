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
  title: string;
  author: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  comments: IComment[] | [];
}

const postScheme = new Schema({
  userId: String,
  title: String,
  author: String,
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
});

const Post = model("Post", postScheme);
export default Post;

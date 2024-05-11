const mongoose = require("mongoose");
const { Schema, model } = mongoose;

export interface IComment {
  commentId: string;
  userId: string;
  author: string;
  content: string;
  profileImage: string;
  likes: {
    likedBy: string[];
    count: number;
  };
}

export interface IPost extends Document {
  userId: string;
  author: string;
  profileImage: string;
  stats: {
    likes: {
      likedBy: string[];
      count: number;
    };
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
        userId: String,
        author: String,
        profileImage: String,
        content: String,
        likes: {
          likedBy: [String],
          count: Number,
        },
      },
    ] || [],
  stats: {
    likes: {
      likedBy: [String],
      count: Number,
    },
    shares: Number,
  },
});

const Post = model("Post", postScheme);
export default Post;

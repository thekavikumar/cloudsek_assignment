import { Request, Response } from "express";
import Post, { IPost } from "../model/Post";
import mongoose from "mongoose";

exports.getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts: IPost[] = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    // @ts-ignore
    res.status(404).json({ message: error.message });
  }
};

exports.createPost = async (req: Request, res: Response): Promise<void> => {
  const post = req.body.post;
  console.log("post: ", req.body.post);

  const newPost = new Post(post);
  console.log(newPost);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    // @ts-ignore
    res.status(409).json({ message: error.message });
  }
};

exports.updatePost = async (req: Request, res: Response): Promise<void> => {
  const postId = new mongoose.Types.ObjectId(req.params.postId);
  const postData = req.body.post; // Partial<IPost> allows partial updates
  // Assuming userId is present in the request body
  const userId = req.body.userId;

  try {
    const existingPost: IPost | null = await Post.findById(postId);

    if (!existingPost) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    if (existingPost.userId !== userId) {
      res
        .status(403)
        .json({ message: "You are not authorized to update this post" });
      return;
    }

    const updatedPost: IPost | null = await Post.findByIdAndUpdate(
      postId,
      postData,
      { new: true }
    );

    if (!updatedPost) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    // @ts-ignore
    res.status(400).json({ message: error.message });
  }
};

exports.deletePost = async (req: Request, res: Response): Promise<void> => {
  // Assuming userId is present in the request params
  const userId = req.params.userId;
  const postId = new mongoose.Types.ObjectId(req.params.postId);

  try {
    const existingPost: IPost | null = await Post.findById(postId);

    if (!existingPost) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    if (existingPost.userId !== userId) {
      res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
      return;
    }

    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    // @ts-ignore
    res.status(400).json({ message: error.message });
  }
};

exports.deleteComment = async (req: Request, res: Response): Promise<void> => {
  const postId = new mongoose.Types.ObjectId(req.params.postId);
  const commentId = req.params.commentId;
  const userId = req.params.userId;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    const commentIndex = post.comments.findIndex(
      (comment: any) => comment.commentId === commentId
    );

    if (commentIndex === -1) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    if (
      post.comments[commentIndex].userId !== userId &&
      post.userId !== userId
    ) {
      res
        .status(403)
        .json({ message: "You are not authorized to delete this comment" });
      return;
    }

    post.comments.splice(commentIndex, 1);
    await post.save();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    // @ts-ignore
    res.status(400).json({ message: error.message });
  }
};

exports.getPost = async (req: Request, res: Response): Promise<void> => {
  const postId = new mongoose.Types.ObjectId(req.params.postId);

  try {
    const post: IPost | null = await Post.findById(postId);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.status(200).json(post);
  } catch (error) {
    // @ts-ignore
    res.status(400).json({ message: error.message });
  }
};

exports.createComment = async (req: Request, res: Response) => {
  const postId = new mongoose.Types.ObjectId(req.params.postId);
  const { userId, content, author, profileImage } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create new comment
    const newComment = {
      commentId: generateUniqueId(), // You need to implement a function to generate unique IDs
      userId: userId,
      author: author,
      profileImage: profileImage,
      content: content,
      likes: { likedBy: [], count: 0 },
    };

    // Add the new comment to the post's comments array
    post.comments.push(newComment);

    await post.save();
    res.status(201).json(newComment);
  } catch (error) {
    // @ts-ignore
    res.status(500).json({ message: error.message });
  }
};

function generateUniqueId(): string {
  const uniqueId = Math.random().toString(36).substr(2, 9);
  return uniqueId;
}

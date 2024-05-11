export interface IComment {
  commentId: string;
  user: string;
  content: string;
  likes: number;
}

export interface IPost extends Document {
  _id: string;
  userId: string;
  stats: {
    likes: {
      likedBy: string[];
      count: number;
    };
    shares: number;
  };
  author: string;
  profileImage: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  comments: IComment[] | [];
}

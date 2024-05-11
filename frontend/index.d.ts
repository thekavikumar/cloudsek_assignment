export interface IComment {
  commentId: string;
  user: string;
  content: string;
  likes: number;
}

export interface IPost extends Document {
  _id: string;
  userId: string;
  title: string;
  author: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  comments: IComment[] | [];
}

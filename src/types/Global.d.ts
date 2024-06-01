type UserID = string;
type PostID = string;
type CommentID = string;

// User Schema
export interface User {
  username: string;
  email: string;
  password: string;
  pfp: string;
  friends: UserID[];
  friendRequests: UserID[];
}

// Reaction Schema
export interface Reaction {
  user: UserID;
  type: string;
}

// Post Schema
export interface PostType {
  _id: PostID;
  user: User;
  content: string;
  media: string[];
  reactions: Reaction[];
  comments: CommentID[];
  privacy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Comment Schema
export interface Comment {
  post: PostID;
  user: UserID;
  content: string;
  reactions: Reaction[];
  replies: CommentID[];
  createdAt: Date;
  updatedAt: Date | null;
}

// Friend Request Schema
export interface FriendRequest {
  from: UserID;
  to: UserID;
  status: string;
}

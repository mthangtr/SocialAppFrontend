type UserID = string;
type PostID = string;
type CommentID = string;

// User Schema
interface User {
  username: string;
  email: string;
  password: string;
  pfp: string;
  friends: UserID[];
  friendRequests: UserID[];
}

// Reaction Schema
interface Reaction {
  user: UserID;
  type: string;
}

// Post Schema
interface Post {
  user: UserID;
  content: string;
  media: string;
  reactions: Reaction[];
  comments: CommentID[];
  privacy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Comment Schema
interface Comment {
  post: PostID;
  user: UserID;
  content: string;
  reactions: Reaction[];
  replies: CommentID[];
  createdAt: Date;
  updatedAt: Date;
}

// Friend Request Schema
interface FriendRequest {
  from: UserID;
  to: UserID;
  status: string;
}

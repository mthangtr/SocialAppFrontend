type UserID = string;
type PostID = string;
type CommentID = string;

// User Schema
export interface UserType {
    _id: String;
    username: string;
    email: string;
    password: string;
    pfp: string;
    friends: string[];
    friendRequests: string[];
}

// Reaction Schema
export interface Reaction {
    user: UserType;
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

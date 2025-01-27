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
    user: any;
    content: string;
    media: string[];
    reactions: Reaction[];
    comments: CommentID[];
    privacy: string;
    createdAt: Date;
    updatedAt: Date;
}

// Comment Schema
export interface CommentType {
    _id: string;
    content: string;
    user: {
        _id: string;
        username: string;
        pfp: string;
    };
    children: CommentType[];
    reactions: Reaction[];
    createdAt: Date;
    updatedAt: Date;
}

// Friend Request Schema
export interface FriendRequest {
    from: UserID;
    to: UserID;
    status: string;
}

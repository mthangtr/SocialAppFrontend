"use client";
import { PostType, UserType } from "@/types/Global";
import { useState, useEffect } from "react";
import Post from "./Posts";

function NewPostContainer({ user, postsData }: { user: UserType, postsData: PostType[] }) {
    const [newPost, setNewPost] = useState<PostType[]>(postsData);

    useEffect(() => {
        setNewPost(prevNewPost => [...prevNewPost, ...postsData].sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Sort by newest first
        }));
    }, [postsData]);

    return (
        <>
            {newPost.map((post, index) => (
                <Post key={post._id || index} postsData={post} user={user} />
            ))}
        </>
    );
}

export default NewPostContainer;
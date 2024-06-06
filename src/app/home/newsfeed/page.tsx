"use client";
import InputStatus from '@/components/Pages/NewsFeedComp/InputStatus';
import Post from '@/components/Pages/NewsFeedComp/Posts';
import { getPosts } from '@/services/postService';
import { PostType } from '@/types/Global';
import { useEffect, useState } from 'react';

export default function NewsFeed() {
    const [posts, setPosts] = useState<PostType[]>([]); // Khởi tạo `posts` như một mảng rỗng

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postData: any = await getPosts();
                setPosts(postData);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <InputStatus />
            {Array.isArray(posts) && posts.length > 0 ? ( // Kiểm tra nếu `posts` là một mảng và có ít nhất một phần tử
                posts.map((post, idx) => (
                    <Post key={idx} postsData={post} />
                ))
            ) : (
                <p>No posts available</p> // Hiển thị thông báo nếu không có bài đăng nào
            )}
        </div>
    );
}

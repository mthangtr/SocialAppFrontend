"use client";
import Feed from '@/components/Pages/NewsFeedComp/Feed';
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

    return <Feed postData={posts} />;
}

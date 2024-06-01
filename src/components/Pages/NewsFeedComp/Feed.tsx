"use client";
import InputStatus from '@/components/Pages/NewsFeedComp/InputStatus';
import Post from '@/components/Pages/NewsFeedComp/Posts';
import { PostType } from '@/types/Global';
import { useState, useEffect } from 'react';

function Feed({ postData }: { postData: PostType[] }) {
    const [posts, setPosts] = useState<PostType[]>([]); // Khởi tạo `posts` như một mảng rỗng

    useEffect(() => {
        setPosts(postData);
    }, [postData]);

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

export default Feed;

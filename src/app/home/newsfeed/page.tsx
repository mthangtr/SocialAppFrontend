"use client";
import InputStatus from '@/components/Pages/NewsFeedComp/InputStatus';
import Post from '@/components/Pages/NewsFeedComp/Posts';
import { PostType } from '@/types/Global';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from "@nextui-org/react";
import { UserType } from '@/types/Global';
import {
    useFetchPostsQuery
} from '@/libs/features/postsSlice';

export default function NewsFeed() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [user, setUser] = useState<UserType | null>(null);

    const { data: postData, error, isLoading, isFetching } = useFetchPostsQuery({ page });

    console.log(posts.length);

    useEffect(() => {
        const storedUser = localStorage.getItem("userInfo");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (postData && (postData as PostType[]).length > 0) {
            setPosts((prevPosts) => [...prevPosts, ...(postData as PostType[])]);
        } else if (postData && (postData as PostType[]).length === 0) {
            setHasMore(false);
        }
    }, [postData]);

    const loadMorePosts = () => {
        if (!isFetching) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    if (error) {
        return <div>Error loading posts</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <InputStatus user={user} />
            <InfiniteScroll
                style={{ overflow: 'visible' }}
                dataLength={posts.length}
                next={loadMorePosts}
                hasMore={hasMore}
                loader={<div className='flex justify-center items-center mt-2 pt-2'><Spinner /></div>}
                endMessage={<div className='flex justify-center items-center mt-2 pt-2'><h1>No more posts to show</h1></div>}
            >
                {posts.map((post, idx) => (
                    <Post key={idx} postsData={post} user={user} />
                ))}
            </InfiniteScroll>
        </div>
    );
}

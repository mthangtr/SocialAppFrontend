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
import { useSearchParams, useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

export default function NewsFeed() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [user, setUser] = useState<UserType | null>(null);
    const searchParams = useSearchParams();
    const query = searchParams.get('loggedIn');
    const router = useRouter();

    const { data: postData, error, isLoading, isFetching } = useFetchPostsQuery({ page });

    useEffect(() => {
        if (query === 'true') {
            toast.success("Logged out successfully");
            router.replace("/home/newsfeed", undefined);
        }
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

    const handlePostCreated = (newPost: PostType) => {
        setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    if (error) {
        return <div>Error loading posts</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <ToastContainer
                autoClose={3000}
                hideProgressBar={true}
                closeOnClick
                pauseOnHover
            />
            <InputStatus user={user} onPostCreated={handlePostCreated} />
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

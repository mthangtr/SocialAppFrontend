"use client";
import InputStatus from '@/components/Pages/NewsFeedComp/PostComponents/InputStatus';
import Post from '@/components/Pages/NewsFeedComp/PostComponents/Posts';
import { PostType, UserType } from '@/types/Global';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from "@nextui-org/react";
import { useFetchPostsQuery } from '@/libs/api/postsApi';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/libs/hooks';
import { closeModal } from '@/libs/states/modalSlice';

export default function NewsFeed() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [user, setUser] = useState<UserType | null>(null);

    const dispatch = useAppDispatch();

    const searchParams = useSearchParams();
    const query = searchParams.get('loggedIn');
    const router = useRouter();

    const { data: postData, error, isFetching } = useFetchPostsQuery(
        { userId: user?._id, page },
        { skip: !user?._id }
    ) as { data: PostType[], error: any, isFetching: boolean };

    useEffect(() => {
        if (query === 'true') {
            toast.success("Logged out successfully");
            router.replace("/home");
        }
        const storedUser = localStorage.getItem("userInfo");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (postData && postData.length > 0) {
            setPosts(prevPosts => {
                const combined = [...prevPosts, ...postData];
                const uniquePosts = Array.from(new Map(combined.map(item => [item._id, item])).values());
                return uniquePosts;
            });

        } else if (postData && postData.length === 0) {
            setHasMore(false);
        }
    }, [postData]);

    const loadMorePosts = () => {
        if (!isFetching) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handlePostCreated = (newPost: PostType) => {
        toast.success("Post created successfully");
        dispatch(closeModal());
        setPosts(prev => [newPost, ...prev]);
    };

    if (error) {
        return <div>Error loading posts</div>;
    }

    return (
        <div className="container mx-auto p-6">

            {/* Input tạo post mới */}
            <InputStatus user={user} onPostCreated={handlePostCreated} />

            {/* Infinite Scroll: posts (bao gồm post mới tạo) */}
            <InfiniteScroll
                style={{ overflow: 'visible' }}
                dataLength={posts.length}
                next={loadMorePosts}
                hasMore={hasMore}
                loader={<div className='flex justify-center items-center mt-2 pt-2'><Spinner /></div>}
                endMessage={<div className='flex justify-center items-center mt-2 pt-2'><h1>No more content</h1></div>}
            >
                {posts.map((post) => (
                    <Post key={post._id} postsData={post} user={user} />
                ))}
            </InfiniteScroll>
        </div>
    );
}

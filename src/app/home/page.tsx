"use client";
import InputStatus from '@/components/Pages/NewsFeedComp/PostComponents/InputStatus';
import Post from '@/components/Pages/NewsFeedComp/PostComponents/Posts';
import { PostType } from '@/types/Global';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from "@nextui-org/react";
import { UserType } from '@/types/Global';
import {
    useFetchPostsQuery
} from '@/libs/api/postsSlice';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import NewPostContainer from '@/components/Pages/NewsFeedComp/PostComponents/NewPostContainer';

export default function NewsFeed() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [newPost, setNewPost] = useState<PostType[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [user, setUser] = useState<UserType | null>(null);
    const searchParams = useSearchParams();
    const query = searchParams.get('loggedIn');
    const router = useRouter();

    const { data: postData, error, isFetching } = useFetchPostsQuery({ page });

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
        toast.success("Post created successfully");
        // const audio = new Audio('/assets/sounds/new-notification.mp3');
        // audio.play().catch((error) => console.log('Error playing sound:', error));
        setNewPost(prevPosts => [newPost, ...prevPosts]);
    };

    if (error) {
        return <div>Error loading posts</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <InputStatus user={user} onPostCreated={handlePostCreated} />
            <NewPostContainer
                user={user}
                postsData={newPost}
            ></NewPostContainer>
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

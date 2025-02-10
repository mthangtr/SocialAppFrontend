"use client"
import { useState, useEffect } from "react";
import ProfileInfo from "@/components/Pages/ProfilePage/ProfileInfo";
import { useParams } from 'next/navigation';
import { useFetchUserByIdQuery, useFetchFriendsQuery } from "@/lib/api/userApi";
import { UserType, PostType } from "@/types/Global";
import { useAppSelector } from "@/lib/hooks";
import FriendsListContainer from "@/components/Pages/ProfilePage/FriendsListContainer";
import { useFetchPostByUserIdQuery } from "@/lib/api/postsApi";
import Post from "@/components/Pages/NewsFeedComp/PostComponents/Posts";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "@nextui-org/react";
interface postResponseProps {
    updatedPosts: PostType[];
    totalPages: number;
}
const ProfilePageRoot = () => {
    const user: UserType = useAppSelector((state) => (state as { auth: { userInfo: UserType } }).auth.userInfo);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [userPosts, setUserPosts] = useState<PostType[]>([]);
    const [friends, setFriends] = useState<UserType[]>([]);
    const { userid } = useParams() as { userid: string };
    const { data: userDataResponse } = useFetchUserByIdQuery(userid) as { data: UserType };
    const { data: postResponse } = useFetchPostByUserIdQuery({
        userId: userid,
        page,
        viewerId: user?._id
    }) as { data: postResponseProps };
    const { data: friendsResponse } = useFetchFriendsQuery({ userId: userid, limit: limit }) as { data: UserType[] };
    useEffect(() => {
        if (postResponse) {
            const postFiltered = postResponse.updatedPosts.filter((post) => !userPosts.find((p) => p._id === post._id));
            setUserPosts([...userPosts, ...postFiltered]);
        }
    }, [postResponse]);
    useEffect(() => {
        if (friendsResponse) {
            const friendsFiltered = friendsResponse.filter((friend) => !friends.find((f) => f._id === friend._id));
            setFriends(friendsFiltered);
        }
    }, [friendsResponse]);
    const handleDialogToggle = () => {
        setLimit(0);
    }
    return (
        <>
            <ProfileInfo user={userDataResponse} currentUser={user} />
            <FriendsListContainer friends={friendsResponse} onDialogToggle={handleDialogToggle} />
            <InfiniteScroll
                style={{ overflow: 'visible' }}
                dataLength={userPosts.length ?? 0}
                next={() => setPage(page + 1)}
                hasMore={page < postResponse?.totalPages}
                loader={<div className='flex justify-center items-center mt-2 pt-2'><Spinner /></div>}
                endMessage={<div className='flex justify-center items-center mt-2 mb-4 pt-2'><h1>No more content</h1></div>}
            >
                {userPosts.map((post) => (
                    <Post key={post?._id} postsData={post} user={user} />
                ))}
            </InfiniteScroll>
        </>
    );
}

export default ProfilePageRoot;
"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "../ui/button";
import { UserType } from "@/types/Global";
import { useState, useEffect } from "react";
import { useAcceptFriendRequestMutation, useRejectFriendRequestMutation } from "@/lib/api/userApi";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setCredentials } from "@/lib/states/authSlice";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
function RightSidebar() {
    const toast = useToast();
    const user: UserType = useAppSelector((state) => (state as { auth: { userInfo: UserType } }).auth.userInfo);
    const [acceptFriendRequest] = useAcceptFriendRequestMutation();
    const [rejectFriendRequest] = useRejectFriendRequestMutation();
    const [isClient, setIsClient] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleAcceptFriendRequest = async (senderId: string, receiverId: string) => {
        try {
            const response = await acceptFriendRequest({ senderId, receiverId });
            console.log(response);
            if ('data' in response && response.data) {
                dispatch(setCredentials(response.data.receiver));
            }
            toast.toast({
                title: "Friend request accepted",
                description: `You are now friends with ${response.data.sender.username}`,
            })
        } catch (err) {
            console.error(err);
        }
    }

    const handleRejectFriendRequest = async (senderId: string, receiverId: string) => {
        try {
            const response = await rejectFriendRequest({ senderId, receiverId });
            if ('data' in response && response.data) {
                dispatch(setCredentials(response.data.receiver));
            }
            toast.toast({
                title: "Friend request rejected",
                description: `You have rejected the friend request from ${response.data.sender.username}`,
            })
        } catch (err) {
            console.error(err);
        }
    }

    if (!isClient) return null; // Prevents SSR mismatch by hiding content until client-side rendering

    return (
        <div id="right-sidebar" className="p-2 w-full h-full">
            <div className="flex flex-col space-y-4">
                <div className=" px-4 py-2 rounded-md">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold">Follow request</h2>
                        <h5 className="flex justify-center items-center text-sm font-semibold underline">View all</h5>
                    </div>
                    <ul className="space-y-4 mt-4">
                        {user?.friendRequests?.length > 0 ? (
                            user.friendRequests.slice(0, 4).map((fr) => (
                                <li key={fr?._id} className="space-x-4">
                                    <div className="flex items-center space-x-4 p-1">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage
                                                src={fr?.pfp || "/assets/images/default.png"}
                                                alt={fr?.username}
                                            />
                                            <AvatarFallback>
                                                {fr?.username?.charAt(0)?.toUpperCase() || "?"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <a href="#" className="font-semibold">{fr?.username}</a>
                                            <p className="text-gray-500">1 mutual friend</p>
                                            <div className="flex space-x-2 mt-2">
                                                <Button variant="default"
                                                    onClick={() => handleAcceptFriendRequest(fr?._id, user?._id)}
                                                >Accept</Button>
                                                <Button variant="secondary"
                                                    onClick={() => handleRejectFriendRequest(fr?._id, user?._id)}
                                                >Decline</Button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-500 mt-4">No friend requests</p>
                        )}
                    </ul>
                </div>
                <div className="bg-background px-4 py-2 rounded-md">
                    <h2 className="text-lg font-semibold">Contact with</h2>
                    <ul className="space-y-2 mt-2">
                        {user?.friends?.length > 0 ? (
                            user.friends.map((friend) => (
                                <li key={friend?._id} className="flex items-center space-x-2">
                                    <Link href={`/profile/${friend?._id}`}>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage
                                                src={friend?.pfp || "/assets/images/default.png"} alt={friend?.username} />
                                            <AvatarFallback>{friend?.username?.charAt(0)?.toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    </Link>
                                    <div>
                                        <a href="#" className="font-semibold">{friend?.username}</a>
                                        <Link href={`/profile/${friend?._id}`}>
                                            <p className="text-gray-400">Software Engineer</p>
                                        </Link>
                                    </div>
                                </li>
                            ))) : (<p className="text-gray-500 mt-4">No friends</p>)}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default RightSidebar;
"use client";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/libs/hooks";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import FeedIcon from '@mui/icons-material/Feed';
import SendIcon from '@mui/icons-material/Send';
import { Button } from "../ui/button";
import { UserType } from "@/types/Global";
import { MessageCircleMore } from 'lucide-react';

function LefttSidebar() {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("userInfo");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="w-full h-full p-4">
            <Button variant={"ghost"} className="flex justify-start mb-4 py-7 w-full">
                <Avatar>
                    <AvatarImage
                        src={`${user?.pfp}`} alt={`${user?.username}`} />
                    <AvatarFallback>User</AvatarFallback>
                </Avatar>
                <h1 className="ml-4 text-xl font-semibold">{user?.username}</h1>
            </Button>
            <div className="space-y-4">
                <Button variant={"ghost"} className="flex justify-start px-2 py-6 cursor-pointer w-full">
                    <PeopleIcon className="ml-1" />
                    <h1 className="ml-4 text-lg font-medium">Friends</h1>
                </Button>
                <Button variant={"ghost"} className="flex justify-start px-2 py-6 cursor-pointer w-full">
                    <GroupsIcon className="ml-1" />
                    <h1 className="ml-4 text-lg font-medium">Groups</h1>
                </Button>
                <Button variant={"ghost"} className="flex justify-start px-2 py-6 cursor-pointer w-full">
                    <FeedIcon className="ml-1" />
                    <h1 className="ml-4 text-lg font-medium">Feeds</h1>
                </Button>
                <Button variant={"ghost"} className="flex justify-start px-2 py-6 cursor-pointer w-full">
                    <MessageCircleMore className="ml-1" />
                    <h1 className="ml-4 text-lg font-medium">Messages</h1>
                </Button>
            </div>
        </div>
    );
}

export default LefttSidebar;

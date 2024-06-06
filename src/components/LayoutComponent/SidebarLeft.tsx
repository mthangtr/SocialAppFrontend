"use client";
import { useEffect, useState } from "react";
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

function RightSidebar() {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <aside className="w-full h-full p-4 bg-background">
            <Button variant={"ghost"} className="flex justify-start mb-4 py-7 w-full">
                <Avatar className="cursor-pointer">
                    <AvatarImage
                        src={`${user?.pfp}`} alt={`${user?.username}`} />
                    <AvatarFallback>User</AvatarFallback>
                </Avatar>
                <h1 className="ml-4 text-xl font-semibold ">{user?.username}</h1>
            </Button>
            <nav className="space-y-4">
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
                    <SendIcon className="ml-1" />
                    <h1 className="ml-4 text-lg font-medium">Messages</h1>
                </Button>
            </nav>
        </aside>
    );
}

export default RightSidebar;

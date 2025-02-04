"use client";
import { useState, useEffect } from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import { Button } from "../ui/button";
import { UserType } from "@/types/Global";
import Link from "next/link";

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
                        src={user?.pfp || "/assets/images/default.png"}
                        alt={user?.username || "User"}
                    />
                    <AvatarFallback>User</AvatarFallback>
                </Avatar>
                <h1 className="ml-4 text-xl font-semibold">{user?.username}</h1>
            </Button>
            <div className="flex flex-col gap-2">
                <Link href="/home">
                    <Button variant={"ghost"} className="flex justify-start px-2 py-6 cursor-pointer w-full">
                        <HomeIcon className="ml-1" />
                        <h1 className="ml-4 text-lg font-medium">Home</h1>
                    </Button>
                </Link>
                <Link href="/connect">
                    <Button variant={"ghost"} className="flex justify-start px-2 py-6 cursor-pointer w-full">
                        <PeopleIcon className="ml-1" />
                        <h1 className="ml-4 text-lg font-medium">Friends</h1>
                    </Button>
                </Link>
                <Link href="/profile">
                    <Button variant={"ghost"} className="flex justify-start px-2 py-6 cursor-pointer w-full">
                        <GroupsIcon className="ml-1" />
                        <h1 className="ml-4 text-lg font-medium">Profile</h1>
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default LefttSidebar;

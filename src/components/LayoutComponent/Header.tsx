"use client"
import { useState, useEffect } from "react";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "../ui/button";
import { Input } from "@/components/ui/inputShadcn"
import SendIcon from '@mui/icons-material/Send';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ModeToggle from "@/components/Buttons/ThemeToggle";
import { LogOut } from 'lucide-react';
import axios from "axios";
import { UserType } from "@/types/Global";

async function handleLogOut() {
    try {
        const response = await axios.post("http://localhost:8080/auth/logout");
        if (response.status === 200) {
            localStorage.removeItem("sessionToken");
            localStorage.removeItem("user");
            window.location.href = "/auth/login";
        }
    } catch (error) {
        console.error("Logout error:", error);
    }
}

function Header() {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <header className="bg-background px-4 py-2 border-b-2 shadow-md fixed top-0 z-10 w-full">
            <Menubar className="flex justify-between items-center space-x-4">
                <div className="flex-1">
                    <Input type="search" placeholder="Search..." className="w-full max-w-xs" />
                </div>
                <div className="flex items-center space-x-4">
                    <ModeToggle />
                    <Button variant="outline" size="icon"><SendIcon /></Button>
                    <Button variant="outline" size="icon"><NotificationsIcon /></Button>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <Avatar className="cursor-pointer">
                                <AvatarImage
                                    src={`${user?.pfp}`} alt={`${user?.username}`} />
                                <AvatarFallback>User</AvatarFallback>
                            </Avatar>
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>
                                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem>New Window</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Share</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem onClick={handleLogOut} className="flex justify-between items-center">Log out<LogOut size={16} /></MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </div>
            </Menubar>
        </header >
    );
}

export default Header;

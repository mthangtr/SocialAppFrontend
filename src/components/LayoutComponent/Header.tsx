"use client";
import { useAppSelector, useAppDispatch } from "@/libs/hooks";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/inputShadcn";
import SendIcon from '@mui/icons-material/Send';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ModeToggle from "@/components/Buttons/ThemeToggle";
import { LogOut } from 'lucide-react';
import { UserType } from "@/types/Global";
import {
    useLogoutMutation,
} from "@/libs/features/auth/logresSlice";
import { useRouter } from "next/navigation";
import { MessageCircleMore } from 'lucide-react';

function Header() {
    const user: UserType = useAppSelector((state) => (state as { auth: { userInfo: UserType } }).auth.userInfo);
    const [logout, { isLoading, isSuccess, isError, error }] = useLogoutMutation();
    const router = useRouter();

    const handleLogOut = async () => {
        try {
            await logout({}).unwrap();
            router.push("/auth/login?loggedOut=true");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <header className="bg-background px-4 py-2 border-b-2 shadow-md fixed top-0 z-10 w-full">
            <Menubar className="flex justify-between items-center space-x-4">
                <div className="flex-1">
                    <Input type="search" placeholder="Search..." className="w-full max-w-xs" />
                </div>
                <div className="flex items-center space-x-4">
                    <ModeToggle />
                    <Button variant="outline" size="icon"><MessageCircleMore /></Button>
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
                            <MenubarItem onClick={() => handleLogOut()} className="flex justify-between items-center">
                                Log out<LogOut size={16} />
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </div>
            </Menubar>
        </header>
    );
}

export default Header;

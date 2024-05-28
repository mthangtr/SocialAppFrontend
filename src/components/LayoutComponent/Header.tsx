"use client"
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

function Header() {
    return (
        <header className="bg-background px-4 py-2 border-b-2 shadow-md sticky top-0 z-10 w-full">
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
                                    src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
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
                            <MenubarItem>Print</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </div>
            </Menubar>
        </header>
    );
}

export default Header;

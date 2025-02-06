"use client";
import { useAppSelector } from "@/lib/hooks";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/inputShadcn";
import ModeToggle from "@/components/Buttons/ThemeToggle";
import { LogOut } from 'lucide-react';
import { UserType } from "@/types/Global";
import {
    useLogoutMutation,
} from "@/lib/api/auth/authenApi";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useDebounce from '@/hooks/useDebounce';
import { useFetchUsersSearchQuery } from "@/lib/api/searchApi";
import SearchResultsPopper from "./SearchResultsPopper";
import { X } from "lucide-react";
import { Spinner } from "@nextui-org/react";
import { Home, Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
interface HeaderProps {
    isSearchPage?: boolean;
}

interface UsersSearchResponseProps {
    users: UserType[];
    totalPages: number;
}

const Header: React.FC<HeaderProps> = ({ isSearchPage }) => {
    const user: UserType = useAppSelector((state) => (state as { auth: { userInfo: UserType } }).auth.userInfo);
    const pathname = usePathname();
    const [inputValue, setInputValue] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const [logout] = useLogoutMutation();

    const debouncedSearchTerm = useDebounce(inputValue, 500);
    const { data: usersSearchResponse, isLoading: isSearchLoading } = useFetchUsersSearchQuery({ page, search: debouncedSearchTerm }, { skip: !debouncedSearchTerm }) as { data: UsersSearchResponseProps, isLoading: boolean };

    useEffect(() => {
        if (inputValue) {
            setIsLoading(true);
        }
    }, [inputValue]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsLoading(false);
        }
    }, [debouncedSearchTerm])

    const handleLogOut = async () => {
        try {
            await logout({}).unwrap();
            router.push("/auth/login?loggedOut=true");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && inputValue.trim() !== "") {
            router.push(`/search?query=${encodeURIComponent(inputValue.trim())}`);
        }
    };

    return (
        <header className="bg-background px-4 py-2 border-b-2 shadow-md fixed top-0 z-10 w-full">
            <Menubar className="flex justify-between items-center space-x-4">
                {/* Search Box with Input and Clear Button */}
                <div className="relative w-full max-w-xs">
                    <div className="relative flex items-center border border-input bg-transparent rounded-md shadow-sm">
                        {/* Input Field */}
                        <Input
                            type="text"
                            placeholder="Search..."
                            className="w-full h-10 pl-3 pr-10 bg-transparent border-none focus:outline-none"
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                setShowResults(true);
                            }}
                            onKeyDown={handleKeyDown}
                        />
                        {/* Spinner or Clear Button */}
                        {inputValue !== "" && (
                            <div className="absolute right-2 flex items-center">
                                {isLoading ? (
                                    <Spinner size="sm" className="text-gray-500 dark:text-white/50 pr-2" />
                                ) : (
                                    <button
                                        className="text-gray-500 dark:text-white/50 hover:text-gray-700 dark:hover:text-white pr-2"
                                        onClick={() => setInputValue("")}
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    {inputValue != "" && <SearchResultsPopper
                        users={usersSearchResponse?.users || []}
                        showResults={showResults}
                        inputValue={inputValue}
                        setShowResults={setShowResults}
                    />}
                </div>
                {/* isSearchPage => show the h2 Results here but the problems was that this position was not in the center position of the header  */}
                <div className="flex items-center space-x-4">
                    {pathname !== "/home" &&
                        <Link href={`/home`} passHref>
                            <Button variant="outline" size="icon">
                                <Home />
                            </Button>
                        </Link>}
                    <Button variant="outline" size="icon">
                        <Bell />
                    </Button>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <Avatar className="cursor-pointer">
                                <AvatarImage
                                    src={`${user?.pfp}`} alt={`${user?.username}`} />
                                <AvatarFallback>User</AvatarFallback>
                            </Avatar>
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>Profile</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>
                                Theme: <MenubarShortcut><ModeToggle /></MenubarShortcut>
                            </MenubarItem>
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

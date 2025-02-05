import React, { FC, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserType } from "@/types/Global";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SearchResultsPopperProps {
    users: UserType[];
    showResults: boolean;
    inputValue: string;
    setShowResults: (value: boolean) => void;
}

const SearchResultsPopper: FC<SearchResultsPopperProps> = ({ users, showResults, inputValue, setShowResults }) => {
    const resultsRef = useRef<HTMLDivElement>(null);

    // Close results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setShowResults]);

    if (!showResults) return null;

    return (
        <Card ref={resultsRef} className="absolute top-full bg-background left-0 mt-2 shadow-lg rounded-md w-full max-w-xs z-50 p-2">
            {users.length > 0 ? (
                <div className="flex flex-col items-start gap-1">
                    {users.map((user) => (
                        <Link key={user._id as React.Key} href={`/profile/${user._id}`} passHref className="w-full">
                            <Button variant="ghost" size="lg" className="flex items-center justify-start w-full gap-4">
                                <Avatar className="p-1">
                                    <AvatarImage src={user?.pfp} alt={user?.username} />
                                    <AvatarFallback>{user?.username[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">{user.username}</span>
                            </Button>
                        </Link>
                    ))}
                    <Link href={`/search?query=${encodeURIComponent(inputValue.trim())}`} passHref>
                        <Button variant="link" size="lg" className="flex items-center w-full">
                            <span className="text-sm font-medium">See all results</span>
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="text-center text-gray-500 p-3">No results found</div>
            )}
        </Card>
    );
};

export default SearchResultsPopper;

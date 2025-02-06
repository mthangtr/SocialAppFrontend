import React, { FC, Key } from "react";
import UserCard from "./UserCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { UserType } from "@/types/Global";
interface UsersSearchListSection {
    userSearchResults?: UserType[];
    searchQuerry?: string;
    onSeeMoreClick?: () => void;
    canSeeMore?: boolean;
};
const UsersSearchListSection: FC<UsersSearchListSection> = ({ userSearchResults, searchQuerry, onSeeMoreClick, canSeeMore }) => {
    return (
        <Card className="mt-4 p-4 flex flex-col justify-center4">
            <CardHeader>
                <CardTitle>People</CardTitle>
                <CardDescription>Results of: {searchQuerry}</CardDescription>
            </CardHeader>
            <div className="flex flex-wrap justify-center gap-4">
                {userSearchResults.length > 0 ? userSearchResults?.map((user) => (
                    <UserCard key={user._id as Key} user={user} />
                )) : <div className="flex items-center justify-center w-full mt-4">
                    <span>No result found</span>
                </div>}
            </div>
            {canSeeMore ? <Button variant="ghost" size="lg" className="flex items-center w-full mt-4" onClick={onSeeMoreClick}>
                <div className="flex items-center justify-center space-x-2 text-sm font-medium">
                    <span>See more</span>
                    <Search />
                </div>
            </Button> : <>
                <Button variant="ghost" size="lg" className="flex items-center w-full mt-4" disabled>
                    <div className="flex items-center justify-center space-x-2 text-sm font-medium">
                        <span>No more result</span>
                    </div>
                </Button>
            </>}
        </Card>
    );
};

export default UsersSearchListSection;
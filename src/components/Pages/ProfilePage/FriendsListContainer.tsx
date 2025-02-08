import { UserType } from "@/types/Global";
import React, { Key } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface FriendsListContainerProps {
    friends?: UserType[];
}

function FriendsListContainer({ friends }: FriendsListContainerProps): React.ReactElement {
    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Friends</CardTitle>
                <CardDescription>86</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-4 gap-4">
                {friends?.map((friend) => (
                    <Card key={friend?._id as Key} className="flex flex-col items-center p-2">
                        <Avatar className="cursor-pointer">
                            <AvatarImage
                                src={`${friend?.pfp}` || "/assets/images/default.png"} alt={`${friend?.username}`} />
                            <AvatarFallback>User</AvatarFallback>
                        </Avatar>
                        <h1 className="text-lg mt-2">{friend?.username}</h1>
                        <p className="text-sm text-gray-500 w-full truncate">{friend?.bio}</p>
                    </Card>
                ))}
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button>Show more</Button>
            </CardFooter>
        </Card>
    );
}

export default FriendsListContainer;
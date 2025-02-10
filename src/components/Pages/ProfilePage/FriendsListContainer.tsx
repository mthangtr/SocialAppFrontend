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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface FriendsListContainerProps {
    friends?: UserType[];
    onDialogToggle?: () => void;
}

function FriendsListContainer({ friends, onDialogToggle }: FriendsListContainerProps): React.ReactElement {
    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Friends</CardTitle>
                <CardDescription>{friends?.length}</CardDescription>
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
                        <p className="text-sm text-gray-500 w-full text-center truncate">{friend?.bio !== "" ? friend?.bio : "No bio yet"}</p>
                    </Card>
                ))}
            </CardContent>
            <CardFooter className="flex justify-end">
                <Dialog>
                    <DialogTrigger className="hover:underline" onClick={onDialogToggle}>
                        Show more
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Friends</DialogTitle>
                            <DialogDescription>69</DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-2">
                            {friends?.map((friend) => (
                                <Card key={friend?._id as Key} className="flex flex-col items-center p-2">
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage
                                            src={`${friend?.pfp}` || "/assets/images/default.png"} alt={`${friend?.username}`} />
                                        <AvatarFallback>User</AvatarFallback>
                                    </Avatar>
                                    <h1 className="text-lg mt-2">{friend?.username}</h1>
                                    <p className="text-sm text-gray-500 w-full text-center truncate">{friend?.bio !== "" ? friend?.bio : "No bio yet"}</p>
                                </Card>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
}

export default FriendsListContainer;
import React, { FC } from "react";
import { UserType } from "@/types/Global";
import { Avatar } from "@nextui-org/avatar";
import { Card } from "@/components/ui/card";
import Link from "next/link";
interface UserCardProps {
    user?: UserType;
}
export const UserCard: FC<UserCardProps> = ({ user }) => {
    return (
        <Link href={`/profile/${user?._id}`} passHref>
            <Card className="flex flex-col items-center justify-center w-32 h-32 p-4 rounded-lg shadow-md cursor-pointer">
                <Avatar size="lg" src={user?.pfp || "/assets/images/default.png"} className="mb-2" />
                <h3 className="text-sm font-semibold text-center">{user?.username}</h3>
            </Card>
        </Link>
    );
};

export default UserCard;

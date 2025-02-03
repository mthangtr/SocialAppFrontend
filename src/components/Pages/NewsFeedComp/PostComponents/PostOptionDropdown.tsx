"use client";

import React from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { PostType, UserType } from "@/types/Global";

interface PostOptionDropdownProps {
    postData: PostType;
    user: UserType;
    onEdit?: (postId: string) => void;
    onDelete?: (postId: string) => void;
    onReport?: (postId: string) => void;
    onChangePrivacy?: (postId: string, newPrivacy: string) => void;
}

const getPrivacyActions = (currentPrivacy: string) => {
    // Return the relevant privacy options based on currentPrivacy
    switch (currentPrivacy) {
        case "public":
            return [
                { label: "Set as Private", value: "private" },
                { label: "Set as Friends Only", value: "friends" },
            ];
        case "private":
            return [
                { label: "Set as Public", value: "public" },
                { label: "Set as Friends Only", value: "friends" },
            ];
        case "friends":
            return [
                { label: "Set as Public", value: "public" },
                { label: "Set as Private", value: "private" },
            ];
        default:
            return [];
    }
};

const PostOptionDropdown: React.FC<PostOptionDropdownProps> = ({
    postData,
    user,
    onEdit,
    onDelete,
    onReport,
    onChangePrivacy,
}) => {
    const isOwner = postData.user?._id === user?._id;
    const privacyActions = getPrivacyActions(postData.privacy);

    const handleEdit = () => {
        if (onEdit) onEdit(postData._id);
    };

    const handleDelete = () => {
        if (onDelete) onDelete(postData._id);
    };

    const handleReport = () => {
        if (onReport) onReport(postData._id);
    };

    const handleChangePrivacy = (newPrivacy: string) => {
        if (onChangePrivacy) onChangePrivacy(postData._id, newPrivacy);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="ghost" size="icon">
                    <Ellipsis />
                </Button>
            </DropdownMenuTrigger>

            {isOwner ? (
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <button
                            onClick={handleEdit}>Edit</button>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-red-500"
                    >
                        <button onClick={handleDelete}>
                            Delete
                        </button>
                    </DropdownMenuItem>

                    {/* Privacy change options */}
                    {privacyActions.map(({ label, value }) => (
                        <DropdownMenuItem
                            key={value}
                        >
                            <button
                                onClick={() => handleChangePrivacy(value)}>{label}</button>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            ) : (
                <DropdownMenuContent align="end">
                    <DropdownMenuItem> <button
                        onClick={handleReport}>Report</button></DropdownMenuItem>
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    );
};

export default PostOptionDropdown;

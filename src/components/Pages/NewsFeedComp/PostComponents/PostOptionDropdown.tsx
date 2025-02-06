"use client";
import React from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { PostType, UserType } from "@/types/Global";

interface PostOptionDropdownProps {
    postData: PostType;
    user: UserType;
    onToggleEdit?: () => void;
    onDelete?: (postId: string) => void;
    onReport?: (postId: string) => void;
    onChangePrivacy?: (newPrivacy: string) => void;
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
    onToggleEdit,
    onDelete,
    onReport,
    onChangePrivacy,
}) => {
    const isOwner = postData?.user?._id === user?._id;
    const privacyActions = getPrivacyActions(postData?.privacy);

    const handleEdit = () => {
        if (onToggleEdit) onToggleEdit();
    };

    const handleDelete = () => {
        if (onDelete) onDelete(postData?._id);
    };

    const handleReport = () => {
        if (onReport) onReport(postData?._id);
    };

    const handleChangePrivacy = (newPrivacy: string) => {
        if (onChangePrivacy) onChangePrivacy(newPrivacy);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Ellipsis />
            </DropdownMenuTrigger>

            {isOwner ? (
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleEdit}>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-red-500"
                        onClick={handleDelete}
                    >
                        Delete
                    </DropdownMenuItem>

                    {/* Privacy change options */}
                    {privacyActions.map(({ label, value }) => (
                        <DropdownMenuItem
                            key={value}
                            onClick={() => handleChangePrivacy(value)}
                        >
                            {label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            ) : (
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleReport}>Report</DropdownMenuItem>
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    );
};

export default PostOptionDropdown;

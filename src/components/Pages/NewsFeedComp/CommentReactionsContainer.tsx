import React, { useMemo, useState } from "react";
import { Avatar } from "@nextui-org/react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { UserType, CommentType } from "@/types/Global";

interface CommentReactionsContainerProps {
    comment: CommentType;
    currentUser?: UserType;
    /**
     * Only for demonstration if you want to limit how many users you show in the dropdown, etc.
     */
    maxUsersToShow?: number;
}

/**
 * Lists all users who reacted to a comment, grouped by reaction type.
 * Shows only the top 3 reaction types (largest counts) in the main UI,
 * along with a total reaction count. Clicking that area opens a dropdown
 * showing all reaction types and the users who reacted.
 */
const CommentReactionsContainer: React.FC<CommentReactionsContainerProps> = ({
    comment,
    currentUser,
    maxUsersToShow = 5,
}) => {
    // Group reactions by type
    const reactionEntries = useMemo(() => {
        if (!comment?.reactions || comment.reactions.length === 0) return [];
        // Transform the { type: user[] } object into an array for easy sorting
        const grouped = comment.reactions.reduce<Record<string, UserType[]>>((acc, r) => {
            const type = r.type;
            if (!acc[type]) acc[type] = [];
            acc[type].push(r.user);
            return acc;
        }, {});

        // Convert to array: [ { type, users }, ... ] and sort by count descending
        const arr = Object.entries(grouped).map(([type, users]) => ({ type, users }));
        arr.sort((a, b) => b.users.length - a.users.length);
        return arr;
    }, [comment]);

    // If no reactions, render nothing
    if (!reactionEntries || reactionEntries.length === 0) {
        return null;
    }

    // Take the top 3 reaction types (largest count)
    const topThree = reactionEntries.slice(0, 3);
    // Calculate total number of reactions across all types
    const totalReactions = reactionEntries.reduce((acc, entry) => acc + entry.users.length, 0);

    // Map each reaction type to an emoji (or custom icon)
    const getEmojiForType = (type: string) => {
        switch (type) {
            case "Like": return "👍";
            case "Love": return "❤️";
            case "Haha": return "😂";
            case "Wow": return "😮";
            case "Sad": return "😢";
            case "Angry": return "😡";
            default: return "👍";
        }
    };

    return (
        <div className="flex items-center gap-1 mt-2">
            {/* Dropdown with top 3 icons + total count as the trigger */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 cursor-pointer text-xs font-medium text-gray-500 dark:text-white/50">
                        {/* Show the top 3 reaction icons */}
                        {topThree.map((entry) => (
                            <span key={entry.type} className="text-base">
                                {getEmojiForType(entry.type)}
                            </span>
                        ))}
                        {/* Total reaction count */}
                        <span>{totalReactions}</span>
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="max-h-96 overflow-auto">
                    {reactionEntries.map(({ type, users }) => (
                        <DropdownMenuItem key={type} className="p-2 cursor-default hover:bg-transparent">
                            <div>
                                {/* Reaction type header (icon + label + user count) */}
                                <div className="flex items-center gap-2 font-semibold">
                                    <span>{getEmojiForType(type)}</span>
                                    <span>{type} ({users.length})</span>
                                </div>
                                {/* List of users for this reaction type */}
                                <ul className="mt-1 pl-6 space-y-1">
                                    {users.slice(0, maxUsersToShow).map((reactingUser, index) => {
                                        const key = reactingUser?._id ? String(reactingUser._id) : String(index);

                                        return (
                                            <li key={key} className="flex items-center gap-2">
                                                <Avatar src={reactingUser?.pfp} size="sm" />
                                                <span className="text-sm">{reactingUser?.username}</span>
                                            </li>
                                        )
                                    })}
                                    {users.length > maxUsersToShow && (
                                        <li className="text-sm text-gray-500">
                                            + {users.length - maxUsersToShow} more
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default CommentReactionsContainer;

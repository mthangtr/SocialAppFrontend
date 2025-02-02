import React, { useMemo, useState } from "react";
import { Avatar } from "@nextui-org/react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { UserType, CommentType } from "@/types/Global";
import { Tabs, Tab } from "@heroui/tabs";

interface CommentReactionsDropdownProps {
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
const CommentReactionsDropdown: React.FC<CommentReactionsDropdownProps> = ({
    comment,
    currentUser,
    maxUsersToShow = 5,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
                <DropdownMenuTrigger asChild onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
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

                <DropdownMenuContent align="end" className="max-h-96 overflow-auto bg-background">
                    <Tabs className="" aria-label="Reaction Tabs" items={reactionEntries}>
                        {(item) => (
                            <Tab key={item.type} title={`${getEmojiForType(item.type)} (${item.users.length})`}>
                                <ul className="mt-2 mb-1 space-y-1 flex flex-col gap-1">
                                    {item.users.slice(0, maxUsersToShow).map((user, index) => {
                                        return (
                                            <li key={index} className="flex items-center gap-2">
                                                <Avatar src={user?.pfp} size="sm" />
                                                <span className="text-sm">{user?.username}</span>
                                            </li>
                                        );
                                    })}
                                    {/* {item.users.length > maxUsersToShow && (
                                        <li className="text-sm text-gray-500">
                                            + {item.users.length - maxUsersToShow} more
                                        </li>
                                    )} */}
                                </ul>
                            </Tab>
                        )}
                    </Tabs>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default CommentReactionsDropdown;

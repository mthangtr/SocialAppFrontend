import React, { useEffect, useMemo } from "react";
import { Avatar } from "@nextui-org/react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Tabs, Tab } from "@heroui/tabs";
import { UserType, PostType } from "@/types/Global";

interface PostReactionsDropdownProps {
    post: PostType;
    currentUser?: UserType;
    /**
     * Limit the number of users shown per reaction tab
     */
    maxUsersToShow?: number;
}

/**
 * Similar to CommentReactionsDropdown, but for a Post.
 * Shows top 3 reaction types in the dropdown trigger
 * + total reaction count. When clicked, opens a dropdown
 * with HeroUI tabs for each reaction type and the users
 * who reacted.
 */
const PostReactionsDropdown: React.FC<PostReactionsDropdownProps> = ({
    post,
    currentUser,
    maxUsersToShow = 5,
}) => {
    // 1) Build an array of { type, users[] }, sorted by count desc
    const reactionEntries = useMemo(() => {
        if (!post?.reactions || post.reactions.length === 0) return [];

        const grouped = post.reactions.reduce<Record<string, UserType[]>>((acc, r) => {
            if (!acc[r.type]) acc[r.type] = [];
            acc[r.type].push(r.user);
            return acc;
        }, {});

        const arr = Object.entries(grouped).map(([type, users]) => ({ type, users }));
        // Sort so that reaction type with more users is first
        arr.sort((a, b) => b.users.length - a.users.length);
        return arr;
    }, [post]);

    // If no reactions, render nothing
    if (reactionEntries.length === 0) return null;

    // 2) Take top 3 reaction types for the trigger
    const topThree = reactionEntries.slice(0, 3);

    // 3) Calculate total reaction count
    const totalReactions = reactionEntries.reduce((sum, entry) => sum + entry.users.length, 0);

    // 4) Reaction type -> emoji (or icon)
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
        <div className="flex items-center gap-1">
            <DropdownMenu>
                {/* Top-3 emojis + total count as the trigger */}
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-white/50 hover:underline cursor-pointer">
                        {topThree.map((entry) => (
                            <span key={entry.type} className="text-base">
                                {getEmojiForType(entry.type)}
                            </span>
                        ))}
                        <span>{totalReactions}</span>
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start" side="bottom" className="p-2 max-h-96 overflow-auto">
                    <Tabs aria-label="Post Reactions" items={reactionEntries}>
                        {(item) => (
                            <Tab key={item.type} title={`${getEmojiForType(item.type)} (${item.users.length})`}>
                                <ul className="mt-2 space-y-2">
                                    {item.users.slice(0, maxUsersToShow).map((user, index) => {
                                        return (
                                            <li key={index} className="flex items-center gap-2">
                                                <Avatar src={user?.pfp} size="sm" />
                                                <span className="text-sm">{user?.username}</span>
                                            </li>
                                        );
                                    })}
                                    {item.users.length > maxUsersToShow && (
                                        <li className="text-sm text-gray-500">
                                            + {item.users.length - maxUsersToShow} more
                                        </li>
                                    )}
                                </ul>
                            </Tab>
                        )}
                    </Tabs>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default PostReactionsDropdown;

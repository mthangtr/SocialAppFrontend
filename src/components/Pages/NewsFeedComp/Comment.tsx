import { useState, useEffect } from "react";
import { Input } from "@/components/ui/inputShadcn";
import { Avatar } from "@nextui-org/react";
import ReactionWordButton from "@/components/Buttons/ReactionWordButton";
import type { CommentType } from "@/types/Global";
import { TimeAgo } from "@/utils/FormatTime";

function Comment({ commentData }: { commentData: CommentType }) {
    const [showFullText, setShowFullText] = useState(false);
    const [showRepliesInput, setShowRepliesInput] = useState(false);
    const [showReplies, setShowReplies] = useState(false);

    const maxLength = 200;

    const text = commentData?.content || "";
    const commenter = commentData?.user?.username || "Anonymous";
    const avatar = commentData?.user?.pfp || "https://i.pravatar.cc/150?u=default";
    const replies = commentData?.children || [];
    const updatedAt = commentData?.updatedAt || null;

    useEffect(() => {
        if (text.length <= maxLength) {
            setShowFullText(true);
        }
    }, [text]);

    const displayText = showFullText ? text : text.substring(0, maxLength) + "...";

    const toggleShowMore = () => {
        setShowFullText(!showFullText);
    };

    const toggleRepliesInput = () => {
        setShowRepliesInput(!showRepliesInput);
    };

    const toggleReplies = () => {
        setShowReplies(!showReplies);
    };

    const handleReaction = (reaction: string) => {
        console.log(`Reacted with: ${reaction}`);
    };

    return (
        <div className="flex flex-col py-3">
            {/* Comment Section */}
            <div className="flex px-2">
                <div className="pt-1 pl-1">
                    <Avatar
                        className="mr-2 select-none"
                        src={avatar}
                        size="sm"
                        alt={`${commenter}'s avatar`}
                    />
                </div>
                <div className="px-2 rounded-lg flex-1">
                    <div className="flex items-center ">
                        {/* Commenter's Name */}
                        <p className="font-semibold text-sm">{commenter}</p>
                    </div>
                    {/* Comment Content */}
                    <p className="flex items-center text-sm text-wrap mt-1">
                        {displayText}
                        {text.length > maxLength && (
                            <button
                                onClick={toggleShowMore}
                                className="select-none text-sm font-medium hover:underline ml-2 text-gray-500 dark:text-white/50"
                            >
                                {showFullText ? "Show less" : "Show more"}
                            </button>
                        )}
                    </p>

                    {/* Reaction and Reply Buttons */}
                    <div className="flex items-center mt-2 gap-2">
                        <p className="text-gray-500 dark:text-white/50 text-xs font-semibold hover:underline select-none">
                            {TimeAgo(updatedAt.toLocaleString())}
                        </p>
                        <ReactionWordButton onReact={handleReaction} />
                        <button
                            onClick={toggleRepliesInput}
                            className="text-gray-500 dark:text-white/50 font-semibold hover:underline text-sm select-none"
                        >
                            Reply
                        </button>
                        {replies.length > 0 && (
                            <button
                                onClick={toggleReplies}
                                className="text-gray-500 dark:text-white/50 font-semibold hover:underline text-sm select-none"
                            >
                                {showReplies ? "Hide Replies" : `View ${replies.length} Replies`}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Reply Input */}
            {showRepliesInput && (
                <div className="flex items-center mt-2 ml-14">
                    <Avatar
                        className="mr-2"
                        src={avatar}
                        size="sm"
                        alt="Your avatar"
                    />
                    <Input
                        className="w-full border bg-gray-100 rounded-lg px-4 py-2 dark:bg-[hsl(0,0%,20%)]"
                        type="text"
                        placeholder="Write your reply..."
                    />
                </div>
            )}

            {/* Replies Section */}
            {showReplies && replies.length > 0 && (
                <div className="ml-8 mt-2 border-l pl-4">
                    {replies.map((reply) => (
                        <Comment key={reply._id} commentData={reply} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Comment;

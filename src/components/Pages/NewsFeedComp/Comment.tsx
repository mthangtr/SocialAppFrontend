import { useState } from "react";
import { Avatar } from "@nextui-org/react";
import { Input } from "@/components/ui/inputShadcn";
import { Button } from "@/components/ui/button";
import { CommentType } from "@/types/Global";
import { SendHorizontal } from "lucide-react";
import ReactionWordButton from "@/components/Buttons/ReactionWordButton";
import { TimeAgo } from "@/utils/FormatTime";

function Comment({
    commentData,
    onReply,
    activeReplyId,
    setActiveReplyId,
}: {
    commentData: CommentType;
    onReply: (parentId: string, content: string) => void;
    activeReplyId: string | null;
    setActiveReplyId: (id: string | null) => void;
}) {
    const [showRepliesInput, setShowRepliesInput] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [showReplies, setShowReplies] = useState(false);

    const handleToggleReplyInput = () => {
        if (activeReplyId === commentData._id) {
            setActiveReplyId(null);
        } else {
            setActiveReplyId(commentData._id);
        }
    };

    const handleSendReply = () => {
        if (replyText.trim()) {
            onReply(commentData._id, replyText.trim());
            setReplyText("");
            setShowRepliesInput(false); // Close the input after replying
        }
    };

    const handleToggleReplies = () => {
        setShowReplies(!showReplies);
    };

    return (
        <div className="flex flex-col py-3">
            {/* Comment content */}
            <div className="flex px-2">
                <div className="pt-1 pl-1">
                    <Avatar
                        className="mr-2 select-none"
                        src={commentData?.user?.pfp || ""}
                        size="sm"
                        alt={`${commentData?.user?.username}'s avatar`}
                    />
                </div>
                <div className="px-2 rounded-lg">
                    <p className="font-semibold text-sm flex">{commentData?.user?.username}</p>
                    <p className="text-sm mt-1 flex">{commentData?.content}</p>
                    <div className="flex items-center mt-2 gap-2">
                        <p className="text-xs font-semibold text-gray-500">
                            {TimeAgo(commentData?.createdAt.toString())}
                        </p>
                        <ReactionWordButton onReact={(reaction) => console.log(reaction)} />
                        <button
                            onClick={handleToggleReplyInput}
                            className="text-sm font-semibold text-gray-500 hover:underline"
                        >
                            Reply
                        </button>
                        {commentData.children?.length > 0 && (
                            <button
                                onClick={handleToggleReplies}
                                className="text-sm font-semibold text-gray-500 hover:underline"
                            >
                                {showReplies
                                    ? `Hide Replies (${commentData.children.length})`
                                    : `View Replies (${commentData.children.length})`}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Reply input */}
            {activeReplyId === commentData._id && (
                <div className="flex items-center mt-2 ml-10">
                    <Avatar
                        src={commentData?.user?.pfp || ""}
                        size="sm"
                        className="mr-2"
                        alt="Your avatar"
                    />
                    <Input
                        className="flex-1 ml-2"
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                    />
                    <Button
                        variant="ghost"
                        disabled={!replyText.trim()}
                        onClick={handleSendReply}
                    >
                        <SendHorizontal size={20} />
                    </Button>
                </div>
            )}

            {/* Replies section */}
            {showReplies && commentData.children?.length > 0 && (
                <div className="ml-8 mt-2 border-l pl-4">
                    {commentData.children.map((reply) => (
                        <Comment
                            key={reply._id}
                            commentData={reply}
                            onReply={onReply}
                            activeReplyId={activeReplyId}
                            setActiveReplyId={setActiveReplyId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Comment;
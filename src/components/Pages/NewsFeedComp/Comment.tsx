import { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/react";
import { Input } from "@/components/ui/inputShadcn";
import { Button } from "@/components/ui/button";
import { CommentType } from "@/types/Global";
import { SendHorizontal } from "lucide-react";
import ReactionWordButton from "@/components/Buttons/ReactionWordButton";
import { TimeAgo } from "@/utils/FormatTime";
import { useFetchRepliesForCommentQuery } from "@/libs/features/commentsSlice";

interface ReplyCommentResponse {
    replies: CommentType[];
    hasMoreReplies: boolean;
}

function Comment({
    commentData,
    onReply,
    activeReplyId,
    setActiveReplyId,
    depth = 0,
}: {
    commentData: CommentType;
    onReply: (parentId: string, content: string) => Promise<CommentType>;
    activeReplyId: string | null;
    setActiveReplyId: (id: string | null) => void;
    depth?: number;
}) {
    const [replyText, setReplyText] = useState("");
    const [replies, setReplies] = useState<CommentType[]>([]);
    const [hasMoreReplies, setHasMoreReplies] = useState(false);
    const [pageReplies, setPageReplies] = useState(1);

    const { data: repliesData } = useFetchRepliesForCommentQuery({
        commentId: commentData._id,
        page: pageReplies
    }) as { data: ReplyCommentResponse };

    useEffect(() => {
        if (repliesData) {
            setReplies((prev) => {
                const existingIds = new Set(prev.map((reply) => reply._id));
                const newReplies = repliesData?.replies.filter(
                    (reply) => !existingIds.has(reply._id)
                );
                console.log(newReplies);
                return [...prev, ...newReplies];
            });
            setHasMoreReplies(repliesData.hasMoreReplies);
        }
    }, [repliesData, pageReplies]);

    const handleToggleReplyInput = () => {
        if (activeReplyId === commentData._id) {
            setActiveReplyId(null);
        } else {
            setActiveReplyId(commentData._id);
        }
    };

    const handleSendReply = async () => {
        if (!replyText.trim()) return;
        try {
            const newReply = await onReply(commentData._id, replyText.trim());
            setReplies((prev) => [newReply, ...prev]);
            setReplyText("");
        } catch (error) {
            console.error("Failed to send reply:", error);
        }
    };

    const loadMoreReplies = () => {
        if (hasMoreReplies) {
            setPageReplies((prev) => prev + 1);
        }
    };

    const indentLevel = depth < 2 ? `ml-10 px-2` : ``;

    const borderDepth = depth < 2 ? `border-l` : ``;

    const commentParrentClass = depth < 1 ? `py-3` : `mt-2`;

    return (
        <div className={`flex flex-col ${commentParrentClass}`}>
            {/* Comment content */}
            <div className="flex p-2">
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
                    </div>
                </div>
            </div>

            {/* Reply input */}
            {activeReplyId === commentData._id && (
                <div className="flex items-center mt-1 pb-2 ml-10">
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
            {commentData.children?.length > 0 &&
                <div className={` ${indentLevel} ${borderDepth}`}>
                    {replies.map((reply) => (
                        <Comment
                            key={reply._id}
                            commentData={reply}
                            onReply={onReply}
                            activeReplyId={activeReplyId}
                            setActiveReplyId={setActiveReplyId}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            }
            {hasMoreReplies &&
                <div className="flex justify-items-start ml-10">
                    <button
                        onClick={loadMoreReplies}
                        className="text-sm font-semibold text-gray-500 hover:underline"
                    >
                        More replies
                    </button>
                </div>}
        </div>
    );
}

export default Comment;
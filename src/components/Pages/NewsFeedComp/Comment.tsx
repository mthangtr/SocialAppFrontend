import { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/react";
import { Input } from "@/components/ui/inputShadcn";
import { Button } from "@/components/ui/button";
import { CommentType, UserType } from "@/types/Global";
import { SendHorizontal } from "lucide-react";
import ReactionWordButton from "@/components/Buttons/ReactionWordButton";
import { TimeAgo } from "@/utils/FormatTime";
import { useFetchRepliesForCommentQuery, useEditCommentMutation, useRemoveCommentMutation } from "@/libs/features/commentsSlice";
import { Ellipsis } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface ReplyCommentResponse {
    replies: CommentType[];
    hasMoreReplies: boolean;
}

function Comment({
    commentData,
    user,
    onReply,
    activeReplyId,
    setActiveReplyId,
    depth = 0,
}: {
    commentData: CommentType;
    user: UserType
    onReply: (parentId: string, content: string) => Promise<CommentType>;
    activeReplyId: string | null;
    setActiveReplyId: (id: string | null) => void;
    depth?: number;
}) {
    const [inputOpen, setInputOpen] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [replies, setReplies] = useState<CommentType[]>([]);
    const [hasMoreReplies, setHasMoreReplies] = useState(false);
    const [pageReplies, setPageReplies] = useState(1);
    const [initContent, setInitContent] = useState(commentData?.content);

    //EDIT State
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(initContent);

    // RTK Query
    const { data: repliesData } = useFetchRepliesForCommentQuery({
        commentId: commentData._id,
        page: pageReplies
    }) as { data: ReplyCommentResponse };
    const [editComment] = useEditCommentMutation();
    const [removeComment] = useRemoveCommentMutation();

    useEffect(() => {
        if (repliesData) {
            setReplies((prev) => {
                const existingIds = new Set(prev.map((reply) => reply._id));
                const newReplies = repliesData?.replies.filter(
                    (reply) => !existingIds.has(reply._id)
                );
                return [...prev, ...newReplies];
            });
            setHasMoreReplies(repliesData.hasMoreReplies);
        }
    }, [repliesData, pageReplies]);

    const handleToggleReplyInput = () => {
        setInputOpen((prev) => !prev);
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

    const handleSendEditComment = async (replyId: string, content: string) => {
        try {
            const updatedReply = await editComment({ id: replyId, content }).unwrap();
            setInitContent(updatedReply?.content);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to edit reply:", error);
        }
    }

    const handleRemoveComment = async (replyId: string) => {
        try {
            await removeComment(replyId).unwrap();
            setReplies((prev) => prev.filter((reply) => reply._id !== replyId));
        } catch (error) {
            console.error("Failed to remove reply:", error);
        }
    }

    // Style "indent" cho replies
    const indentLevel = depth < 2 ? `ml-10 pl-2` : ``;
    const borderDepth = depth < 2 ? `border-l` : ``;
    const commentParrentClass = depth < 1 ? `pb-2` : `mt-2`;

    return (
        <div className={`flex flex-col ${commentParrentClass} `}>
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
                <div className="px-2 rounded-lg w-full group">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm flex">{commentData?.user?.username}</p>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant="ghost" size="icon">
                                    <Ellipsis />
                                </Button>
                            </DropdownMenuTrigger>
                            {commentData?.user?._id === user?._id ? (
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => { setEditContent(initContent); setIsEditing(true); }}>
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="text-red-500"
                                        onClick={() => handleRemoveComment(commentData?._id)}>
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            ) : (
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        Report
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            )}
                        </DropdownMenu>
                    </div>
                    {isEditing ? (
                        <Input
                            className="mt-1"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                        />
                    ) : (
                        <p className="text-sm mt-1 flex">{initContent}</p>
                    )}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center mt-2 gap-2">
                            <p className="text-xs font-semibold text-gray-500 dark:text-white/50">
                                {TimeAgo(commentData?.updatedAt.toString())}
                            </p>
                            <ReactionWordButton onReact={(reaction) => console.log(reaction)} />
                            <button
                                onClick={handleToggleReplyInput}
                                className="text-xs font-semibold text-gray-500 dark:text-white/50 hover:underline select-none"
                            >
                                Reply
                            </button>
                        </div>
                        {isEditing ? (
                            <div className="flex items-center mt-2 gap-2">
                                {initContent != editContent && <button
                                    onClick={() => { handleSendEditComment(commentData._id, editContent); }}
                                    className="text-xs font-semibold text-gray-500 dark:text-white/50 hover:underline select-none"
                                >
                                    Save
                                </button>}
                                <button
                                    onClick={() => { setIsEditing(false); setEditContent(initContent); }}
                                    className="text-xs font-semibold text-gray-500 dark:text-white/50 hover:underline select-none"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            {/* Reply input */}
            {activeReplyId === commentData._id && inputOpen ? (
                <div className="flex items-center mt-1 pb-2 ml-14 px-1">
                    <Avatar
                        src={user?.pfp || ""}
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
            ) : null}

            {/* Replies section */}
            {commentData.children?.length > 0 &&
                <div className={` ${indentLevel} ${borderDepth}`}>
                    {replies.map((reply) => (
                        <Comment
                            key={reply._id}
                            user={user}
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
                        className="text-sm font-semibold text-gray-500 dark:text-white/50 hover:underline"
                    >
                        More replies
                    </button>
                </div>}
        </div>
    );
}

export default Comment;
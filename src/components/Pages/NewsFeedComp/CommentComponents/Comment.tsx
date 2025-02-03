import { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/react";
import { Input } from "@/components/ui/inputShadcn";
import { Button } from "@/components/ui/button";
import { CommentType, UserType } from "@/types/Global";
import { SendHorizontal } from "lucide-react";
import { TimeAgo } from "@/utils/FormatTime";
import { useFetchRepliesForCommentQuery, useEditCommentMutation, useRemoveCommentMutation, useReactToCommentMutation } from "@/libs/api/commentsSlice";
import { Ellipsis } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/themes/material.css';
import dayjs from "dayjs";
import CommentReactionsDropdown from "./CommentReactionsDropdown";
import { toast } from "react-toastify";
import ReactionWordButton from "@/components/Buttons/ReactionWordButton";
interface ReplyCommentResponse {
    replies: CommentType[];
    hasMoreReplies: boolean;
}
interface CommentProps {
    commentDataInit: CommentType;
    user: UserType;
    onReply: (parentId: string, content: string) => Promise<CommentType>;
    activeReplyId: string | null;
    setActiveReplyId: (id: string | null) => void;
    depth?: number;
    isCreateLoading?: boolean;
}
const Comment: React.FC<CommentProps> = ({ commentDataInit, user, onReply, activeReplyId, setActiveReplyId, depth = 0, isCreateLoading }) => {
    const [commentData, setCommentData] = useState<CommentType>(commentDataInit);
    const [inputOpen, setInputOpen] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [replies, setReplies] = useState<CommentType[]>([]);
    const [hasMoreReplies, setHasMoreReplies] = useState(false);
    const [pageReplies, setPageReplies] = useState(1);
    const [initContent, setInitContent] = useState(commentData?.content);
    const [isDeleted, setIsDeleted] = useState(false);

    //EDIT State
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(initContent);

    // RTK Query
    const { data: repliesData } = useFetchRepliesForCommentQuery({
        commentId: commentData._id,
        page: pageReplies
    }) as { data: ReplyCommentResponse };
    const [editComment, { isLoading: isSendingEdit, isError: isSendingEditError, isSuccess: isSendingEditSuccess, error: sendingEditError }] = useEditCommentMutation();
    const [removeComment, { isLoading: isRemovingComment, isError: isRemovingCommentError, isSuccess: isRemovingCommentSuccess, error: removingCommentError }] = useRemoveCommentMutation();
    const [reactToComment, { isLoading: isReacting, isError: isReactingError, isSuccess: isReactingSuccess, error: reactingError }] = useReactToCommentMutation();

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
            setInputOpen(false);
            setActiveReplyId(null);
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
            if (isSendingEditSuccess) {
                toast.success("Reply edited successfully");
                setInitContent(updatedReply?.content);
            } else if (isSendingEditError) {
                toast.error("Failed to edit reply");
                setInitContent(commentData?.content);
            }
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to edit reply:", error);
        }
    }

    const handleRemoveComment = async () => {
        try {
            await removeComment(commentData._id).unwrap();
            toast.success("Comment deleted successfully");
            // Đánh dấu comment bị xoá để không render component này nữa
            setIsDeleted(true);
        } catch (error) {
            console.error("Failed to remove comment:", error);
            toast.error("Failed to delete comment");
        }
    };

    const handleSendReaction = async (reaction: string) => {
        if (!commentData?._id) return;
        try {
            const updatedComment = await reactToComment({
                commentId: commentData._id,
                reaction,
            }).unwrap();

            setCommentData(updatedComment);
        } catch (error) {
            console.error("Error updating reaction:", error);
        }
    };

    // If the comment is deleted, return null -> don't render the component
    if (isDeleted) return null;

    // Style reply comments by indence for replies
    const indentLevel = depth < 2 ? `ml-10 pl-2` : ``;
    const borderDepth = depth < 2 ? `border-l` : ``;
    const commentParrentClass = depth < 1 ? `` : `mt-2`;

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
                                        onClick={() => handleRemoveComment()}>
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
                    {/* TextArea for editing mode */}
                    {isEditing ? (
                        <Input
                            className=""
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                        />
                    ) : (
                        <p className="text-sm flex">{initContent}</p>
                    )}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center mt-2 gap-2">
                            <Tippy
                                className="shadow-lg rounded-lg"
                                delay={200}
                                interactive={true}
                                placement="bottom-start"
                                theme={'material'}
                                arrow={false}
                                animation={'shift-away'}
                                content={dayjs(commentData?.updatedAt.toString()).format('MMMM D, YYYY h:mm A')}>
                                <button className="text-xs font-semibold text-gray-500 dark:text-white/50 hover:underline select-none">
                                    {TimeAgo(commentData?.updatedAt.toString())}
                                </button>
                            </Tippy>
                            <ReactionWordButton
                                comment={commentData}
                                onReact={handleSendReaction}
                                user={user}
                            />
                            {/* The reply button to toggle the reply input on or off */}
                            <button
                                onClick={handleToggleReplyInput}
                                className="text-xs font-semibold text-gray-500 dark:text-white/50 hover:underline select-none"
                            >
                                Reply
                            </button>
                        </div>
                        {/* In the editting mode, the save and cancel editing mode buttons gonna be showed up, if not
                        this area gonna show the button to open the comment reactions container */}
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
                        ) : (
                            <CommentReactionsDropdown
                                comment={commentData}
                                currentUser={user}
                                maxUsersToShow={5}
                            />
                        )}
                    </div>
                </div>
            </div>
            {activeReplyId === commentData._id && inputOpen && !isEditing ? (
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
            {/* To list all the replies based on parent comments */}
            {(commentData.children?.length > 0 || replies.length > 0) &&
                <div className={` ${indentLevel} ${borderDepth}`}>
                    {replies.map((reply) => (
                        <Comment
                            key={reply._id}
                            user={user}
                            commentDataInit={reply}
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
import Comment from "./Comment";
import type { PostType, CommentType } from "@/types/Global";
import { UserType } from "@/types/Global";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment, useEffect, useRef } from "react";
import {
    useFetchCommentsQuery,
    useCreateCommentMutation,
} from "@/libs/features/commentsSlice";
import { SendHorizontal } from "lucide-react";
import { Input } from "@/components/ui/inputShadcn";
import { Avatar } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from '@/libs/hooks';
import { closeModal } from '@/libs/features/modalSlice';
import { BlockScolling } from "@/utils/BlockScrolling";

interface CommentsResponse {
    comments: CommentType[];
    hasMore: boolean;
}

function CommentContainer({
    postsData,
    user,
}: {
    postsData: PostType;
    user: UserType;
}) {
    const [page, setPage] = useState(1);
    const [comments, setComments] = useState<CommentType[]>([]); // All comments
    const [hasMore, setHasMore] = useState(false); // Has more comments for pagination
    const [commentText, setCommentText] = useState("");
    const commentInputRef = useRef<HTMLInputElement>(null);
    const [activeReplyId, setActiveReplyId] = useState<string | null>(null); // Track active reply input

    const dispatch = useAppDispatch();
    const { isOpen, postId } = useAppSelector((state) => state.modal);

    const closeModalHandler = () => {
        dispatch(closeModal());
    };

    const [createComment] = useCreateCommentMutation();

    const { data: commentsData } = useFetchCommentsQuery(
        { postId: postsData._id, page },
        {
            skip: !isOpen,
        }
    ) as { data: CommentsResponse };

    useEffect(() => {
        if (isOpen) {
            BlockScolling({ isOpen });
            if (commentsData?.comments) {
                setComments((prev) => {
                    const existingIds = new Set(prev.map((comment) => comment._id));
                    const newComments = commentsData.comments.filter(
                        (comment) => !existingIds.has(comment._id)
                    );
                    return [...prev, ...newComments];
                });
                setHasMore(commentsData.hasMore || false);
            }
        }
    }, [commentsData, isOpen]);

    const loadMoreComments = () => {
        if (hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    const handleSendComment = async () => {
        if (!commentText.trim()) return;

        try {
            const newComment = await createComment({
                content: commentText,
                user: user?._id,
                post: postsData._id,
            }).unwrap();

            setComments((prev) => [newComment, ...prev]);
            setCommentText("");
            commentInputRef.current?.blur();
        } catch (error) {
            console.error("Failed to send comment:", error);
        }
    };

    const handleSendReply = async (parentId: string, content: string): Promise<CommentType> => {
        try {
            const newReply = await createComment({
                content,
                user: user?._id,
                post: postsData._id,
                parent: parentId,
            }).unwrap();

            setComments((prev) =>
                prev.map((comment) =>
                    comment._id === parentId
                        ? { ...comment, children: [...(comment.children || []), newReply] }
                        : comment
                )
            );
            return newReply;
        } catch (error) {
            console.error("Failed to send reply:", error);
        }
    };

    if (!postsData) return null;
    if (postId !== postsData._id) return null;

    return (
        <>
            {/* Modal for all comments */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModalHandler}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-30" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-5xl p-6 bg-background rounded-2xl shadow-xl">
                                    <Dialog.Title className="text-lg font-medium">
                                        All Comments
                                    </Dialog.Title>
                                    <div className="mt-4 h-[80vh] overflow-y-auto">
                                        {comments.length > 0 ? (comments.map((comment) => (
                                            <Comment
                                                key={comment._id}
                                                commentData={comment}
                                                onReply={handleSendReply}
                                                activeReplyId={activeReplyId}
                                                setActiveReplyId={setActiveReplyId}
                                            />
                                        ))) : (
                                            <div className="h-[80vh] flex justify-center items-center">
                                                <div className="font-bold text-gray-500 dark:text-white/50">
                                                    No comments yet
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex justify-items-start">
                                            {hasMore && (
                                                <button
                                                    onClick={loadMoreComments}
                                                    className="mt-2 ml-4 text-sm font-semibold hover:underline text-gray-500 dark:text-white/50"
                                                >
                                                    Load more comments
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {/* Comment input */}
                                    <div className="flex items-center mt-4">
                                        <Avatar src={user?.pfp} size="sm" />
                                        <Input
                                            ref={commentInputRef}
                                            className="flex-1 mx-2"
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            placeholder="Write a comment..."
                                        />
                                        <Button variant="ghost" onClick={handleSendComment} disabled={!commentText.trim()}>
                                            <SendHorizontal></SendHorizontal>
                                        </Button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>


        </>
    );
}

export default CommentContainer;
import Comment from "./Comment";
import type { PostType, CommentType } from "@/types/Global";
import { UserType } from "@/types/Global";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment, useEffect, useRef } from "react";
import {
    useFetchCommentsQuery,
    useFetchOnly2CommentsQuery,
    useCreateCommentMutation,
} from "@/libs/features/commentsSlice";
import { SendHorizontal } from "lucide-react";
import { Input } from "@/components/ui/inputShadcn";
import { Avatar } from "@nextui-org/react";
import { Button } from "@/components/ui/button";

interface PreviewCommentsResponse {
    comments: CommentType[];
    hasMore2cmts: boolean;
}

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
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [previewComments, setPreviewComments] = useState<CommentType[]>([]); // Preview comments
    const [comments, setComments] = useState<CommentType[]>([]); // All comments
    const [hasMore2cmts, setHasMore2cmts] = useState(false); // Has more than 2 comments
    const [hasMore, setHasMore] = useState(false); // Has more comments for pagination
    const [commentText, setCommentText] = useState("");
    const commentInputRef = useRef<HTMLInputElement>(null);

    const [createComment] = useCreateCommentMutation();

    const { data: previewCommentsData } = useFetchOnly2CommentsQuery(
        { postId: postsData._id },
        { selectFromResult: (result) => result }
    ) as { data: PreviewCommentsResponse };

    const { data: commentsData } = useFetchCommentsQuery(
        { postId: postsData._id, page },
        {
            skip: !isOpen,
        }
    ) as { data: CommentsResponse };

    useEffect(() => {
        if (previewCommentsData?.comments) {
            setPreviewComments(previewCommentsData.comments);
            setHasMore2cmts(previewCommentsData.hasMore2cmts || false);
        }
    }, [previewCommentsData]);

    useEffect(() => {
        if (commentsData?.comments && isOpen) {
            setComments((prev) => [...prev, ...commentsData.comments]);
            setHasMore(commentsData.hasMore || false);
        }
    }, [commentsData, isOpen]);

    const openModal = () => {
        setIsOpen(true);
        setPage(1);
    };

    const closeModal = () => {
        setIsOpen(false);
        setComments([]); // Reset comments when closing modal
    };

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

            setPreviewComments((prev) => [newComment, ...prev]);
            setComments((prev) => [newComment, ...prev]);
            setCommentText("");
            commentInputRef.current?.blur();
        } catch (error) {
            console.error("Failed to send comment:", error);
        }
    };

    if (!postsData) return null;

    return (
        <>
            {/* Display preview comments */}
            {previewComments.map((comment) => (
                <Comment key={comment._id} commentData={comment} />
            ))}

            {/* Show "View all comments" button */}
            {hasMore2cmts && (
                <div className="w-full">
                    <button
                        onClick={openModal}
                        className="select-none underline font-semibold text-sm text-gray-500 dark:text-white/50"
                    >
                        View all comments
                    </button>
                </div>
            )}

            {/* Modal for all comments */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                <Dialog.Panel className="w-full max-w-2xl p-6 bg-background rounded-2xl shadow-xl">
                                    <Dialog.Title className="text-lg font-medium">
                                        All Comments
                                    </Dialog.Title>
                                    <div className="mt-4 max-h-80 overflow-y-auto">
                                        {comments.map((comment) => (
                                            <Comment key={comment._id} commentData={comment} />
                                        ))}
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
                                    <button
                                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

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
                <Button onClick={handleSendComment} disabled={!commentText.trim()}>
                    <SendHorizontal></SendHorizontal>
                </Button>
            </div>
        </>
    );
}

export default CommentContainer;

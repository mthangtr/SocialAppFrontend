import React, { useState } from "react";
import { CommentType, UserType } from "@/types/Global";
import { useReactToCommentMutation } from "@/libs/features/commentsSlice";
import ReactionWordButton from "@/components/Buttons/ReactionWordButton";

function CommentReactContainer({ comment, user }: { comment: CommentType; user: UserType }) {
    const [commentData, setCommentData] = useState<CommentType>(comment);
    const [reactToComment, { isLoading }] = useReactToCommentMutation();

    // This function will be passed down to ReactionWordButton as `onReact`
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

    return (
        <>
            {/* ReactionWordButton triggers handleSendReaction with a chosen reaction */}
            <ReactionWordButton
                comment={commentData}
                onReact={handleSendReaction}
                user={user}
            />
        </>
    );
}

export default CommentReactContainer;

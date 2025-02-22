import type { PostType } from '@/types/Global';
import { UserType } from '@/types/Global';
import { useState } from 'react';
import { useReactToPostMutation } from '@/lib/api/postsApi';
import ReactionButton from "@/components/Buttons/ReactionButton"
import ReactionModal from './ReactionModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { Button } from "@/components/ui/button";
import {
    useGetTotalCommentsByPostIdQuery
} from '@/lib/api/commentsApi';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { openModal } from '@/lib/states/modalSlice';

function ActionContainer({ postsData, user }: { postsData: PostType, user: UserType }) {
    const [postData, setPostData] = useState<PostType | null>(postsData);
    const [reactToPost] = useReactToPostMutation();
    const { data } = useGetTotalCommentsByPostIdQuery(postsData?._id);
    const dispatch = useAppDispatch();

    const commentCount = useAppSelector((state) => state.comments[postsData?._id] || 0);
    const totalComments = (data?.totalComments + commentCount) || 0;

    const handleReaction = async (reaction: any) => {
        try {
            const updatedPost = await reactToPost({ postId: postData?._id, reaction }).unwrap();
            setPostData(updatedPost);
        } catch (error) {
            console.error('Error updating reaction:', error);
        }
    };

    return (
        <>
            <div className="text-sm text-gray-500 dark:text-white/50 select-none py-2">
                <ReactionModal post={postData} />
            </div>
            <div className='w-full border-y py-2 mb-4'>
                <div className='flex gap-4 justify-evenly items-center'>
                    <div>
                        <ReactionButton post={postData} onReact={handleReaction} user={user} /> {/* Use ReactionButton */}
                    </div>
                    <Button variant={"ghost"} onClick={() => { dispatch(openModal(postsData._id)) }}>
                        <FontAwesomeIcon icon={faMessage} />
                        <span className="ml-2 select-none">Comment ({totalComments})</span>
                    </Button>
                    <Button variant={"ghost"}>
                        <FontAwesomeIcon icon={faShareFromSquare} />
                        <span className="ml-2 select-none">Share</span>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default ActionContainer;
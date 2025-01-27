import type { PostType } from '@/types/Global';
import { UserType } from '@/types/Global';
import { useState } from 'react';
import { useReactToPostMutation } from '@/libs/features/postsSlice';
import ReactionButton from "@/components/Buttons/ReactionButton"
import ReactionModal from './ReactionModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { Button } from "@/components/ui/button";
import {
    useGetTotalCommentsByPostIdQuery
} from '@/libs/features/commentsSlice';
import { useAppDispatch } from '@/libs/hooks';
import { openModal } from '@/libs/features/modalSlice';

function ActionContainer({ postsData, user }: { postsData: PostType, user: UserType }) {
    const [postData, setPostData] = useState<PostType | null>(postsData);
    const [reactToPost] = useReactToPostMutation();
    const { data } = useGetTotalCommentsByPostIdQuery(postsData?._id);
    const dispatch = useAppDispatch();

    const totalComments = data?.totalComments ?? 0;

    const handleReaction = async (reaction: any) => {
        try {
            const updatedPost = await reactToPost({ postId: postData?._id, reaction }).unwrap();
            setPostData(updatedPost);
        } catch (error) {
            console.error('Error updating reaction:', error);
        }
    };

    const handleToggleModal = () => {
        dispatch(openModal(postsData._id));
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
                    <Button variant={"ghost"} onClick={handleToggleModal} >
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
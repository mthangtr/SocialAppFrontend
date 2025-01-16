import type { PostType } from '@/types/Global';
import { UserType } from '@/types/Global';
import { useState } from 'react';
import { useReactToPostMutation } from '@/libs/features/postsSlice';
import ReactionButton from "@/components/Buttons/ReactionButton"
import ReactionModal from './ReactionModal';

function ReactionContainer({ postsData, user }: { postsData: PostType, user: UserType }) {
    const [postData, setPostData] = useState<PostType | null>(postsData);
    const [reactToPost] = useReactToPostMutation();

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

            <div>
                <ReactionButton post={postData} onReact={handleReaction} user={user} /> {/* Use ReactionButton */}
            </div>
            <div className=" text-sm text-gray-500 dark:text-white/50 my-4 select-none">
                <ReactionModal post={postData} />
            </div>
        </>
    );
}

export default ReactionContainer;
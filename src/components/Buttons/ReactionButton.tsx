import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import Tippy from '@tippyjs/react';
import { ThumbsUp } from 'lucide-react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/themes/material.css';
import { PostType, UserType } from '@/types/Global';

const reactions = [
    { emoji: <ThumbsUp fill='#1877f2' strokeWidth={1} size={"18px"} className='mr-1' stroke='#0f5cb5' />, label: 'Like', color: '#1877f2' },
    { emoji: '❤️', label: 'Love', color: '#e0245e' },
    { emoji: '😂', label: 'Haha', color: '#f7b928' },
    { emoji: '😮', label: 'Wow', color: '#f7b928' },
    { emoji: '😢', label: 'Sad', color: '#f7b928' },
    { emoji: '😡', label: 'Angry', color: '#d93f33' },
];

const ReactionButton = ({ post, onReact, user }: { post: PostType, onReact: (reaction: string) => void, user: UserType }) => {
    const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

    useEffect(() => {
        const userReaction = post?.reactions?.find(r => r.user._id === user._id);
        if (userReaction) {
            setSelectedReaction(userReaction.type);
        }
    }, [post.reactions, user._id]);

    const handleReaction = (reaction: string) => {
        if (selectedReaction === reaction) {
            setSelectedReaction(null);
            onReact('none');
        } else {
            setSelectedReaction(reaction);
            onReact(reaction);
        }
    };

    const getReaction = () => {
        const reaction = reactions?.find(r => r?.label === selectedReaction);
        return reaction ? { emoji: reaction?.emoji, color: reaction?.color } : { emoji: <ThumbsUp className='mr-1' size={"18px"} />, color: '' };
    };

    const handleButtonClick = () => {
        if (selectedReaction) {
            setSelectedReaction(null);
            onReact('none');
        } else {
            setSelectedReaction('Like');
            onReact('Like');
        }
    };

    const { emoji, color } = getReaction();

    return (
        <Tippy className="shadow-lg rounded-lg select-none"
            delay={300}
            duration={250}
            theme={'material'}
            arrow={false}
            animation={'shift-away'}
            content={
                <div className="flex space-x-2" >
                    {
                        reactions.map((reaction) => (
                            <button
                                key={reaction.label}
                                onClick={() => handleReaction(reaction.label)}
                                className="text-3xl"
                                aria-label={reaction.label}
                            >
                                {reaction.label === 'Like'
                                    ? <ThumbsUp fill='#1877f2' strokeWidth={1} size={"32px"} className='mr-1' stroke='#0f5cb5' />
                                    : reaction.emoji}
                            </button>
                        ))
                    }
                </div>
            }
            interactive={true}
            placement="top"
        >
            <Button variant={"ghost"} className="flex items-center px-2 w-24 justify-center select-none" onClick={handleButtonClick}>
                {typeof emoji === 'string' ? <span className='text-2xl'>{emoji}</span> : emoji}
                <span className="ml-1" style={{ color: color }}>{selectedReaction ? selectedReaction : 'None'}</span>
            </Button>
        </Tippy >
    );
};

export default ReactionButton;

import React, { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/themes/material.css';
import { CommentType, PostType, UserType } from '@/types/Global';

const reactions = [
    { emoji: '👍', label: 'Like', color: '#1877f2' },
    { emoji: '❤️', label: 'Love', color: '#e0245e' },
    { emoji: '😂', label: 'Haha', color: '#f7b928' },
    { emoji: '😮', label: 'Wow', color: '#f7b928' },
    { emoji: '😢', label: 'Sad', color: '#f7b928' },
    { emoji: '😡', label: 'Angry', color: '#d93f33' },
];

const ReactionWordButton = ({ comment, onReact, user }: { comment: CommentType, onReact: (reaction: string) => void, user: UserType }) => {
    const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

    useEffect(() => {
        const userReaction = comment?.reactions?.find(r => r.user._id === user._id);
        if (userReaction) {
            setSelectedReaction(userReaction.type);
        }
    }, [comment.reactions, user._id]);

    const handleReaction = (reaction: string) => {
        if (selectedReaction === reaction) {
            setSelectedReaction(null);
            onReact('none');
        } else {
            setSelectedReaction(reaction);
            onReact(reaction);
        }
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

    return (
        <Tippy
            className="shadow-lg rounded-lg select-none"
            delay={300}
            theme={'material'}
            arrow={false}
            animation={'shift-away'}
            content={
                <div className="flex space-x-2">
                    {
                        reactions.map((reaction) => (
                            <button
                                key={reaction.label}
                                onClick={() => handleReaction(reaction.label)}
                                className="text-2xl"
                                aria-label={reaction.label}
                                style={{ color: reaction.color }}
                            >
                                {reaction.emoji}
                            </button>
                        ))
                    }
                </div>
            }
            interactive={true}
            placement="top-start"
        >
            <button
                className="text-xs font-semibold hover:underline text-gray-500 dark:text-white/50 select-none"
                onClick={handleButtonClick}
                style={{ color: selectedReaction ? reactions.find(r => r.label === selectedReaction)?.color : '' }}
            >
                {selectedReaction ? selectedReaction : 'Like'}
            </button>
        </Tippy>
    );
};

export default ReactionWordButton;

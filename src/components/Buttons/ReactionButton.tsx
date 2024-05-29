import React, { useState } from 'react';
import { Button } from '../ui/button';
import Tippy from '@tippyjs/react';
import { ThumbsUp } from 'lucide-react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/themes/material.css';

const reactions = [
    { emoji: '👍', label: 'Like', color: '#1877f2' },
    { emoji: '❤️', label: 'Love', color: '#e0245e' },
    { emoji: '😂', label: 'Haha', color: '#f7b928' },
    { emoji: '😮', label: 'Wow', color: '#f7b928' },
    { emoji: '😢', label: 'Sad', color: '#f7b928' },
    { emoji: '😡', label: 'Angry', color: '#d93f33' },
];

const ReactionButton = ({ onReact }: { onReact: (reaction: string) => void }) => {
    const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

    const handleReaction = (reaction: string) => {
        if (selectedReaction === reaction) {
            setSelectedReaction(null);
            onReact('Like');
        } else {
            setSelectedReaction(reaction);
            onReact(reaction);
        }
    };

    const getReaction = () => {
        const reaction = reactions.find(r => r.label === selectedReaction);
        return reaction ? { emoji: reaction.emoji, color: reaction.color } : { emoji: <ThumbsUp className='mr-1' size={"18px"} />, color: '#000' };
    };

    const handleButtonClick = () => {
        if (selectedReaction) {
            setSelectedReaction(null);
            onReact('Like');
        } else {
            setSelectedReaction('Like');
            onReact('Like');
        }
    };

    const { emoji, color } = getReaction();

    return (
        <Tippy className="shadow-lg rounded-lg select-none"
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
                                {reaction.emoji}
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
                <span className="ml-1 " style={{ color: color }}>{selectedReaction ? selectedReaction : 'Like'}</span>
            </Button>
        </Tippy >
    );
};

export default ReactionButton;

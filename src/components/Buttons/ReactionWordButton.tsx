import React, { useState } from 'react';
import Tippy from '@tippyjs/react';
import { ThumbsUp } from 'lucide-react';
import 'tippy.js/dist/tippy.css';

const reactions = [
    { emoji: '👍', label: 'Like' },
    { emoji: '❤️', label: 'Love' },
    { emoji: '😂', label: 'Haha' },
    { emoji: '😮', label: 'Wow' },
    { emoji: '😢', label: 'Sad' },
    { emoji: '😡', label: 'Angry' },
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

    const getEmoji = () => {
        const reaction = reactions.find(r => r.label === selectedReaction);
        return reaction ? reaction.emoji : <ThumbsUp size={"24px"} />;
    };

    const handleButtonClick = () => {
        if (selectedReaction) {
            setSelectedReaction(null);
            onReact('Like');
        }
    };

    return (
        <Tippy
            content={
                <div className="flex space-x-2">
                    {reactions.map((reaction) => (
                        <button
                            key={reaction.label}
                            onClick={() => handleReaction(reaction.label)}
                            className="text-2xl"
                            aria-label={reaction.label}
                        >
                            {reaction.emoji}
                        </button>
                    ))}
                </div>
            }
            interactive={true}
            placement="top"
        >
            <button className="flex items-center w-12 justify-center" onClick={handleButtonClick}>
                <span className="ml-1">{selectedReaction ? selectedReaction : 'Like'}</span>
            </button>
        </Tippy>
    );
};

export default ReactionButton;

import { useState, useEffect } from 'react';
import { PostType } from "@/types/Global";
import { Avatar } from "@nextui-org/react";
import { ThumbsUp } from 'lucide-react';
import { BlockScolling } from '@/utils/BlockScrolling';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const reactionsList = [
    {
        emoji: (
            <ThumbsUp
                fill="#1877f2"
                strokeWidth={1}
                size={"24px"}
                className="mr-1"
                stroke="#0f5cb5"
            />
        ),
        label: 'Like',
        color: '#1877f2',
    },
    { emoji: '❤️', label: 'Love', color: '#e0245e' },
    { emoji: '😂', label: 'Haha', color: '#f7b928' },
    { emoji: '😮', label: 'Wow', color: '#f7b928' },
    { emoji: '😢', label: 'Sad', color: '#f7b928' },
    { emoji: '😡', label: 'Angry', color: '#d93f33' },
];

function ReactionModal({ post }: { post: PostType }) {
    const [isOpen, setIsOpen] = useState(false);
    const [reactionNumber, setReactionNumber] = useState(post?.reactions?.length);
    const [reactions, setReactions] = useState(post?.reactions || []);

    useEffect(() => {
        setReactionNumber(post?.reactions?.length);
        setReactions(post?.reactions || []);
    }, [post?.reactions]);

    useEffect(() => {
        if (isOpen) {
            BlockScolling({ isOpen });
        }
    }, [isOpen]);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <button className="hover:underline cursor-pointer">
                        {reactionNumber} reactions
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start' side='right'>
                    {post?.reactions?.map((reaction, index) => {
                        const userReaction = reactionsList.find(
                            (r) => r.label === reaction.type
                        );
                        return (
                            <DropdownMenuItem
                                key={index}
                                className="flex items-center justify-between my-2 gap-8"
                            >
                                <div className="flex items-center">
                                    <Avatar
                                        className='select-none'
                                        src={reaction.user.pfp}
                                        alt={reaction.user.username}
                                        size="sm"
                                    />
                                    <h1 className="ml-4 font-semibold">
                                        {reaction.user.username}
                                    </h1>
                                </div>
                                {/* Display the reaction emoji */}
                                {userReaction && (
                                    <span className="text-2xl select-none">
                                        {userReaction.emoji}
                                    </span>
                                )}
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export default ReactionModal;

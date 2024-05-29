import { useState, useEffect } from "react";
import { Input } from "@/components/ui/inputShadcn";
import { Avatar } from "@nextui-org/react";
import ReactionWordButton from "@/components/Buttons/ReactionWordButton";

function Comment() {
    const [showFullText, setShowFullText] = useState(false);
    const [showRepliesInput, setShowRepliesInput] = useState(false);

    const handleReaction = (reaction: any) => {
        console.log(`Reacted with: ${reaction}`);
    };

    const maxLength = 200;
    const text = `This is a comment.This is a comment.This is a comment.This is a comment.This is a comment.This is a comment.This is a comment.This is a comment.This is a comment.This is a comment.This is a comment.This is a comment.This is a comment.This is a comment.This is a comment.This is a comment.`;

    const displayText = showFullText ? text : text.substring(0, maxLength) + '...';

    const toggleShowMore = () => {
        setShowFullText(!showFullText);
    }

    const toggleRepliesInput = () => {
        setShowRepliesInput(!showRepliesInput);
    }

    return (
        <div className="flex flex-col py-3" >
            <div className="flex px-2">
                <div className="pt-1 pl-1">
                    <Avatar className="mr-2 select-none" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" size="sm" />
                </div>
                <div className=" px-2 rounded-lg flex-1">
                    <p className="font-semibold text-sm">Commenter Name</p>
                    <p className="text-sm text-wrap mt-1">{displayText}
                        <button onClick={toggleShowMore} className="select-none text-sm font-medium hover:underline ml-2 text-gray-500 dark:text-gray-400">
                            {showFullText ? 'Show less' : "Show more"}
                        </button>
                    </p>
                    <div className="flex items-center mt-2">
                        <ReactionWordButton onReact={handleReaction} />
                        <button onClick={toggleRepliesInput} className='text-gray-500 dark:text-gray-400 font-semibold hover:underline text-sm ml-2 select-none'>Reply</button>
                    </div>
                </div>
            </div>
            {showRepliesInput && (
                <div className="flex items-center mt-2 ml-14">
                    <Avatar className="mr-2" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" size="sm" />
                    <Input className="w-full border bg-gray-100 rounded-lg px-4 py-2 dark:border-gray-600 dark:bg-gray-700" type='text' placeholder="Write your comment..." />
                </div>
            )}
        </div>
    );
}

export default Comment;

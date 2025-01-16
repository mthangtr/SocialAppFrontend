import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { PostType } from "@/types/Global";
import { Avatar } from "@nextui-org/react";
import { ThumbsUp } from 'lucide-react';

const reactionsList = [
    {
        emoji: (
            <ThumbsUp
                fill="#1877f2"
                strokeWidth={1}
                size={"18px"}
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

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    useEffect(() => {
        setReactionNumber(post?.reactions?.length);
        setReactions(post?.reactions || []);
    }, [post?.reactions]);

    return (
        <>
            <button onClick={openModal} className="hover:underline cursor-pointer">
                {reactionNumber} reactions
            </button>

            {/* Modal */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    className="fixed z-10 inset-0 overflow-y-auto"
                    onClose={closeModal}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-30" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-out duration-300 transform"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="transition ease-in duration-200 transform"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="bg-background w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 select-none"
                                    >
                                        Reactions
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div className="max-h-80 overflow-y-auto">
                                            <ul>
                                                {post?.reactions?.map((reaction, index) => {
                                                    // Find the emoji for the reaction type
                                                    const userReaction = reactionsList.find(
                                                        (r) => r.label === reaction.type
                                                    );
                                                    return (
                                                        <li
                                                            key={index}
                                                            className="flex items-center justify-between my-2"
                                                        >
                                                            <div className="flex items-center">
                                                                <Avatar
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
                                                                <span className="text-2xl">
                                                                    {userReaction.emoji}
                                                                </span>
                                                            )}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default ReactionModal;

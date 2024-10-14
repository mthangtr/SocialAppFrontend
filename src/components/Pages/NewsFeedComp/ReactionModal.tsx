import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { PostType } from "@/types/Global";
import { Avatar } from "@nextui-org/react";

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

    console.log('post', post);

    return (
        <>
            <button onClick={openModal} className="hover:underline cursor-pointer">
                {reactionNumber} reactions
            </button>

            {/* Modal */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog className="fixed z-10 inset-0 overflow-y-auto backdrop-blur-sm bg-white/30" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 opacity-30" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 select-none">
                                        Reactions
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        {/* Hiển thị danh sách người đã react */}
                                        <ul>
                                            {post?.reactions?.map((reaction, index) => (
                                                <li key={index} className="flex items-center space-x-3 my-2">
                                                    <Avatar src={reaction.user.pfp} alt={reaction.user.username} size="sm" />
                                                    <span>{reaction.user.username}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
                                    </div> */}
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

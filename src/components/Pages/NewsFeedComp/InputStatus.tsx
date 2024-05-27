"use client";
import React, { useState } from 'react';
import { Avatar } from "@nextui-org/react";
import { Input } from "@/components/ui/inputShadcn";
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { Button } from "../../ui/button";

function InputStatus() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState('');

    const handleStatusClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleStatusChange = (e: any) => {
        setStatus(e.target.value);
    };

    const handlePostStatus = () => {
        // Handle posting the status here
        console.log('Status posted:', status);
        setIsModalOpen(false);
        setStatus('');
    };
    return (
        <>
            {/* Phần upload status */}
            <div className="border p-4 rounded-lg shadow-lg mb-6 flex items-center " >
                <Avatar className="mr-4" src="https://github.com/shadcn.png" size="md" />
                <Input
                    onClick={handleStatusClick}
                    className="w-full border rounded-lg px-4 py-2 cursor-pointer bg-gray-100 dark:bg-gray-700"
                    type='text'
                    placeholder="What's on your mind?"
                    readOnly
                />
            </div>

            {/* Modal để nhập status */}
            <Transition show={isModalOpen} as={React.Fragment}>
                <Dialog open={isModalOpen} onClose={handleCloseModal} className="fixed z-10 inset-0 overflow-y-auto backdrop-blur-sm bg-white/30">
                    <div className="flex items-center justify-center min-h-screen">
                        <Transition.Child
                            as={React.Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 opacity-30" />
                        </Transition.Child>

                        <Transition.Child
                            as={React.Fragment}
                            enter="transition ease-out duration-300 transform"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-200 transform"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="bg-background p-6 rounded-lg shadow-lg w-full max-w-md mx-auto z-20">
                                <Dialog.Title className="text-lg font-semibold mb-4">Create Post</Dialog.Title>
                                <Input
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
                                    type='text'
                                    value={status}
                                    onChange={handleStatusChange}
                                    placeholder="What's on your mind?"
                                />
                                <div className="flex justify-end">
                                    <Button variant={"ghost"} className="mr-2 px-4 py-2 " onClick={handleCloseModal}>Cancel</Button>
                                    <Button variant={"default"} onClick={handlePostStatus}>Post</Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default InputStatus;
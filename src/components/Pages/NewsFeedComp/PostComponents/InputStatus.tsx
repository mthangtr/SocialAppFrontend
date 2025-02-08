"use client";
import { Fragment } from "react";
import { useState, useEffect, useRef } from 'react';
import { Avatar } from "@nextui-org/react";
import { Input } from "@/components/ui/inputShadcn";
import { Dialog, Textarea, Transition } from '@headlessui/react';
import { Button } from "../../../ui/button";
import { Upload } from 'lucide-react';
import { UserType } from "@/types/Global";
import {
    useCreatePostMutation
} from '@/lib/api/postsApi';
import { useAppDispatch } from '@/lib/hooks';
import { closeModal } from '@/lib/states/modalSlice';

function InputStatus({ user, onPostCreated }: { user: UserType, onPostCreated: (post: any) => void }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const dispatch = useAppDispatch();

    const [createPost] = useCreatePostMutation();

    const handleStatusClick = () => {
        setIsModalOpen(true);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setStatus(e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files: File[] = Array.from(e.target.files || []);
        setImages(files);

        const previews: Promise<string>[] = files.map(file => {
            const reader = new FileReader();
            return new Promise<string>((resolve) => {
                reader.onloadend = () => {
                    resolve(reader.result as string);
                };
                reader.readAsDataURL(file);
            });
        });

        Promise.all(previews).then(previews => {
            setImagePreviews(previews);
        });
    };

    const handlePostStatus = async () => {
        const formData = new FormData();
        formData.append('content', status); // change 'status' to 'content'
        images.forEach((image, index) => {
            formData.append(`media`, image); // use the same key 'media' for all files
        });

        try {
            const response = await createPost(formData).unwrap();
            dispatch(closeModal());
            if (response) {
                onPostCreated(response);
            }
            setIsModalOpen(false);
            setStatus('');
            setImages([]);
            setImagePreviews([]);
        } catch (error) {
            console.error('Error posting status:', error);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [status]);

    return (
        <>
            {/* Phần upload status */}
            <div className="border p-4 rounded-lg shadow-lg flex items-center">
                <Avatar className="mr-4" src={`${user?.pfp || "/assets/images/default.png"} `} alt={`${user?.username}`} size="md" />
                <Input
                    onClick={handleStatusClick}
                    className="w-full border rounded-lg px-4 py-2 cursor-pointer bg-gray-100 dark:bg-[hsl(0,0%,20%)]"
                    type='text'
                    placeholder="What's on your mind?"
                    readOnly
                />
            </div>

            {/* Modal để nhập status */}
            <Transition show={isModalOpen} as={Fragment}>
                <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-30">
                    <div className="flex items-center justify-center min-h-screen">
                        <Transition.Child
                            as={Fragment}
                        >
                            <Dialog.Panel className="bg-background p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto z-20">
                                <Dialog.Title className="text-lg font-semibold mb-4">Create Post</Dialog.Title>
                                <Textarea
                                    className="mt-3 block w-full max-h-96 resize-none rounded-lg border-none dark:bg-inherit py-1.5 px-3 text-sm/6 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/0"
                                    value={status}
                                    onChange={handleStatusChange}
                                    placeholder="What's on your mind?"
                                    autoFocus={false}
                                    ref={textareaRef}
                                    style={{ height: 'auto' }}
                                />
                                <div className="mt-3">
                                    <button onClick={triggerFileInput} className="flex items-center justify-center w-12 h-12">
                                        <Upload className="w-6 h-6 text-gray-400" />
                                    </button>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                        ref={fileInputRef}
                                        className="hidden"
                                    />
                                </div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {imagePreviews.map((preview, index) => (
                                        <img key={index} src={preview} alt={`Image Preview ${index}`} className="w-24 h-24 rounded-lg" />
                                    ))}
                                </div>
                                <div className="flex justify-end mt-4">
                                    <Button variant={"ghost"} className="mr-2 px-4 py-2" onClick={() => setIsModalOpen(false)}>Cancel</Button>
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

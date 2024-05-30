"use client";
import React, { useState, useRef } from 'react';
import { Avatar } from "@nextui-org/react";
import { Input } from "@/components/ui/inputShadcn";
import { Dialog, Textarea, Transition } from '@headlessui/react';
import { Button } from "../../ui/button";
import { Upload } from 'lucide-react';

function InputStatus() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const fileInputRef = useRef(null);

    const handleStatusClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleStatusChange = (e: any) => {
        setStatus(e.target.value);
    };

    const handleImageChange = (e: any) => {
        const files: File[] = Array.from(e.target.files);
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

    const handlePostStatus = () => {
        const formData = new FormData();
        formData.append('status', status);
        images.forEach((image, index) => {
            formData.append(`image${index}`, image);
        });

        // Here you would send formData to your backend
        // For example: axios.post('/api/status', formData);

        console.log('Status posted:', status);
        if (images.length > 0) {
            console.log('Images posted:', images.map(image => image.name));
        }

        setIsModalOpen(false);
        setStatus('');
        setImages([]);
        setImagePreviews([]);
    };

    const triggerFileInput = () => {
        if (fileInputRef.current === null) {
            return;
        }
        (fileInputRef.current as HTMLInputElement).click();
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
                            <Dialog.Panel className="bg-background p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto z-20">
                                <Dialog.Title className="text-lg font-semibold mb-4">Create Post</Dialog.Title>
                                <Textarea
                                    className="mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                    value={status}
                                    onChange={handleStatusChange}
                                    placeholder="What's on your mind?"
                                    autoFocus={false}
                                />
                                <div className="mt-3">
                                    <button onClick={triggerFileInput} className="flex items-center justify-center w-12 h-12 ">
                                        <Upload className="w-6 h-6 text-gray-600" />
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
                                    <Button variant={"ghost"} className="mr-2 px-4 py-2" onClick={handleCloseModal}>Cancel</Button>
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

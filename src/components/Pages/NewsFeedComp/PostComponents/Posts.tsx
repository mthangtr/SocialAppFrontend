"use client";
import { useState, useEffect } from 'react';
import { Avatar } from "@nextui-org/react";
import type { PostType } from '@/types/Global';
import { TimeAgo } from '@/utils/FormatTime';
import { UserType } from '@/types/Global';
import PostTextContent from './PostTextContent';
import ActionContainer from './ActionContainer';
import {
    Carousel,
    CarouselMainContainer,
    CarouselThumbsContainer,
    SliderMainItem,
    SliderThumbItem,
} from "@/components/ui/extension/carousel";
import CommentContainer from '../CommentComponents/CommentContainer';
import { useUpdatePostMutation, useDeletePostMutation, useSetPrivacyMutation } from '@/lib/api/postsApi';
import dayjs from 'dayjs';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/themes/material.css';
import PostOptionDropdown from './PostOptionDropdown';
import { Lock, Globe, Users } from 'lucide-react';
import { useAppDispatch } from '@/lib/hooks';
import { closeModal } from '@/lib/states/modalSlice';
import EditForm from './EditForm';
import { useToast } from "@/hooks/use-toast";

export default function Post({ postsData, user }: { postsData: PostType, user: UserType }) {
    const toast = useToast();
    const [postData, setPostData] = useState<PostType | null>(postsData);
    const [showFullText, setShowFullText] = useState(false);
    const [showCarousel, setShowCarousel] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedText, setUpdatedText] = useState(postsData?.content);

    const dispatch = useAppDispatch();

    const [updatePost] = useUpdatePostMutation();
    const [deletePost] = useDeletePostMutation();
    const [setPostPrivacy] = useSetPrivacyMutation();

    useEffect(() => {
        if (postData?.content?.length <= maxLength) {
            setShowFullText(true);
        }
    }, [postData?.content?.length]);

    const handleDeletePost = async (postId: string) => {
        try {
            await deletePost({ userId: user._id, postId }).unwrap();
            toast.toast({
                title: 'Success',
                description: 'Post deleted successfully',
            })
            if (postId === postData?._id) {
                dispatch(closeModal());
            }
            setPostData(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangePostPrivacy = async (newPrivacy: string) => {
        try {
            await setPostPrivacy({ userId: user._id, postId: postData?._id, privacy: newPrivacy }).unwrap();
            toast.toast({
                title: 'Success',
                description: 'Privacy updated successfully',
            })
            setPostData(prev => prev ? { ...prev, privacy: newPrivacy } : null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditPost = async (postId: string, newText: string) => {
        try {
            const updatedPost = await updatePost({ userId: user._id, postId, data: { content: newText } }).unwrap();
            toast.toast({
                title: 'Success',
                description: 'Post updated successfully',
            })
            setPostData(updatedPost);
        } catch (error) {
            console.error(error);
        }
    };

    const text = updatedText;

    const maxLength = 300;
    const displayText = showFullText ? text : text?.substring(0, maxLength) + '...';

    const images = postData?.media;

    const handleImageClick = () => setShowCarousel(true);
    const handleCarouselClose = () => setShowCarousel(false);

    const getPrivacyIcon = (privacy: string) => {
        switch (privacy) {
            case 'public':
                return <Globe size={12} />;
            case 'private':
                return <Lock size={12} />;
            case 'friends':
                return <Users size={12} />;
            default:
                return <Globe size={12} />;
        }
    };

    const renderImages = () => {
        if (!images || images.length === 0) {
            return null;
        }

        switch (images?.length) {
            case 0:
                return null;
            case 1:
                return (
                    <div onClick={handleImageClick}>
                        <img src={images[0]} alt="Post" className="w-full h-auto select-none rounded-sm" />
                    </div>
                );
            case 2:
                return (
                    <div onClick={handleImageClick} className="flex space-x-1">
                        {Array.isArray(images) && images.map((img, idx) => (
                            <img key={idx} src={img} alt="Post" className="w-1/2 h-auto object-cover select-none rounded-sm" />
                        ))}
                    </div>
                );
            case 3:
                return (
                    <div onClick={handleImageClick} className="grid grid-cols-2 gap-1">
                        <img src={images[0]} alt="Post" className="col-span-2 w-full h-auto object-cover rounded-sm select-none" />
                        {images.slice(1, 3).map((img, idx) => (
                            <img key={idx} src={img} alt="Post" className="w-full h-auto object-cover rounded-sm select-none" />
                        ))}
                    </div>
                );
            case 4:
                return (
                    <div onClick={handleImageClick} className="grid grid-cols-3 gap-1">
                        <div className="col-span-2">
                            <img src={images[0]} alt="Post" className="w-full h-full object-cover select-none" />
                        </div>
                        <div className="flex flex-col gap-1">
                            {images.slice(1, 4).map((img, idx) => (
                                <img key={idx} src={img} alt="Post" className="w-full h-auto object-cover rounded-sm select-none" />
                            ))}
                        </div>
                    </div>
                );
            default:
                return (
                    <div onClick={handleImageClick} className="grid grid-cols-3 gap-1">
                        <div className="col-span-2">
                            <img src={images[0]} alt="Post" className="w-full h-full object-cover rounded-sm select-none" />
                        </div>
                        <div className="flex flex-col gap-1">
                            {images.slice(1, 3).map((img, idx) => (
                                <img key={idx} src={img} alt="Post" className="w-full h-auto object-cover rounded-sm select-none" />
                            ))}
                            <div className="relative">
                                <img src={images[4]} alt="Post" className="w-full h-full object-cover select-none" />
                                <div className=" select-none absolute inset-0 bg-black bg-opacity-50 flex justify-center rounded-sm items-center text-white text-lg font-bold">
                                    +{images.length - 4}
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    if (!postData) return null;

    return (
        <>
            <div className="mt-8 border px-6 py-4 rounded-lg shadow-lg bg-background">
                <div className="flex items-center mb-4">
                    <Avatar className="mr-4 select-none" src={`${postData?.user?.pfp?.toString() || "/assets/images/default.png"}`} size="md" />
                    <div className='flex justify-between w-full'>
                        <div className='flex flex-col items-start justify-center w-full'>
                            <p className="font-semibold text-lg">{postData?.user?.username}</p>
                            <div className="flex items-center gap-2">
                                {getPrivacyIcon(postData?.privacy)}
                                <Tippy
                                    className="shadow-lg rounded-lg"
                                    delay={200}
                                    interactive={true}
                                    placement="right"
                                    theme={'material'}
                                    arrow={false}
                                    animation={'shift-away'}
                                    content={dayjs(postData?.updatedAt.toString()).format('MMMM D, YYYY h:mm A')}>
                                    <button className="text-xs font-semibold text-gray-500 dark:text-white/50 hover:underline select-none">
                                        {TimeAgo(postData?.updatedAt.toString())}
                                    </button>
                                </Tippy>
                            </div>
                        </div>
                        {!isEditing && <PostOptionDropdown postData={postData} user={user} onDelete={handleDeletePost} onChangePrivacy={handleChangePostPrivacy} onToggleEdit={() => setIsEditing(!isEditing)} />}
                    </div>
                </div>
                {isEditing ? (
                    <EditForm
                        initialContent={updatedText}
                        onSave={(newText) => {
                            handleEditPost(postData._id, newText);
                            setIsEditing(false);
                        }}
                        onCancel={() => {
                            setIsEditing(false);
                            setUpdatedText(postData?.content);
                        }} />
                ) : (
                    <p>
                        {text != "" && <>
                            <PostTextContent text={displayText} />
                            <button onClick={() => { setShowFullText(!showFullText); }} className="select-none text-sm font-medium hover:underline ml-2 text-gray-500 dark:text-white/50">
                                {showFullText ? '' : "Show more"}
                            </button>
                        </>}
                    </p>
                )
                }
                <div className='mt-4'>
                    {renderImages()}
                </div>
                {/* Carousel */}
                {showCarousel && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
                        <button className="absolute top-4 right-4 text-white" onClick={handleCarouselClose}>
                            Close
                        </button>
                        <Carousel orientation="horizontal" className="w-full max-w-3xl items-center gap-4">
                            <div className="">
                                <CarouselMainContainer className="h-full">
                                    {images?.map((img, idx) => (
                                        <SliderMainItem key={idx} className=" items-center justify-center h-full rounded-md">
                                            <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover rounded-md" />
                                        </SliderMainItem>
                                    ))}
                                </CarouselMainContainer>
                            </div>
                            <CarouselThumbsContainer className="h-full  ">
                                {images?.map((img, idx) => (
                                    <SliderThumbItem key={idx} index={idx} className="rounded-md bg-transparent">
                                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="h-20 w-full object-cover rounded-md cursor-pointer" />
                                    </SliderThumbItem>
                                ))}
                            </CarouselThumbsContainer>
                        </Carousel>
                    </div>
                )}
                <ActionContainer postsData={postData} user={user} />
                <CommentContainer postsData={postData} user={user} />
            </div>
        </>
    );
}

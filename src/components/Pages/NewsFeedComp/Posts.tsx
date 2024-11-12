"use client";
import { useState, useEffect, useRef } from 'react';
import { Avatar } from "@nextui-org/react";
import { Input } from "@/components/ui/inputShadcn";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { Button } from "@/components/ui/button";
import ReactionButton from "@/components/Buttons/ReactionButton"
import Comment from './Comment';
import Link from 'next/link';
import type { PostType } from '@/types/Global';
import { TimeAgo } from '@/utils/FormatTime';
import { UserType } from '@/types/Global';
import PostTextContent from './PostTextContent';
import { useReactToPostMutation } from '@/libs/features/postsSlice'
import ReactionModal from './ReactionModal';
import { SendHorizontal } from 'lucide-react';
import {
    Carousel,
    CarouselMainContainer,
    CarouselThumbsContainer,
    SliderMainItem,
    SliderThumbItem,
} from "@/components/ui/extension/carousel";

export default function Post({ postsData, user }: { postsData: PostType, user: UserType }) {
    const [postData, setPostData] = useState<PostType | null>(postsData);
    const [showFullText, setShowFullText] = useState(false);
    const [reactToPost] = useReactToPostMutation();
    const [commentText, setCommentText] = useState('');
    const [showCarousel, setShowCarousel] = useState(false);
    const commentInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (postData?.content?.length <= maxLength) {
            setShowFullText(true);
        }
    }, [postData?.content?.length]);

    const toggleShowMore = () => {
        setShowFullText(!showFullText);
    };

    const text = postData?.content;

    const maxLength = 300;
    const displayText = showFullText ? text : text?.substring(0, maxLength) + '...';

    const handleReaction = async (reaction: any) => {
        try {
            const updatedPost = await reactToPost({ postId: postData?._id, reaction }).unwrap();
            setPostData(updatedPost);
        } catch (error) {
            console.error('Error updating reaction:', error);
        }
    };

    const handleCommentButtonClick = () => {
        commentInputRef.current?.focus();
    };

    const images = postData?.media;

    const handleImageClick = () => setShowCarousel(true);
    const handleCarouselClose = () => setShowCarousel(false);

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

    return (
        <>
            <div className="mt-8 border p-6 rounded-lg shadow-lg bg-background">
                <div className="flex items-center mb-4">
                    <Avatar className="mr-4 select-none" src={`${postData?.user?.pfp?.toString()}`} size="md" />
                    <div>
                        <p className="font-semibold text-lg">{postData?.user?.username}</p>
                        <p className="text-gray-500 text-sm dark:text-white/50 select-none">{TimeAgo(postData?.createdAt?.toString())}</p>
                    </div>
                </div>
                <p className="">{<PostTextContent text={displayText} />}
                    <button onClick={toggleShowMore} className="select-none text-sm font-medium hover:underline ml-2 text-gray-500 dark:text-white/50">
                        {showFullText ? '' : "Show more"}
                    </button>
                </p>

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

                <div className=" text-sm text-gray-500 dark:text-white/50 my-4 select-none">
                    <ReactionModal post={postData} />
                </div>

                <div className="w-full border-y py-2 mb-4 flex justify-around items-center">
                    <ReactionButton post={postData} onReact={handleReaction} user={user} /> {/* Use ReactionButton */}
                    <Button variant={"ghost"} onClick={handleCommentButtonClick}>
                        <FontAwesomeIcon icon={faMessage} />
                        <span className="ml-2 select-none">Comment</span>
                    </Button>
                    <Button variant={"ghost"}>
                        <FontAwesomeIcon icon={faShareFromSquare} />
                        <span className="ml-2 select-none">Share</span>
                    </Button>
                </div>

                <div className="mb-4">
                    <Comment />
                    <Comment />
                    <div className="w-full">
                        <Link href={`/post-detail/${postData?._id}`} className="select-none underline font-semibold text-sm text-gray-500 dark:text-white/50">
                            View all comments
                        </Link>
                    </div>
                </div>

                <div className="flex items-center">
                    <Avatar className="select-none mr-4 flex-shrink-0" src={`${user?.pfp}`} alt={`${user?.username}`} size="sm" />
                    <Input
                        ref={commentInputRef}
                        className="select-none w-full border bg-gray-100 rounded-lg px-4 py-2 dark:bg-[hsl(0,0%,20%)]"
                        type='text'
                        placeholder="Write your comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    {commentText.trim().length > 0 && (
                        <Button variant={"ghost"} className="select-none mx-2">
                            <SendHorizontal size={24} />
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
}

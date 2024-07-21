"use client";
import { useState, useEffect } from 'react';
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

export default function Post({ postsData, user }: { postsData: PostType, user: UserType }) {
    const [showFullText, setShowFullText] = useState(false);
    const [reactToPost] = useReactToPostMutation();

    useEffect(() => {
        if (postsData.content.length <= maxLength) {
            setShowFullText(true);
        }
    }, [postsData.content.length]);

    const toggleShowMore = () => {
        setShowFullText(!showFullText);
    };

    const text = postsData.content;

    const maxLength = 300;
    const displayText = showFullText ? text : text.substring(0, maxLength) + '...';

    const handleReaction = async (reaction: any) => {
        try {
            const response = await reactToPost({ postId: postsData._id, reaction }).unwrap();
        } catch (error) {
            console.error('Error updating reaction:', error);
        }
    };

    const images = postsData.media;

    const renderImages = () => {
        switch (images.length) {
            case 0:
                return null;
            case 1:
                return (
                    <Link href={`/post-detail/${postsData._id}`}>
                        <img src={images[0]} alt="Post" className="w-full h-auto select-none rounded-sm" />
                    </Link>
                );
            case 2:
                return (
                    <Link href={`/post-detail/${postsData._id}`} className="flex space-x-1">
                        {Array.isArray(images) && images.map((img, idx) => (
                            <img key={idx} src={img} alt="Post" className="w-1/2 h-auto object-cover select-none rounded-sm" />
                        ))}
                    </Link>
                );
            case 3:
                return (
                    <Link href={`/post-detail/${postsData._id}`} className="grid grid-cols-2 gap-1">
                        <img src={images[0]} alt="Post" className="col-span-2 w-full h-auto object-cover rounded-sm select-none" />
                        {images.slice(1, 3).map((img, idx) => (
                            <img key={idx} src={img} alt="Post" className="w-full h-auto object-cover rounded-sm select-none" />
                        ))}
                    </Link>
                );
            case 4:
                return (
                    <Link href={`/post-detail/${postsData._id}`} className="grid grid-cols-3 gap-1">
                        <div className="col-span-2">
                            <img src={images[0]} alt="Post" className="w-full h-full object-cover select-none" />
                        </div>
                        <div className="flex flex-col gap-1">
                            {images.slice(1, 4).map((img, idx) => (
                                <img key={idx} src={img} alt="Post" className="w-full h-auto object-cover rounded-sm select-none" />
                            ))}
                        </div>
                    </Link>
                );
            default:
                return (
                    <Link href={`/post-detail/${postsData._id}`} className="grid grid-cols-3 gap-1">
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
                    </Link>
                );
        }
    };

    return (
        <>
            <div className="mt-8 border p-6 rounded-lg shadow-lg bg-background">
                <div className="flex items-center mb-4">
                    <Avatar className="mr-4 select-none" src={`${postsData.user.pfp.toString()}`} size="md" />
                    <div>
                        <p className="font-semibold text-lg">{postsData.user.username}</p>
                        <p className="text-gray-500 text-sm dark:text-white/50 select-none">{TimeAgo(postsData.createdAt.toString())}</p>
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

                <div className=" text-sm text-gray-500 dark:text-white/50 my-4 select-none">
                    <span>{postsData.reactions.length} reactions</span>
                </div>

                <div className="w-full border-y py-2 mb-4 flex justify-around items-center">
                    <ReactionButton post={postsData} onReact={handleReaction} user={user} /> {/* Use ReactionButton */}
                    <Button variant={"ghost"}>
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
                        <a href="#" className="select-none underline font-semibold text-sm text-gray-500 dark:text-white/50">View all comments</a>
                    </div>
                </div>

                <div className="flex items-center">
                    <Avatar className="select-none mr-4" src={`${user?.pfp}`} alt={`${user?.username}`} size="sm" />
                    <Input className="select-none w-full border bg-gray-100 rounded-lg px-4 py-2 dark:bg-[hsl(0,0%,20%)]" type='text' placeholder="Write your comment..." />
                </div>
            </div>
        </>
    );
}

import React, { useState } from 'react';
import { Avatar } from "@nextui-org/react";
import { Input } from "@/components/ui/inputShadcn";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { Button } from "@/components/ui/button";
import ReactionButton from "@/components/Buttons/ReactionButton";
import Comment from './Comment';
import Link from 'next/link';

const Post = () => {
    const [showFullText, setShowFullText] = useState(false);

    const toggleShowMore = () => {
        setShowFullText(!showFullText);
    };

    const text = `Tầm Quan Trọng Của Giáo Dục Trong Phát Triển Kinh Tế Xã Hội
        Giáo dục luôn được coi là nền tảng của sự phát triển kinh tế xã hội, không chỉ vì nó cung cấp tri thức và kỹ năng cho cá nhân, mà còn vì nó góp phần xây dựng một xã hội văn minh, tiên tiến và bền vững. Trong bối cảnh toàn cầu hóa hiện nay, tầm quan trọng của giáo dục càng được nhấn mạnh khi mà các quốc gia đều nhận ra rằng, đầu tư vào giáo dục là đầu tư cho tương lai.
        Trước hết, giáo dục đóng vai trò quan trọng trong việc nâng cao chất lượng nguồn nhân lực. Một quốc gia muốn phát triển mạnh mẽ thì phải có một lực lượng lao động có trình độ cao, được đào tạo bài bản và có khả năng sáng tạo. Những cá nhân được trang bị kiến thức chuyên môn và kỹ năng mềm sẽ dễ dàng thích nghi với những thay đổi của thị trường lao động, đồng thời họ cũng có khả năng đóng góp nhiều hơn vào sự phát triển của xã hội. Đặc biệt, trong thời đại công nghệ số, việc đào tạo các kỹ năng liên quan đến công nghệ thông tin, trí tuệ nhân tạo và phân tích dữ liệu càng trở nên cần thiết.
        Thứ hai, giáo dục giúp giảm bớt sự bất bình đẳng xã hội. `;

    const maxLength = 300;
    const displayText = showFullText ? text : text.substring(0, maxLength) + '...';

    const handleReaction = (reaction: any) => {
        console.log(`Reacted with: ${reaction}`);
        // Thực hiện các hành động cần thiết khi người dùng thả reaction
    };

    const images = [
        "https://picsum.photos/800/400?1",
        "https://picsum.photos/800/400?2",
        "https://picsum.photos/800/400?3",
        "https://picsum.photos/800/400?4",
        "https://picsum.photos/800/400?5",
    ];

    const renderImages = () => {
        switch (images.length) {
            case 1:
                return (
                    <Link href={`/post-detail/1`}>
                        <img src={images[0]} alt="Post" className="w-full h-auto select-none rounded-sm" />
                    </Link>
                );
            case 2:
                return (
                    <Link href={`/post-detail/1`} className="flex space-x-1">
                        {images.map((img, idx) => (
                            <img key={idx} src={img} alt="Post" className="w-1/2 h-auto object-cover select-none rounded-sm" />
                        ))}
                    </Link>
                );
            case 3:
                return (
                    <Link href={`/post-detail/1`} className="grid grid-cols-2 gap-1">
                        <img src={images[0]} alt="Post" className="col-span-2 w-full h-auto object-cover rounded-sm select-none" />
                        {images.slice(1, 3).map((img, idx) => (
                            <img key={idx} src={img} alt="Post" className="w-full h-auto object-cover rounded-sm select-none" />
                        ))}
                    </Link>
                );
            case 4:
                return (
                    <Link href={`/post-detail/1`} className="grid grid-cols-3 gap-1">
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
                    <Link href={`/post-detail/1`} className="grid grid-cols-3 gap-1">
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
                    <Avatar className="mr-4 select-none" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" size="md" />
                    <div>
                        <p className="font-semibold text-lg">Friend Name</p>
                        <p className="text-gray-500 text-sm dark:text-gray-400 select-none">5 mins ago</p>
                    </div>
                </div>
                <p className="mb-4">{displayText}
                    <button onClick={toggleShowMore} className="select-none text-sm font-medium hover:underline ml-2 text-gray-500 dark:text-gray-400">
                        {showFullText ? 'Show less' : "Show more"}
                    </button>
                </p>

                <div>
                    {renderImages()}
                </div>

                <div className=" text-sm text-gray-500 dark:text-gray-400 my-4 select-none">
                    <span>10 reactions</span>
                </div>

                <div className="w-full border-y py-2 mb-4 flex justify-around items-center">
                    <ReactionButton onReact={handleReaction} /> {/* Sử dụng ReactionButton */}
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
                        <a href="#" className="select-none underline font-semibold text-sm text-gray-500 dark:text-gray-400">View all comments</a>
                    </div>
                </div>

                <div className="flex items-center">
                    <Avatar className="select-none mr-4" src="https://github.com/shadcn.png" size="sm" />
                    <Input className="select-none w-full border bg-gray-100 rounded-lg px-4 py-2 dark:border-gray-600 dark:bg-gray-700" type='text' placeholder="Write your comment..." />
                </div>
            </div>
        </>
    );
}

export default Post;

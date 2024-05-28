import React, { useState } from 'react';
import { Avatar } from "@nextui-org/react";
import { Input } from "@/components/ui/inputShadcn";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { Button } from "@/components/ui/button";
import ReactionButton from "@/components/Buttons/ReactionButton";

function Post({ postData }: { postData: any }) {
    const [showFullText, setShowFullText] = useState(false);
    const [openCommentIndex, setOpenCommentIndex] = useState<number | null>(null);

    const toggleShowMore = () => {
        setShowFullText(!showFullText);
    };

    const toggleCommentShowMore = (index: number) => {
        setOpenCommentIndex(prevIndex => prevIndex === index ? null : index);
    };

    const text = `Tầm Quan Trọng Của Giáo Dục Trong Phát Triển Kinh Tế Xã Hội
        Giáo dục luôn được coi là nền tảng của sự phát triển kinh tế xã hội, không chỉ vì nó cung cấp tri thức và kỹ năng cho cá nhân, mà còn vì nó góp phần xây dựng một xã hội văn minh, tiên tiến và bền vững. Trong bối cảnh toàn cầu hóa hiện nay, tầm quan trọng của giáo dục càng được nhấn mạnh khi mà các quốc gia đều nhận ra rằng, đầu tư vào giáo dục là đầu tư cho tương lai.
        Trước hết, giáo dục đóng vai trò quan trọng trong việc nâng cao chất lượng nguồn nhân lực. Một quốc gia muốn phát triển mạnh mẽ thì phải có một lực lượng lao động có trình độ cao, được đào tạo bài bản và có khả năng sáng tạo. Những cá nhân được trang bị kiến thức chuyên môn và kỹ năng mềm sẽ dễ dàng thích nghi với những thay đổi của thị trường lao động, đồng thời họ cũng có khả năng đóng góp nhiều hơn vào sự phát triển của xã hội. Đặc biệt, trong thời đại công nghệ số, việc đào tạo các kỹ năng liên quan đến công nghệ thông tin, trí tuệ nhân tạo và phân tích dữ liệu càng trở nên cần thiết.
        Thứ hai, giáo dục giúp giảm bớt sự bất bình đẳng xã hội. `;

    const maxLength = 300;
    const displayText = showFullText ? text : text.substring(0, maxLength) + '...';

    const handleReaction = (reaction: string) => {
        console.log(`Reacted with: ${reaction}`);
        // Thực hiện các hành động cần thiết khi người dùng thả reaction
    };

    return (
        <>

            <div className="mt-8 border p-6 rounded-lg shadow-lg bg-background ">
                <div className="flex items-center mb-4">
                    <Avatar className="mr-4" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" size="md" />
                    <div>
                        <p className="font-semibold text-lg">Friend Name</p>
                        <p className="text-gray-500 text-sm dark:text-gray-400">5 mins ago</p>
                    </div>
                </div>
                <p className="mb-4">{displayText}
                    <button onClick={toggleShowMore} className="text-sm font-medium hover:underline ml-2 text-gray-500 dark:text-gray-400">
                        {showFullText ? 'Show less' : "Show more"}
                    </button>
                </p>

                <div>
                    <img src="https://picsum.photos/800/400" alt="Post" className="w-full rounded-lg mb-4" />
                    <img src="https://picsum.photos/800/400" alt="Post" className="w-full rounded-lg mb-4" />
                    <img src="https://picsum.photos/800/400" alt="Post" className="w-full rounded-lg mb-4" />
                    <img src="https://picsum.photos/800/400" alt="Post" className="w-full rounded-lg mb-4" />
                </div>

                {/* reaction count */}
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>10 reactions</span>
                </div>

                <div className="w-full border-y py-2 mb-4 flex justify-around items-center">
                    <ReactionButton onReact={handleReaction} /> {/* Sử dụng ReactionButton */}
                    <Button variant={"ghost"}>
                        <FontAwesomeIcon icon={faMessage} />
                        <span className="ml-2">Comment</span>
                    </Button>
                    <Button variant={"ghost"}>
                        <FontAwesomeIcon icon={faShareFromSquare} />
                        <span className="ml-2">Share</span>
                    </Button>
                </div>

                <div className=" mb-4">
                    <div className="flex px-2 py-1 items-center">
                        <Avatar className="mr-2" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" size="sm" />
                        <div className=" p-3 rounded-lg flex-1 ">
                            <p className="font-semibold text-sm">Commenter Name</p>
                            <p className=" text-sm text-wrap">This is a comment.</p>
                            <div>
                                <button className='text-gray-500 dark:text-gray-400 font-semibold hover:underline text-sm'>Like</button>
                                <button className='text-gray-500 dark:text-gray-400 font-semibold hover:underline text-sm ml-2'>Reply</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex px-2 py-1 items-center">
                        <Avatar className="mr-2" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" size="sm" />
                        <div className=" p-3 rounded-lg flex-1 ">
                            <p className="font-semibold text-sm">Commenter Name</p>
                            <p className=" text-sm ">This is a comment.</p>
                            <div>
                                <button className='text-gray-500 dark:text-gray-400 font-semibold hover:underline text-sm'>Like</button>
                                <button className='text-gray-500 dark:text-gray-400 font-semibold hover:underline text-sm ml-2'>Reply</button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <a href="#" className=" underline font-semibold text-sm text-gray-500 dark:text-gray-400">View all comments</a>
                    </div>
                </div>

                <div className="flex items-center">
                    <Avatar className="mr-4" src="https://github.com/shadcn.png" size="sm" />
                    <Input className="w-full border bg-gray-100 rounded-lg px-4 py-2 dark:border-gray-600 dark:bg-gray-700" type='text' placeholder="Write your comment..." />
                </div>
            </div>
        </>
    );
}

export default Post;

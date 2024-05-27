import React, { useState } from 'react';
import { Avatar } from "@nextui-org/react";
import { Input } from "@/components/ui/inputShadcn";
import { ThumbsUp } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { Button } from "@/components/ui/button";

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

        Thứ hai, giáo dục giúp giảm bớt sự bất bình đẳng xã hội. Một hệ thống giáo dục công bằng và chất lượng sẽ tạo điều kiện cho mọi người, bất kể xuất thân hay hoàn cảnh kinh tế, có cơ hội tiếp cận tri thức và phát triển bản thân. Điều này không chỉ giúp giảm thiểu khoảng cách giàu nghèo mà còn thúc đẩy sự công bằng và hoà bình trong xã hội. Những cá nhân được giáo dục tốt thường có khả năng tư duy phản biện, đánh giá vấn đề một cách toàn diện và đóng góp tích cực vào các hoạt động cộng đồng.

        Thứ ba, giáo dục là nền tảng để thúc đẩy sự đổi mới và sáng tạo. Những nghiên cứu khoa học, phát minh và sáng tạo đều xuất phát từ những cơ sở giáo dục chất lượng. Các trường đại học, viện nghiên cứu không chỉ là nơi truyền đạt kiến thức mà còn là môi trường lý tưởng để phát triển các ý tưởng mới, thử nghiệm và ứng dụng các công nghệ tiên tiến. Sự đổi mới trong giáo dục còn góp phần tạo ra những phương pháp giảng dạy mới, hiệu quả hơn, giúp học sinh và sinh viên tiếp thu kiến thức một cách dễ dàng và hứng thú hơn.

        Ngoài ra, giáo dục còn đóng vai trò quan trọng trong việc bảo tồn và phát huy các giá trị văn hóa truyền thống. Qua giáo dục, các thế hệ trẻ được truyền đạt những giá trị văn hóa, lịch sử và đạo đức của dân tộc, từ đó hình thành lòng tự hào và ý thức bảo vệ, phát huy các giá trị tốt đẹp đó. Điều này không chỉ giúp giữ gìn bản sắc văn hóa mà còn góp phần xây dựng một xã hội có đạo đức, có trách nhiệm và đoàn kết.

        Cuối cùng, giáo dục là công cụ quan trọng để giải quyết các vấn đề toàn cầu. Những vấn đề như biến đổi khí hậu, ô nhiễm môi trường, dịch bệnh hay nghèo đói đều đòi hỏi sự hợp tác và hiểu biết sâu rộng từ cộng đồng quốc tế. Giáo dục không chỉ giúp nâng cao nhận thức về các vấn đề này mà còn trang bị cho cá nhân những kiến thức và kỹ năng cần thiết để đóng góp vào việc giải quyết chúng. Một xã hội có trình độ giáo dục cao sẽ có khả năng đối mặt và vượt qua những thách thức toàn cầu một cách hiệu quả hơn.

        Tóm lại, giáo dục là nền tảng vững chắc cho sự phát triển kinh tế xã hội. Đầu tư vào giáo dục là đầu tư vào tương lai, không chỉ của cá nhân mà còn của cả quốc gia. Việc nâng cao chất lượng giáo dục và đảm bảo sự tiếp cận công bằng cho mọi người sẽ tạo ra một lực lượng lao động có trình độ, một xã hội công bằng và văn minh, đồng thời thúc đẩy sự đổi mới và sáng tạo. Chính vì vậy, giáo dục cần được đặt ở vị trí trung tâm trong các chiến lược phát triển của mỗi quốc gia.`;

    const maxLength = 300;
    const displayText = showFullText ? text : text.substring(0, maxLength) + '...';

    return (
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
            <div className="w-full border-y py-2 mb-4 flex justify-around items-center">
                <Button variant={"ghost"}>
                    <ThumbsUp size={"16px"} />
                    <span className="ml-2">Like</span>
                </Button>
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
                    </div>
                </div>
                <div className="flex px-2 py-1 items-center">
                    <Avatar className="mr-2" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" size="sm" />
                    <div className=" p-3 rounded-lg flex-1 ">
                        <p className="font-semibold text-sm">Commenter Name</p>
                        <p className=" text-sm ">This is a comment.</p>
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
    );
}

export default Post;

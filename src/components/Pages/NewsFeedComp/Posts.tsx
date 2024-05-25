import { Avatar } from "@nextui-org/react";
import { Input } from "@/components/ui/inputShadcn";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';

function Post() {
    return (
        <div className="mt-6">
            <div className="border p-6 rounded-lg shadow-lg bg-background ">
                <div className="flex items-center mb-4">
                    <Avatar className="mr-4" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" size="md" />
                    <div>
                        <p className="font-semibold text-lg">Friend Name</p>
                        <p className="text-gray-500 text-sm dark:text-gray-400">5 mins ago</p>
                    </div>
                </div>
                <p className="mb-4 ">This is a friend's post content.</p>

                <div className="w-full border-y py-2 mb-4 flex justify-around items-center">
                    <div>
                        <ThumbUpOffAltIcon />
                        <span className="ml-2">Like</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faMessage} />
                        <span className="ml-2">Comment</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faShareFromSquare} />
                        <span className="ml-2">Share</span>
                    </div>
                </div>

                {/* Comments */}
                <div className="space-y-4 mb-4">
                    <div className="flex items-start">
                        <Avatar className="mr-4" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" size="sm" />
                        <div className="bg-gray-100 p-3 rounded-lg flex-1 dark:bg-gray-700">
                            <p className="font-semibold text-sm">Commenter Name</p>
                            <p className="text-gray-700 text-sm dark:text-gray-200">This is a comment.</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <Avatar className="mr-4" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" size="sm" />
                        <div className="bg-gray-100 p-3 rounded-lg flex-1 dark:bg-gray-700">
                            <p className="font-semibold text-sm">Commenter Name</p>
                            <p className="text-gray-700 text-sm dark:text-gray-200">This is another comment.</p>
                        </div>
                    </div>
                    <a href="#" className="underline font-semibold text-sm text-blue-500 dark:text-blue-400">View all comments</a>
                </div>

                {/* Input để nhập comment */}
                <div className="flex items-center">
                    <Avatar className="mr-4" src="https://github.com/shadcn.png" size="sm" />
                    <Input className="w-full border bg-gray-100 rounded-lg px-4 py-2 dark:border-gray-600 dark:bg-gray-700" type='text' placeholder="Write your comment..." />
                </div>
            </div>
        </div>
    );
}

export default Post;
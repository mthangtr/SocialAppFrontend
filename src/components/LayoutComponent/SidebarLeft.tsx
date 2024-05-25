import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import FeedIcon from '@mui/icons-material/Feed';
import SendIcon from '@mui/icons-material/Send';

function RightSidebar() {
    return (
        <aside className="w-full h-full p-4">
            <div className="flex items-center mb-6">
                <Avatar className="cursor-pointer">
                    <AvatarImage
                        src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="ml-4 text-xl font-semibold">Truong Manh Thang</h1>
            </div>
            <nav className="space-y-4">
                <div className="flex items-center p-2 cursor-pointer">
                    <PeopleIcon className="text-blue-500" />
                    <h1 className="ml-4 text-lg font-medium">Friends</h1>
                </div>
                <div className="flex items-center p-2 cursor-pointer">
                    <GroupsIcon className="text-green-500" />
                    <h1 className="ml-4 text-lg font-medium">Groups</h1>
                </div>
                <div className="flex items-center p-2 cursor-pointer">
                    <FeedIcon className="text-yellow-500" />
                    <h1 className="ml-4 text-lg font-medium">Feeds</h1>
                </div>
                <div className="flex items-center p-2 cursor-pointer">
                    <SendIcon className="text-red-500" />
                    <h1 className="ml-4 text-lg font-medium">Messages</h1>
                </div>
            </nav>
        </aside>
    );
}

export default RightSidebar;

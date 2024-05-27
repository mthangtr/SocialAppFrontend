import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import FeedIcon from '@mui/icons-material/Feed';
import SendIcon from '@mui/icons-material/Send';
import { Button } from "../ui/button";

function RightSidebar() {
    return (
        <aside className="w-full h-full p-4">
            <Button variant={"ghost"} className="flex justify-start mb-4 py-7 w-full">
                <Avatar className="cursor-pointer">
                    <AvatarImage
                        src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="ml-4 text-xl font-semibold ">Truong Manh Thang</h1>
            </Button>
            <nav className="space-y-4">
                <Button variant={"ghost"} className="flex justify-start px-2 py-6 cursor-pointer w-full">
                    <PeopleIcon className="ml-1" />
                    <h1 className="ml-4 text-lg font-medium">Friends</h1>
                </Button>
                <Button variant={"ghost"} className="flex justify-start px-2 py-6 cursor-pointer w-full">
                    <GroupsIcon className="ml-1" />
                    <h1 className="ml-4 text-lg font-medium">Groups</h1>
                </Button>
                <Button variant={"ghost"} className="flex justify-start px-2 py-6 cursor-pointer w-full">
                    <FeedIcon className="ml-1" />
                    <h1 className="ml-4 text-lg font-medium">Feeds</h1>
                </Button>
                <Button variant={"ghost"} className="flex justify-start px-2 py-6 cursor-pointer w-full">
                    <SendIcon className="ml-1" />
                    <h1 className="ml-4 text-lg font-medium">Messages</h1>
                </Button>
            </nav>
        </aside>
    );
}

export default RightSidebar;

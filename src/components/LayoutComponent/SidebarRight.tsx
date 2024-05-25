import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "../ui/button";

function RightSidebar() {
    return (
        <div className="p-2 w-full h-full">
            <div className="flex flex-col space-y-4">
                <div className="bg-background px-4 py-2 rounded-md">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold">Follow request</h2>
                        <h5 className="flex justify-center items-center text-sm font-semibold underline">View all</h5>
                    </div>
                    <ul className="space-y-4 mt-4">
                        <li className="space-x-4">
                            <div className="flex items-center space-x-4 p-1 bg-inherit">
                                <Avatar className="cursor-pointer">
                                    <AvatarImage
                                        src="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/442418097_122101367162321833_4821368780677637599_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=6wGkJndwrWsQ7kNvgFuQHgF&_nc_ht=scontent.fhan19-1.fna&oh=00_AYBIKQlrRTJQnPYHSLpc0aLP5exOGQUcpYBU0BQSYZSnow&oe=66572D99"
                                        alt="@ThuongHuyen"
                                    />
                                    <AvatarFallback>TH</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <a href="#" className="font-semibold">ThuongHuyen</a>
                                    <p className="text-gray-500">1 mutual friend</p>
                                    <div className="flex space-x-2 mt-2">
                                        <Button variant="default">Accept</Button>
                                        <Button variant="secondary">Decline</Button>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="space-x-4">
                            <div className="flex items-center space-x-4 p-1 bg-inherit">
                                <Avatar className="cursor-pointer">
                                    <AvatarImage
                                        src="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/442418097_122101367162321833_4821368780677637599_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=6wGkJndwrWsQ7kNvgFuQHgF&_nc_ht=scontent.fhan19-1.fna&oh=00_AYBIKQlrRTJQnPYHSLpc0aLP5exOGQUcpYBU0BQSYZSnow&oe=66572D99"
                                        alt="@ThuongHuyen"
                                    />
                                    <AvatarFallback>TH</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <a href="#" className="font-semibold">ThuongHuyen</a>
                                    <p className="text-gray-500">1 mutual friend</p>
                                    <div className="flex space-x-2 mt-2">
                                        <Button variant="default">Accept</Button>
                                        <Button variant="secondary">Decline</Button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="bg-background px-4 py-2 rounded-md">
                    <h2 className="text-lg font-semibold">Contact with</h2>
                    <ul className="space-y-2 mt-2">
                        <li className="flex items-center space-x-2">
                            <Avatar className="cursor-pointer">
                                <AvatarImage
                                    src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <a href="#" className="font-semibold">Shadcn</a>
                                <p className="text-gray-400">Software Engineer</p>
                            </div>
                        </li>
                        <li className="flex items-center space-x-2">
                            <Avatar className="cursor-pointer">
                                <AvatarImage
                                    src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <a href="#" className="font-semibold">Shadcn</a>
                                <p className="text-gray-400">Software Engineer</p>
                            </div>
                        </li>
                        <li className="flex items-center space-x-2">
                            <Avatar className="cursor-pointer">
                                <AvatarImage
                                    src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <a href="#" className="font-semibold">Shadcn</a>
                                <p className="text-gray-400">Software Engineer</p>
                            </div>
                        </li>
                        <li className="flex items-center space-x-2">
                            <Avatar className="cursor-pointer">
                                <AvatarImage
                                    src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <a href="#" className="font-semibold">Shadcn</a>
                                <p className="text-gray-400">Software Engineer</p>
                            </div>
                        </li>
                        <li className="flex items-center space-x-2">
                            <Avatar className="cursor-pointer">
                                <AvatarImage
                                    src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <a href="#" className="font-semibold">Shadcn</a>
                                <p className="text-gray-400">Software Engineer</p>
                            </div>
                        </li>
                        <li className="flex items-center space-x-2">
                            <Avatar className="cursor-pointer">
                                <AvatarImage
                                    src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <a href="#" className="font-semibold">Shadcn</a>
                                <p className="text-gray-400">Software Engineer</p>
                            </div>
                        </li>
                        <li className="flex items-center space-x-2">
                            <Avatar className="cursor-pointer">
                                <AvatarImage
                                    src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <a href="#" className="font-semibold">Shadcn</a>
                                <p className="text-gray-400">Software Engineer</p>
                            </div>
                        </li>
                        <li className="flex items-center space-x-2">
                            <Avatar className="cursor-pointer">
                                <AvatarImage
                                    src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <a href="#" className="font-semibold">Shadcn</a>
                                <p className="text-gray-400">Software Engineer</p>
                            </div>
                        </li>
                        <li className="flex items-center space-x-2">
                            <Avatar className="cursor-pointer">
                                <AvatarImage
                                    src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <a href="#" className="font-semibold">Shadcn</a>
                                <p className="text-gray-400">Software Engineer</p>
                            </div>
                        </li>
                        <li className="flex items-center space-x-2">
                            <Avatar className="cursor-pointer">
                                <AvatarImage
                                    src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <a href="#" className="font-semibold">Shadcn</a>
                                <p className="text-gray-400">Software Engineer</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default RightSidebar;
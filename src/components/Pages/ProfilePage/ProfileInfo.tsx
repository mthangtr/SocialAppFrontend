import { useEffect, useState } from "react";
import { UserType } from "@/types/Global";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@/components/ui/button";
import EditForm from "../NewsFeedComp/PostComponents/EditForm";
import { useUpdateProfileMutation } from "@/lib/api/userApi";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/inputShadcn";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Label } from "@/components/ui/label"
import AvatarEditorUpload from "./AvatarEditorUpload";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/lib/states/authSlice";

import BackgroundImageContainer from "./BackgroundImageContainer";

interface ProfileInfoProps {
    user?: UserType;
    currentUser?: UserType;
}

function ProfileInfo({ user, currentUser }: ProfileInfoProps) {
    const toast = useToast();
    const dispatch = useDispatch();
    const [isClient, setIsClient] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [userNewUsername, setUserNewUsername] = useState(user?.username);

    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (user?.username) {
            setUserNewUsername(user.username);
        }
    }, [user]);

    const handleSaveUpdateProfile = async (updateType: string, updatedData: string) => {
        if (!currentUser?._id) return;

        try {
            let updatedUser;
            switch (updateType) {
                case "bio":
                    updatedUser = await updateProfile({ userId: currentUser?._id, body: { bio: updatedData } }).unwrap();
                    break;

                case "username":
                    updatedUser = await updateProfile({ userId: currentUser?._id, body: { username: updatedData } }).unwrap();
                    break;

                default:
                    console.warn("Unsupported update type");
                    return;
            }
            dispatch(setCredentials(updatedUser));
            toast.toast({
                title: "Profile updated",
                description: "Your profile has been updated successfully.",
            });

            setIsEditing(false);
        } catch (error: any) {
            if (error?.data?.error === "Username is already taken.") {
                toast.toast({
                    title: "Username already taken",
                    description: "The username you entered is already taken. Please try another one.",
                });
            } else {
                toast.toast({
                    title: "Update failed",
                    description: "Something went wrong. Please try again.",
                });
            }
        }
    };

    const testBackgroundImage =
        "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU";

    return (
        <>
            <BackgroundImageContainer imageUrl={testBackgroundImage} />
            <div className="flex flex-col items-center">
                {isEditing ? (
                    <div className="relative mt-8 group cursor-pointer">
                        {/* Avatar with black overlay */}
                        <Avatar src={user?.pfp} size="lg" className="relative opacity-50 group-hover:opacity-75 transition-opacity" />

                        {/* Black layer with Pencil Icon (same size as Avatar) */}
                        <div className="absolute inset-0 flex justify-center items-center rounded-full">
                            <AvatarEditorUpload onUploadDone={() => setIsEditing(false)} />
                        </div>
                    </div>
                ) : (
                    <PhotoProvider>
                        <PhotoView src={user?.pfp}>
                            <Avatar src={user?.pfp} size="lg" className="mt-8" />
                        </PhotoView>
                    </PhotoProvider>
                )}
                {isEditing ? (
                    <div className="flex flex-col items-center">
                        <div className="grid w-full gap-1.5 mt-4 mb-2">
                            <Label htmlFor="message">Username: </Label>
                            <Input
                                defaultValue={userNewUsername}
                                onChange={(e) => setUserNewUsername(e.target.value)}
                            />
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="message">Bio: </Label>
                            <EditForm
                                initialContent={user?.bio || ""}
                                onCancel={() => setIsEditing(false)}
                                onSave={(newBio) => handleSaveUpdateProfile("bio", newBio)}
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <h1 className="text-2xl mt-4 mb-2">{userNewUsername}</h1>
                        <p className="text-sm text-gray-500">{user?.bio || "No bio yet."}</p>
                    </>
                )}

                {isClient && currentUser?._id === user?._id && (
                    <div className="flex mt-4">
                        {isEditing ? (
                            <div className="flex gap-2">
                                {userNewUsername != user?.username && <Button variant="default" color="primary" onClick={() => handleSaveUpdateProfile("username", userNewUsername)} disabled={isLoading}>
                                    Save
                                </Button>}
                                <Button variant="outline" color="primary" onClick={() => {
                                    setUserNewUsername(user?.username);
                                    setIsEditing(false);
                                }}>Cancel</Button>
                            </div>
                        ) : (
                            <>
                                <Button variant="outline" color="primary" onClick={() => setIsEditing(true)}>
                                    Edit Profile
                                </Button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default ProfileInfo;

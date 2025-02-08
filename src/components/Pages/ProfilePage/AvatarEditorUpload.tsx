import React, { FC, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUpdateAvatarMutation } from "@/lib/api/userApi";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setCredentials } from "@/lib/states/authSlice";
import { UserType } from "@/types/Global";
interface AvatarEditorUploadProps {
    onUploadDone?: () => void;
}

const AvatarEditorUpload: FC<AvatarEditorUploadProps> = ({ onUploadDone }) => {
    const dispatch = useAppDispatch();
    const [image, setImage] = useState<string | null>(null);
    const [scale, setScale] = useState(1.2);
    const [isOpen, setIsOpen] = useState(false);
    const editorRef = useRef<AvatarEditor | null>(null);
    const toast = useToast();

    // Fetch user from Redux store
    const user = useAppSelector((state) => state.auth.userInfo);
    const userId = user?._id; // Ensure user ID is correctly retrieved

    // Use correct mutation hook for avatar upload
    const [updateAvatar, { isLoading }] = useUpdateAvatarMutation();

    // Handle File Selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // Show preview of uploaded image
            setIsOpen(true); // Open editor dialog
        }
    };

    // Handle Cropping & Uploading
    const handleSave = async () => {
        if (!userId) {
            toast.toast({
                title: "Error",
                description: "User ID is missing. Please log in again.",
            });
            return;
        }

        if (editorRef.current) {
            // Get Cropped Image
            const canvas = editorRef.current.getImageScaledToCanvas();
            canvas.toBlob(async (blob) => {
                if (blob) {
                    const formData = new FormData();
                    formData.append("avatar", blob, "avatar.png");
                    let updatedUser: UserType;
                    try {
                        updatedUser = await updateAvatar({ userId, formData }).unwrap();
                        dispatch(setCredentials(updatedUser));
                        if (onUploadDone) {
                            onUploadDone();
                        }
                        toast.toast({
                            title: "Profile Picture Updated",
                            description: "Your avatar has been successfully updated.",
                        });
                        setIsOpen(false);
                    } catch (error) {
                        toast.toast({
                            title: "Upload Failed",
                            description: "Something went wrong. Please try again.",
                        });
                        console.error(error);
                    }
                }
            }, "image/png");
        }
    };

    return (
        <>
            {/* Upload Button */}
            <label className="cursor-pointer flex items-center gap-2">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <Pencil size={24} className="text-gray-500 hover:text-gray-700" />
            </label>

            {/* Avatar Editing Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[450px]">
                    <DialogHeader>
                        <DialogTitle>Edit Avatar</DialogTitle>
                        <DialogDescription>Upload and adjust your new profile picture.</DialogDescription>
                    </DialogHeader>

                    {/* Avatar Editor */}
                    {image && (
                        <AvatarEditor
                            ref={editorRef}
                            image={image}
                            width={250}
                            height={250}
                            border={50}
                            color={[255, 255, 255, 0.6]} // RGBA
                            scale={scale}
                            rotate={0}
                        />
                    )}

                    {/* Slider for Adjusting Zoom */}
                    <input
                        type="range"
                        min="1"
                        max="3"
                        step="0.1"
                        value={scale}
                        onChange={(e) => setScale(parseFloat(e.target.value))}
                        className="w-full my-2"
                    />

                    {/* Save & Cancel Buttons */}
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={isLoading}>
                            {isLoading ? "Uploading..." : "Save"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default AvatarEditorUpload;

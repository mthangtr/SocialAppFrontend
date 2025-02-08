import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface EditFormProps {
    initialContent: string;
    onSave: (updatedText: string) => void;
    onCancel: () => void;
}

export default function EditForm({ initialContent, onSave, onCancel }: EditFormProps) {
    const [updatedText, setUpdatedText] = useState(initialContent);

    return (
        <div className="w-full">
            <Textarea
                value={updatedText}
                onChange={(e) => setUpdatedText(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-2">
                {initialContent != updatedText &&
                    <>
                        <button
                            onClick={() => onSave(updatedText)}
                            className="text-xs font-semibold text-gray-500 dark:text-white/50 hover:underline select-none"
                        >
                            Save
                        </button>
                        <button
                            onClick={onCancel}
                            className="text-xs font-semibold text-gray-500 dark:text-white/50 hover:underline select-none"
                        >
                            Cancel
                        </button>
                    </>
                }

            </div>
        </div>
    );
}

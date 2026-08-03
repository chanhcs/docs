"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { getConvexErrorMessage } from "@/lib/errors";

interface RenameDialogProps {
    documentId: Id<"documents">;
    initialTitle: string;
    children: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
}

export const RenameDialog = ({ documentId, initialTitle, children, onOpenChange }: RenameDialogProps) => {
    const update = useMutation(api.documents.updateById);
    const [open, setOpenState] = useState(false);
    const [title, setTitle] = useState(initialTitle);
    const [isUpdating, setIsUpdating] = useState(false);

    const setOpen = (nextOpen: boolean) => {
        setOpenState(nextOpen);
        onOpenChange?.(nextOpen);
    };

    const handleRename = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            await update({ id: documentId, title: title.trim() || "Untitled document" });
            toast.success("Document renamed");
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error(getConvexErrorMessage(error, "Couldn't rename the document."));
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen);
                if (nextOpen) setTitle(initialTitle);
            }}
        >
            <DialogTrigger nativeButton={false} render={children as React.ReactElement} />
            <DialogContent className="data-[size=default]:sm:max-w-md">
                <form onSubmit={handleRename} className="grid gap-4">
                    <DialogHeader className="gap-4">
                        <DialogTitle className="font-bold">Rename document</DialogTitle>
                        <DialogDescription>Please enter a new name for this item</DialogDescription>
                    </DialogHeader>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Document title"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                    />
                    <DialogFooter className="border-t-0 bg-transparent pt-0">
                        <Button type="button" variant="outline" disabled={isUpdating} onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-blue-600 text-white hover:bg-blue-600/90"
                            disabled={isUpdating}
                        >
                            Rename
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

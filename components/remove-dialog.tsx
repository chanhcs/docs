"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { getConvexErrorMessage } from "@/lib/errors";

interface RemoveDialogProps {
    documentId: Id<"documents">;
    children: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
}

export const RemoveDialog = ({ documentId, children, onOpenChange }: RemoveDialogProps) => {
    const remove = useMutation(api.documents.removeById);
    const [open, setOpenState] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    const setOpen = (nextOpen: boolean) => {
        setOpenState(nextOpen);
        onOpenChange?.(nextOpen);
    };

    const handleRemove = async () => {
        setIsRemoving(true);
        try {
            await remove({ id: documentId });
            toast.success("Document deleted");
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error(getConvexErrorMessage(error, "Couldn't delete the document."));
        } finally {
            setIsRemoving(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger nativeButton={false} render={children as React.ReactElement} />
            <AlertDialogContent className="data-[size=default]:sm:max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-bold">Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your document.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="border-t-0 bg-transparent">
                    <AlertDialogCancel disabled={isRemoving}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        className="bg-destructive text-white hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90"
                        disabled={isRemoving}
                        onClick={handleRemove}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

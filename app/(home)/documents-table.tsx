import { useState } from "react";
import { Table, TableCell, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table";
import { Doc } from "@/convex/_generated/dataModel";
import { PaginationStatus } from "convex/react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SiGoogledocs } from "react-icons/si";
import { Building2Icon, CircleUserIcon, ExternalLinkIcon, MoreVertical, PencilIcon, TrashIcon } from "lucide-react";
import { RemoveDialog } from "@/components/remove-dialog";
import { RenameDialog } from "@/components/rename-dialog";

interface DocumentsTableProps {
    documents: Doc<"documents">[],
    loadMore: (numItems: number) => void,
    status: PaginationStatus,
}

const DocumentsTable = ({ documents, loadMore, status }: DocumentsTableProps) => {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-16 py-5 overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden sm:table-cell">Shared</TableHead>
                        <TableHead className="hidden sm:table-cell">Created at</TableHead>
                        <TableHead>&nbsp;</TableHead>
                    </TableRow>
                </TableHeader>
                {documents.length === 0 ? (
                    <TableBody>
                        <TableRow className="hover:bg-transparent">
                            <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                No documents found
                            </TableCell>
                        </TableRow>
                    </TableBody>
                ) : (
                    <TableBody>
                        {documents.map((document) => (
                            <DocumentRow key={document._id} document={document} />
                        ))}
                    </TableBody>
                )}
            </Table>
            {documents.length !== 0 && (
                <div className="flex justify-center mt-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => loadMore(5)}
                        disabled={status !== "CanLoadMore"}
                    >
                        {status === "CanLoadMore" ? "Load more" : "End of results"}
                    </Button>
                </div>
            )}
        </div>
    );
};

interface DocumentRowProps {
    document: Doc<"documents">;
}

const DocumentRow = ({ document }: DocumentRowProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <TableRow className="cursor-pointer">
            <TableCell className="flex items-center gap-2 min-w-0">
                <SiGoogledocs className="size-6 shrink-0 fill-blue-500" />
                <span className="truncate">{document.title}</span>
            </TableCell>
            <TableCell className="hidden sm:table-cell text-muted-foreground">
                <div className="flex items-center gap-2">
                    {document.organizationId ? <Building2Icon className="size-4" /> : <CircleUserIcon className="size-4" />}
                    {document.organizationId ? "Organization" : "Presonal"}
                </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">{format(document._creationTime, "MMM d, yyyy")}</TableCell>
            <TableCell className="text-right">
                <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                    <DropdownMenuTrigger
                        render={<Button variant="ghost" size="icon" className="size-7" />}
                    >
                        <MoreVertical className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                            className="whitespace-nowrap"
                            onClick={() => window.open(`/documents/${document._id}`, "_blank")}
                        >
                            <ExternalLinkIcon className="size-4" />
                            Open in a new tab
                        </DropdownMenuItem>
                        <RenameDialog
                            documentId={document._id}
                            initialTitle={document.title}
                            onOpenChange={(dialogOpen) => {
                                if (!dialogOpen) setDropdownOpen(false);
                            }}
                        >
                            <DropdownMenuItem
                                className="whitespace-nowrap"
                                closeOnClick={false}
                            >
                                <PencilIcon className="size-4" />
                                Rename
                            </DropdownMenuItem>
                        </RenameDialog>
                        <RemoveDialog
                            documentId={document._id}
                            onOpenChange={(dialogOpen) => {
                                if (!dialogOpen) setDropdownOpen(false);
                            }}
                        >
                            <DropdownMenuItem
                                className="whitespace-nowrap"
                                closeOnClick={false}
                            >
                                <TrashIcon className="size-4" />
                                Delete
                            </DropdownMenuItem>
                        </RemoveDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
};

export default DocumentsTable;
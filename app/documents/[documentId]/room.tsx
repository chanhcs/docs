"use client";

import { ReactNode, useEffect, useState } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
    useErrorListener,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { Loader } from "@/components/loader";
import { getUsers } from "./actions";
import { toast } from "sonner";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

type User = { id: string; name: string; avatar: string }

function RoomErrorSurface({ roomId }: { roomId: string }) {
    const [error, setError] = useState<Error | null>(null);

    useErrorListener((liveblocksError) => {
        if (liveblocksError.context.roomId !== roomId) {
            return;
        }
        setError(
            (current) =>
                current ??
                new Error(liveblocksError.message, { cause: liveblocksError })
        );
    });

    if (error) {
        throw error;
    }

    return null;
}

export function Room({ children }: { children: ReactNode }) {
    const params = useParams();
    const roomId = params.documentId as string;
    const convex = useConvex();
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUsers();
                setUsers(data)
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch users")
            }
        }
        fetchUser()
    }, [])

    return (
        <LiveblocksProvider
            throttle={16}
            authEndpoint={async () => {
                const endpoint = "/api/liveblocks-auth";
                const room = params.documentId as string;

                const response = await fetch(endpoint, {
                    method: "POST",
                    body: JSON.stringify({ room }),
                });
                return await response.json();
            }}
            resolveUsers={({ userIds }) => {
                return userIds.map(userId => users.find(user => user.id === userId))
            }}
            resolveMentionSuggestions={({ text }) => {
                let filteredUsers = users;
                if (text) {
                    filteredUsers = users.filter(user => user.name.toLowerCase().includes(text.toLowerCase()))
                }
                return filteredUsers.map(user => user.id);
            }}
            resolveRoomsInfo={async ({ roomIds }) => {
                const documents = await convex.query(api.documents.getByIds, {
                    ids: roomIds as Id<"documents">[],
                });
                return documents.map((document) => ({
                    name: document.name,
                }));
            }}
        >
            <RoomErrorSurface roomId={roomId} />
            <RoomProvider id={roomId}>
                <ClientSideSuspense fallback={<Loader label="Room loading..." />}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}

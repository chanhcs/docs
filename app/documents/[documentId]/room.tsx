"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
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
import { DEFAULT_MARGIN } from "./use-margins";

type User = { id: string; name: string; avatar: string; color: string }

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
    const usersPromiseRef = useRef<Promise<User[]> | null>(null)

    const fetchUsers = useCallback(() => {
        if (!usersPromiseRef.current) {
            usersPromiseRef.current = getUsers().catch((error) => {
                console.log(error);
                toast.error("Failed to fetch users")
                usersPromiseRef.current = null;
                return [] as User[];
            })
        }
        return usersPromiseRef.current;
    }, [])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

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
            resolveUsers={async ({ userIds }) => {
                const list = await fetchUsers();
                return userIds.map(userId => list.find(user => user.id === userId))
            }}
            resolveMentionSuggestions={async ({ text }) => {
                const list = await fetchUsers();
                let filteredUsers = list;
                if (text) {
                    filteredUsers = list.filter(user => user.name.toLowerCase().includes(text.toLowerCase()))
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
            <RoomProvider
                id={roomId}
                initialStorage={{
                    leftMargin: DEFAULT_MARGIN,
                    rightMargin: DEFAULT_MARGIN,
                }}
            >
                <ClientSideSuspense fallback={<Loader label="Room loading..." />}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}

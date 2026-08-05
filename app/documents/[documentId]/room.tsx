"use client";

import { ReactNode, useState } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
    useErrorListener,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { Loader } from "@/components/loader";

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

    return (
        <LiveblocksProvider
            throttle={16}
            authEndpoint="/api/liveblocks-auth"
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

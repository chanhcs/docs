"use client";

import { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

// NEXT_PUBLIC_* được Next.js inline lúc build, nên phải viết nguyên biểu thức
// process.env.TEN_BIEN thì mới được thay thế đúng.
function getPublicApiKey(): string {
    const key = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY;
    if (!key) {
        throw new Error(
            "Thiếu NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY. Thêm biến này vào .env.local rồi khởi động lại dev server."
        );
    }
    return key;
}

const publicApiKey = getPublicApiKey();

export function Room({ children }: { children: ReactNode }) {
    const params = useParams();

    return (
        <LiveblocksProvider publicApiKey={publicApiKey}>
            <RoomProvider id={params.documentId as string}>
                <ClientSideSuspense fallback={<div>Loading…</div>}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}
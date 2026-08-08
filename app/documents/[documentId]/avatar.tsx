"use client";

import Image from "next/image";
import { ClientSideSuspense, useUser } from "@liveblocks/react";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { Separator } from "@/components/ui/separator";

interface AvatarProps {
    userId: string;
    fallback: { name: string; avatar: string };
    name?: string;
};

export const Avatars = () => {
    return (
        <ClientSideSuspense fallback={null}>
            <AvatarStack />
        </ClientSideSuspense>
    );
};

const AvatarStack = () => {
    const users = useOthers();
    const currentUser = useSelf();

    if (users.length === 0) return null;

    return (
        <>
            <div className="flex items-center">
                {currentUser && (
                    <div className="relative ml-2">
                        <Avatar userId={currentUser.id} fallback={currentUser.info} name="You" />
                    </div>
                )}
                <div className="flex">
                    {users.map(({ connectionId, id, info }) => {
                        return (
                            <Avatar key={connectionId} userId={id} fallback={info} />
                        )
                    })}
                </div>
            </div>
            <Separator orientation="vertical" className="h-6" />
        </>
    )
}

const Avatar = ({ userId, fallback, name }: AvatarProps) => {
    const { user } = useUser(userId);
    const src = user?.avatar ?? fallback.avatar;
    const label = name ?? user?.name ?? fallback.name;

    return (
        <div className="group -ml-2 flex size-8 shrink-0 place-content-center relative border-2 border-white rounded-full bg-gray-400">
            <div className="opacity-0 group-hover:opacity-100 absolute top-full py-1 px-2 text-white text-xs rounded-lg mt-2.5 z-10 bg-black whitespace-nowrap transition-opacity" >
                {label}
            </div>
            <Image
                alt={label}
                src={src}
                fill
                sizes="32px"
                className="rounded-full object-cover"
            />
        </div>
    );
};
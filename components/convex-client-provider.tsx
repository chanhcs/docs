"use client";

import {
    ConvexReactClient,
    Authenticated,
    Unauthenticated,
    AuthLoading,
} from "convex/react";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthCard } from "@/components/auth/auth-card";
import { Loader } from "./loader";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const PUBLIC_ROUTES = ["/sso-callback"];

export function ConvexClientProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    return <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            {isPublicRoute ? (
                children
            ) : (
                <>
                    <Authenticated>
                        {children}
                    </Authenticated>
                    <Unauthenticated>
                        <AuthCard />
                    </Unauthenticated>
                    <AuthLoading>
                        <Loader label="Auth Loading..." />
                    </AuthLoading>
                </>
            )}
        </ConvexProviderWithClerk>
    </ClerkProvider>
}
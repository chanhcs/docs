"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SsoCallbackPage() {
    return (
        <>
            <AuthenticateWithRedirectCallback
                signInUrl="/"
                signUpUrl="/"
                signInFallbackRedirectUrl="/"
                signUpFallbackRedirectUrl="/"
            />

            <div id="clerk-captcha" />
        </>
    );
}

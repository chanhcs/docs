"use client";

import { useState, type FormEvent } from "react";
import { useClerk, useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { GoogleIcon } from "./google-icon";
import { PasswordInput } from "./password-input";

const RATE_LIMIT_MESSAGE = "Too many attempts. Please wait a moment and try again.";

function isRateLimitError(err: unknown): boolean {
    if (isClerkAPIResponseError(err) && err.status === 429) return true;
    if (err && typeof err === "object") {
        if ((err as { status?: unknown }).status === 429) return true;
        const cause = (err as { cause?: unknown }).cause;
        if (cause && typeof cause === "object" && (cause as { status?: unknown }).status === 429) return true;
    }
    return false;
}

function getErrorMessage(err: unknown, fallback: string): string {
    if (isRateLimitError(err)) {
        return RATE_LIMIT_MESSAGE;
    }
    if (isClerkAPIResponseError(err)) {
        return err.errors[0]?.longMessage || err.errors[0]?.message || fallback;
    }
    if (err instanceof Error) {
        return err.message || fallback;
    }
    return fallback;
}

export function SignInForm() {
    const { signIn, fetchStatus } = useSignIn();
    const clerk = useClerk();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [googleLoading, setGoogleLoading] = useState(false);

    const isSubmitting = fetchStatus === "fetching";

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        try {
            const { error } = await signIn.password({ emailAddress: email, password });
            if (error) {
                console.error("signIn.password failed:", error);
                setError(isRateLimitError(error) ? RATE_LIMIT_MESSAGE : error.longMessage || error.message || "Incorrect email or password.");
                return;
            }
            if (signIn.status === "complete") {
                await signIn.finalize();
            }
        } catch (err) {
            console.error("signIn.password threw:", err);
            setError(getErrorMessage(err, "Incorrect email or password."));
        }
    }

    async function handleGoogle() {
        setError(null);
        setGoogleLoading(true);
        try {
            await clerk.client.signIn.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: `${window.location.origin}/sso-callback`,
                redirectUrlComplete: `${window.location.origin}/`,
            });
        } catch (err) {
            console.error("signIn Google redirect failed:", err);
            setError("Couldn't sign in with Google. Please try again.");
            setGoogleLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <button
                type="button"
                onClick={handleGoogle}
                disabled={googleLoading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white text-[15px] font-semibold text-[#1a1a1a] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <GoogleIcon className="size-5" />
                {googleLoading ? "Redirecting..." : "Sign in with Google"}
            </button>

            <div className="flex items-center gap-3 text-xs text-gray-400 uppercase">
                <div className="h-px flex-1 bg-gray-200" />
                or
                <div className="h-px flex-1 bg-gray-200" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="signin-email" className="mb-2 block text-sm font-semibold text-[#1a1a1a]">
                        Email
                    </label>
                    <input
                        id="signin-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-[15px] text-[#1a1a1a] placeholder:text-gray-400 outline-none focus:border-[#e2574c] focus:ring-2 focus:ring-[#e2574c]/20"
                    />
                </div>
                <div>
                    <label htmlFor="signin-password" className="mb-2 block text-sm font-semibold text-[#1a1a1a]">
                        Password
                    </label>
                    <PasswordInput
                        id="signin-password"
                        value={password}
                        onChange={setPassword}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                    />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex h-12 w-full items-center justify-center rounded-xl bg-[#e2574c] text-[15px] font-bold text-white transition hover:bg-[#d1483d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
            </form>
        </div>
    );
}

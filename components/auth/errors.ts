import { isClerkAPIResponseError } from "@clerk/nextjs/errors";

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

/**
 * Turns anything Clerk can hand back into a message for the user. Covers both
 * shapes the forms deal with: errors thrown out of a call, and the `error`
 * object returned by `signIn.*` / `signUp.*`.
 */
export function getErrorMessage(err: unknown, fallback: string): string {
    if (isRateLimitError(err)) {
        return RATE_LIMIT_MESSAGE;
    }
    if (isClerkAPIResponseError(err)) {
        return err.errors[0]?.longMessage || err.errors[0]?.message || fallback;
    }
    if (err && typeof err === "object") {
        const { longMessage, message } = err as { longMessage?: string; message?: string };
        return longMessage || message || fallback;
    }
    return fallback;
}

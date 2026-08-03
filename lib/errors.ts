import { ConvexError } from "convex/values";

export function getConvexErrorMessage(err: unknown, fallback: string): string {
    if (err instanceof ConvexError) {
        return typeof err.data === "string" ? err.data : fallback;
    }
    return fallback;
}

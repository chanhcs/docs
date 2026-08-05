"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon, RefreshCcwIcon, TriangleAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
    error: Error & { digest?: string };
    unstable_retry: () => void;
}

export default function ErrorPage({ error, unstable_retry }: ErrorPageProps) {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/40 p-6">
            <div className="w-full max-w-md flex flex-col items-center gap-6 rounded-xl border border-border bg-background p-8 shadow-sm">
                <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10">
                    <TriangleAlertIcon className="size-7 text-destructive" />
                </div>

                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-xl font-semibold text-foreground">
                        Something went wrong
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        An unexpected error occurred. You can try again or go back to
                        the previous page.
                    </p>
                </div>

                <div className="w-full rounded-lg border border-border bg-muted/50 p-3">
                    <p className="wrap-break-word text-left font-mono text-xs text-muted-foreground">
                        {error.message || "Unknown error"}
                    </p>
                    {error.digest && (
                        <p className="mt-2 break-all text-left font-mono text-[11px] text-muted-foreground/70">
                            Digest: {error.digest}
                        </p>
                    )}
                </div>

                <div className="flex w-full flex-col-reverse gap-2 sm:flex-row">
                    <Button
                        variant="outline"
                        size="lg"
                        className="flex-1"
                        onClick={() => router.back()}
                    >
                        <ArrowLeftIcon />
                        Go Back
                    </Button>
                    <Button
                        size="lg"
                        className="flex-1"
                        onClick={() => unstable_retry()}
                    >
                        <RefreshCcwIcon />
                        Try again
                    </Button>
                </div>
            </div>
        </div>
    );
}

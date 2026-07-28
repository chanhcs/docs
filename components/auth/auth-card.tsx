"use client";

import { useState } from "react";
import { AuthIllustration } from "./auth-illustration";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";

type Mode = "sign-in" | "sign-up";

const COPY: Record<Mode, { eyebrow: string; subtitle: string }> = {
    "sign-in": {
        eyebrow: "Welcome back",
        subtitle: "Welcome back! Please enter your details.",
    },
    "sign-up": {
        eyebrow: "Create account",
        subtitle: "Let's get you started. Please enter your details.",
    },
};

export function AuthCard() {
    const [mode, setMode] = useState<Mode>("sign-in");
    const copy = COPY[mode];

    return (
        <div className="fixed inset-0 z-50 grid overflow-y-auto lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <div className="flex items-center justify-center bg-white px-6 py-12 sm:px-12 lg:px-16">
                <div className="w-full max-w-sm">
                    <h1 className="text-3xl font-black tracking-wide text-[#1a1a1a] uppercase sm:text-4xl">
                        {copy.eyebrow}
                    </h1>
                    <p className="mt-3 text-sm text-gray-500">{copy.subtitle}</p>

                    <div className="mt-6">
                        {mode === "sign-in" ? <SignInForm /> : <SignUpForm />}
                    </div>

                    <div id="clerk-captcha" />

                    <p className="mt-6 text-center text-sm text-gray-500">
                        {mode === "sign-in"
                            ? "Don't have an account? "
                            : "Already have an account? "}
                        <button
                            type="button"
                            onClick={() => setMode(mode === "sign-in" ? "sign-up" : "sign-in")}
                            className="text-sm font-semibold text-[#e2574c] hover:underline"
                        >
                            {mode === "sign-in" ? "Sign up for free!" : "Sign in"}
                        </button>
                    </p>
                </div>
            </div>

            <div className="hidden lg:block">
                <AuthIllustration />
            </div>
        </div>
    );
}

"use client";

import { useState, type SubmitEvent } from "react";
import { useSignUp } from "@clerk/nextjs";
import { PasswordInput } from "./password-input";
import { getErrorMessage } from "./errors";

export function SignUpForm() {
    const { signUp, fetchStatus } = useSignUp();
    const [step, setStep] = useState<"details" | "verify">("details");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [code, setCode] = useState("");
    const [error, setError] = useState<string | null>(null);

    const isSubmitting = fetchStatus === "fetching";

    function showError(err: unknown, fallback: string) {
        const message = getErrorMessage(err, fallback);
        setError(message);
    }

    async function handleDetailsSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        try {
            const { error } = await signUp.password({ emailAddress: email, password });
            if (error) {
                console.error("signUp.password failed:", error);
                showError(error, "Couldn't create your account. Please try again.");
                return;
            }
            if (signUp.status === "complete") {
                await signUp.finalize();
                return;
            }
            const sendResult = await signUp.verifications.sendEmailCode();
            if (sendResult.error) {
                console.error("signUp.verifications.sendEmailCode failed:", sendResult.error);
                showError(sendResult.error, "Couldn't send the verification code. Please try again.");
                return;
            }
            setStep("verify");
        } catch (err) {
            console.error("signUp.password threw:", err);
            showError(err, "Couldn't create your account. Please try again.");
        }
    }

    async function handleVerifySubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        try {
            const { error } = await signUp.verifications.verifyEmailCode({ code });
            if (error) {
                console.error("signUp.verifications.verifyEmailCode failed:", error);
                showError(error, "Incorrect verification code.");
                return;
            }
            if (signUp.status === "complete") {
                await signUp.finalize();
            }
        } catch (err) {
            console.error("signUp.verifications.verifyEmailCode threw:", err);
            showError(err, "Incorrect verification code.");
        }
    }

    if (step === "verify") {
        return (
            <form onSubmit={handleVerifySubmit} className="flex flex-col gap-4">
                <p className="text-sm text-gray-500">
                    We sent a verification code to{" "}
                    <span className="font-semibold text-[#1a1a1a]">{email}</span>.
                </p>
                <div>
                    <label htmlFor="signup-code" className="mb-2 block text-sm font-semibold text-[#1a1a1a]">
                        Verification code
                    </label>
                    <input
                        id="signup-code"
                        inputMode="numeric"
                        required
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter the 6-digit code"
                        className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-[15px] text-[#1a1a1a] placeholder:text-gray-400 outline-none focus:border-[#e2574c] focus:ring-2 focus:ring-[#e2574c]/20"
                    />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex h-12 w-full items-center justify-center rounded-xl bg-[#e2574c] text-[15px] font-bold text-white transition hover:bg-[#d1483d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? "Verifying..." : "Verify email"}
                </button>
            </form>
        );
    }

    return (
        <form onSubmit={handleDetailsSubmit} className="flex flex-col gap-4">
            <div>
                <label htmlFor="signup-email" className="mb-2 block text-sm font-semibold text-[#1a1a1a]">
                    Email
                </label>
                <input
                    id="signup-email"
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
                <label htmlFor="signup-password" className="mb-2 block text-sm font-semibold text-[#1a1a1a]">
                    Password
                </label>
                <PasswordInput
                    id="signup-password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Create a password"
                    autoComplete="new-password"
                />
            </div>
            <div>
                <label htmlFor="signup-confirm-password" className="mb-2 block text-sm font-semibold text-[#1a1a1a]">
                    Confirm password
                </label>
                <PasswordInput
                    id="signup-confirm-password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div id="clerk-captcha" />

            <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-[#e2574c] text-[15px] font-bold text-white transition hover:bg-[#d1483d] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting ? "Creating account..." : "Sign up"}
            </button>
        </form>
    );
}

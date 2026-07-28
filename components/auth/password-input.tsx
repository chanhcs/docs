"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
    id: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    autoComplete: "current-password" | "new-password";
}

export function PasswordInput({ id, value, onChange, placeholder, autoComplete }: PasswordInputProps) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative">
            <input
                id={id}
                type={visible ? "text" : "password"}
                required
                autoComplete={autoComplete}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 pr-12 text-[15px] text-[#1a1a1a] placeholder:text-gray-400 outline-none focus:border-[#e2574c] focus:ring-2 focus:ring-[#e2574c]/20"
            />
            <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                tabIndex={-1}
                aria-label={visible ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-400 hover:text-gray-600"
            >
                {visible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
        </div>
    );
}

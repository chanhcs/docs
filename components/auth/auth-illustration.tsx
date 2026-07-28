export function AuthIllustration() {
    return (
        <div className="relative hidden h-full w-full items-center justify-center overflow-hidden bg-[#ececec] lg:flex">
            <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full opacity-[0.06]"
                preserveAspectRatio="xMidYMid slice"
            >
                <path
                    d="M0 30 Q 25 10, 50 30 T 100 30"
                    stroke="black"
                    strokeWidth="0.6"
                    fill="none"
                />
                <path
                    d="M0 60 Q 25 40, 50 60 T 100 60"
                    stroke="black"
                    strokeWidth="0.6"
                    fill="none"
                />
                <path
                    d="M0 85 Q 25 65, 50 85 T 100 85"
                    stroke="black"
                    strokeWidth="0.6"
                    fill="none"
                />
            </svg>

            <div className="relative flex h-72 w-72 items-center justify-center rounded-full bg-[#e2574c]/10 xl:h-96 xl:w-96">
                <div className="absolute h-full w-full rounded-full border border-[#e2574c]/30" />
                <div className="flex h-[70%] w-[70%] items-center justify-center rounded-full bg-[#e2574c]/15">
                    <div className="flex h-[65%] w-[65%] items-center justify-center rounded-full bg-[#1a1a1a] shadow-2xl">
                        <span className="text-4xl font-black tracking-tight text-white xl:text-5xl">
                            Docs
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

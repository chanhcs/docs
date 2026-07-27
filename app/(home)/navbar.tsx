'use client'

import Image from "next/image";
import Link from "next/link";
import SearchInput from "./search-input";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
    return (
        <nav className="flex w-full items-center justify-between gap-6 px-4 py-3">
            <div className="flex shrink-0 items-center gap-3">
                <Link href="/">
                    <Image src="/logo.svg" alt="logo" width={36} height={36} />
                </Link>
                <h3 className="text-xl font-medium">Docs</h3>
            </div>
            <SearchInput />
            <UserButton />
        </nav>
    );
};

export default Navbar;

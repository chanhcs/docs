'use client'

import Image from "next/image";
import Link from "next/link";
import SearchInput from "./search-input";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";

const Navbar = () => {
    return (
        <nav className="flex w-full items-center justify-between gap-2 sm:gap-6 px-4 py-3">
            <div className="flex shrink-0 items-center gap-3">
                <Link href="/">
                    <Image src="/logo.svg" alt="logo" width={36} height={36} />
                </Link>
                <h3 className="hidden text-xl font-medium sm:block">Docs</h3>
            </div>
            <SearchInput />
            <div className="flex items-center gap-2">
                <OrganizationSwitcher
                    afterCreateOrganizationUrl="/"
                    afterLeaveOrganizationUrl="/"
                    afterSelectOrganizationUrl="/"
                    afterSelectPersonalUrl="/"
                />
                <UserButton />
            </div>
        </nav>
    );
};

export default Navbar;

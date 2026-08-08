import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from "next/link";
import { Avatars } from './avatar';
import { Inbox } from './inbox';
import { DocumentInput } from './document-input';

const Navbar = () => {
    return (
        <div className='flex items-center justify-between gap-2 ml-2 max-lg:ml-0'>
            <div className='flex items-center gap-2 min-w-0'>
                <Link href='/' className='shrink-0'>
                    <Image src='/logo.svg' alt='logo' height={28} width={28} />
                </Link>
                <DocumentInput />
            </div>
            <div className="flex items-center gap-2 max-sm:gap-1 shrink-0">
                <Inbox />
                <Avatars />
                <div className='max-sm:hidden'>
                    <OrganizationSwitcher
                        afterCreateOrganizationUrl="/"
                        afterLeaveOrganizationUrl="/"
                        afterSelectOrganizationUrl="/"
                        afterSelectPersonalUrl="/"
                    />
                </div>
                <UserButton />
            </div>
        </div>
    );
};

export default Navbar;
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from "next/link";
import { Avatars } from './avatar';
import { Inbox } from './inbox';

const Navbar = () => {
    return (
        <div className='flex justify-between ml-2'>
            <div className='flex items-center gap-2'>
                <Link href='/'>
                    <Image src='/logo.svg' alt='logo' height={28} width={28} />
                </Link>
                <span>Untitle Document</span>
            </div>
            <div className="flex items-center gap-2">
                <Inbox />
                <Avatars />
                <OrganizationSwitcher
                    afterCreateOrganizationUrl="/"
                    afterLeaveOrganizationUrl="/"
                    afterSelectOrganizationUrl="/"
                    afterSelectPersonalUrl="/"
                />
                <UserButton />
            </div>
        </div>
    );
};

export default Navbar;
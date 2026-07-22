import Image from 'next/image';
import Link from "next/link";

const Navbar = () => {
    return (
        <div className='flex self-start items-center justify-center gap-2 ml-2'>
            <Link href='/'>
                <Image src='/logo.svg' alt='logo' height={28} width={28} />
            </Link>
            <span>Untitle Document</span>
        </div>
    );
};

export default Navbar;
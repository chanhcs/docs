import Image from 'next/image';

const Navbar = () => {
    return (
        <div className='flex self-start items-center justify-center gap-2 ml-2'>
            <Image src='/logo.svg' alt='logo' height={28} width={28} />
            <div>
                <span>Untitle Document</span>
            </div>
        </div>
    );
};

export default Navbar;
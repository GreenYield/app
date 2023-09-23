import React, { useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { usePrivy } from '@privy-io/react-auth';


const Navbar = () => {
    const router = useRouter();
    const {
        ready,
        authenticated,
        login,
    } = usePrivy();

    useEffect(() => {
        if (ready && authenticated) {
            router.push('/app/home');
        }
    }, [ready, authenticated, router]);

    return (
        <div className="py-2">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-3 pt-1 sm:px-0">
                <div className="w-64">
                    <Link href="/">
                        <Image src="/logo.png" alt='greeyield.xyz' width={220} height={220} />
                    </Link>
                </div>
                <button onClick={login} className='rounded-full bg-lime-400 text-black px-3 py-0.5 font-montserrat font-light text-sm sm:text-lg -mb-0.5'>Join Now</button>
            </nav>
            <div className='py-1' >
                <hr className='text-lime-400' />
            </div>
        </div>
    )
}

export default Navbar

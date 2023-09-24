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
        <nav className="py-2 z-50">
            <div className="mx-auto flex max-w-7xl items-center justify-between pt-1 px-3">
                <div className="w-64">
                    <Link href="/">
                        <Image src="/logo.png" alt='greeyield.xyz' width={220} height={220} />
                    </Link>
                </div>
                <button onClick={login} className='rounded-full bg-lime-400 text-black px-3 py-0.5 text-sm sm:text-lg -mb-0.5'>Join Now</button>
            </div>
            <div className='py-1' >
                <hr className='text-lime-400' />
            </div>
        </nav>
    )
}

export default Navbar

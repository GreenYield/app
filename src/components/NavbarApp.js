import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { usePrivy, useWallets } from '@privy-io/react-auth';


const Navbar = () => {
    const router = useRouter();
    const { ready, authenticated, logout, user } = usePrivy();
    // const { wallets } = useWallets();
    // const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
    // const provider = embeddedWallet.getEthersProvider();
    const [userAddress, setUserAddress] = useState('');

    useEffect(() => {
        if (!authenticated) {
            router.push('/');
        }
        else if (!user.wallet.address) {
            router.push('/');
        }
        if (ready) {
            getUserAddress();
            console.log(userAddress);
            //console.log(provider)
            //console.log(embeddedWallet.address)
        }
    }, [ready, authenticated, router]);

    async function getUserAddress() {
        let userAddress;
        userAddress = user.wallet.address;
        setUserAddress(userAddress);
        return userAddress;
    }
    console.log(user)

    return (
        <div className="py-2 z-50 bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-3 pt-1 sm:px-0">
                <div className="w-64">
                    <Link href="/">
                        <Image src="/logo.png" alt='greeyield.xyz' width={220} height={220} />
                    </Link>
                </div>
                <button onClick={logout} className='rounded-full bg-lime-400 text-black px-3 py-0.5 font-montserrat font-light mb-0.5'>LOG OUT</button>
            </nav>
            <div className='py-1' >
                <hr className='text-lime-400' />
            </div>
        </div>
    )
}

export default Navbar

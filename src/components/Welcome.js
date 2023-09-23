import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { usePrivy } from '@privy-io/react-auth';

const Welcome = () => {
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
        <div>
            <div className='pt-60 font-normal font-montserrat text-2xl px-5'>
                <div className='sm:flex sm:justify-center sm:items-center sm:mx-auto sm:text-3xl'>
                    <span className='text-lime-400'>Don't let your money sleep on a bank account.</span>
                    <span className='text-black px-1'>Own it. Multiply it.</span>
                </div>
                <div className='pt-5 sm:pt-8 flex justify-center mx-auto items-center'>
                    <button onClick={login} className='rounded-full bg-lime-400 text-black px-3 py-0.5 font-montserrat font-light text-sm sm:text-lg'>Join Now</button>
                </div>
            </div>
            <div className='bottom-0 fixed flex justify-center mx-auto items-center w-full'>
                <span className='text-black text-xs bottom-0'>Built w/ ❤️ @ETHNewYork</span>
            </div>
        </div>
    )
}

export default Welcome

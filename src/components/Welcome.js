import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { usePrivy } from '@privy-io/react-auth';

const Welcome = () => {
    const router = useRouter();
    const { ready, authenticated, login } = usePrivy();
    const initialText = "Don't let your money sleep on a bank account.";
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [subText, setSubText] = useState('');
    const [subTextIndex, setSubTextIndex] = useState(0);

    useEffect(() => {
        if (ready && authenticated) {
            router.push('/app/home');
        }
    }, [ready, authenticated, router]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentIndex < initialText.length) {
                setDisplayedText(initialText.substring(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            } else if (subTextIndex < "Own it. Multiply it.".length) {
                setSubText(subText + "Own it. Multiply it."[subTextIndex]);
                setSubTextIndex(subTextIndex + 1);
            } else {
                clearTimeout(timer);
            }
        }, 70);

        return () => clearTimeout(timer);
    }, [currentIndex, subTextIndex]);

    const handleLoginClick = () => {
        login();
    };

    return (
        <div>
            <div className='pt-60 font-normal font-montserrat text-2xl px-5'>
                <div className='sm:flex sm:justify-center sm:items-center sm:mx-auto sm:text-3xl'>
                    <span className='text-lime-400'>{displayedText}</span>
                    <span className='text-black px-1'>{subText}</span>
                </div>
                <div className='pt-5 sm:pt-8 flex justify-center mx-auto items-center'>
                    <button onClick={handleLoginClick} className='rounded-full bg-lime-400 text-black px-3 py-0.5 font-montserrat font-light text-sm sm:text-lg'>Join Now</button>
                </div>
            </div>
            <div className='bottom-0 fixed flex justify-center mx-auto items-center w-full'>
                <span className='text-black text-xs bottom-0'>Built w/ ❤️ @ETHNewYork</span>
            </div>
        </div>
    );
}

export default Welcome;

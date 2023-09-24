import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { usePrivy } from '@privy-io/react-auth';
import Particles from '@/pages/utils/particles';

const Welcome = () => {
    // const [onLoad, setOnLoad] = useState(false)
    const router = useRouter();
    const { ready, authenticated, login } = usePrivy();
    const initialText = "Don't let your money sleep in a bank account.";
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [subText, setSubText] = useState('');
    const [subTextIndex, setSubTextIndex] = useState(0);

    //const tailwindString = `opacity-0 transition-all duration-300 ${onLoad ? "opacity-100" : "opacity-100"}`


    //useEffect(() => { setOnLoad(true) }, [])

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
            <div className="absolute inset-0 max-w-6xl mx-auto px-4 sm:px-6 top-0 z-0 pointer-events-none">
                <Particles
                    className="absolute top-40 inset-0 z-0 pointer-events-none"
                    quantity={20}
                />
            </div>
            <div className='pt-40 md:pt-80 font-normal px-5 bg-white z-[100]'>
                <div className='text-center sm:flex sm:justify-center flex-col font-medium sm:items-center sm:mx-auto gap-y-6 '>
                    <span className='text-lime-400 text-2xl sm:text-4xl md:text-6xl'>{displayedText}</span>
                    <div className='text-black px-1 text-lg md:text-3xl'>{subText}</div>
                </div>
                <div className='pt-8 flex justify-center mx-auto items-center'>
                    <button onClick={handleLoginClick} className='rounded-full bg-lime-400 text-black px-3 py-0.5 text-sm sm:text-lg'>Join Now</button>
                </div>
            </div>
            <div className='bottom-0 fixed flex justify-center mx-auto items-center w-full'>
                <span className='text-black text-xs bottom-0'>Built w/ ❤️ @ETHNewYork</span>
            </div>
        </div>
    );
}

export default Welcome;

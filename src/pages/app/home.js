import React, { useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/NavbarApp';
import BottomBar from '@/components/BottomBar';



const Home = () => {

    return (
        <div>
            <Head>
                <title>Home · GreenYield.xyz</title>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon-512x512.png"></link>
                <meta name="theme-color" content="#fff" />
                <link rel="icon" href="/fav.ico" />
                <meta name='description' content="Don't let your money lie idle!" />
                <link rel="canonical" href="https://www.greenyield.xyz/" />
                <meta name="robots" content="follow, index" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="GreenYield.xyz" />
                <meta property="og:description" content="Don't let your money lie idle!" />
                <meta property="og:url" content="https://www.greenyield.xyz/" />
                <meta property="og:image" content="https://www.greenyield.xyz/og.jpg" />
            </Head>
            <Navbar />
            <div className='pt-1 justify-center max-w-xl items-center mx-auto'>
                <div className='pt-1 mx-4'>
                    <h2 className='font-light text-md justify-start'>Home</h2>
                </div>
            </div>
            <BottomBar />
        </div >
    );
};

export default Home;

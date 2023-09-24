


import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/NavbarApp';
import BottomBar from '@/components/BottomBar';

const Home = () => {
    const [depositsV2, setDepositsV2] = useState([]);
    const [depositsV3, setDepositsV3] = useState([]);

    useEffect(() => {
        const query = `
    {
      account(id: "0x1143Fd58A4E777B8AA71805Ea9B683FBb945265f")
      {
        deposits(orderBy: timestamp)
        {
          amountUSD
          timestamp
        }
      }
    }
    `;
        fetch('https://api.thegraph.com/subgraphs/name/messari/aave-v2-polygon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.dir(data, { depth: null });
                setDepositsV2(data.data.account.deposits);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        const query = `
    {
      account(id: "0x1143Fd58A4E777B8AA71805Ea9B683FBb945265f")
      {
        deposits(orderBy: timestamp)
        {
          amountUSD
          timestamp
        }
      }
    }
    `;
        fetch('https://api.thegraph.com/subgraphs/name/messari/aave-v3-polygon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.dir(data, { depth: null });
                setDepositsV3(data.data.account.deposits);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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
            <div className="pt-1 justify-center max-w-xl items-center mx-auto">
                <div className="pt-1 mx-4">
                    <h2 className="font-light text-md justify-start">Home</h2>
                </div>
                {/* Display deposits */}
                <ul>
                    {depositsV2.map((deposit, index) => (
                        <li key={index}>
                            Amount: {deposit.amountUSD}, Timestamp: {deposit.timestamp}
                        </li>
                    ))}
                </ul>
                <ul>
                    {depositsV3.map((deposit, index) => (
                        <li key={index}>
                            Amount: {deposit.amountUSD}, Timestamp: {deposit.timestamp}
                        </li>
                    ))}
                </ul>

            </div>
            <BottomBar />
        </div>
    );
};

export default Home;

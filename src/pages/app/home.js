


import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/NavbarApp';
import BottomBar from '@/components/BottomBar';
import { usePrivy } from '@privy-io/react-auth';


const Home = () => {
    const { user, ready } = usePrivy();
    const [depositsV2, setDepositsV2] = useState([]);
    const [depositsV3, setDepositsV3] = useState([]);

    useEffect(() => {
        const query = `
    {
      account(id: "0x9b4FF9682287Ac2207f3981c02922C0a3E1F515D")
      {
        deposits(orderBy: timestamp)
        {
          amountUSD
          timestamp
        }
      }
    }
    `;
        const timeoutId = setTimeout(() => {
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
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        const query = `
    {
      account(id: ${user.wallet.address})
      {
        deposits(orderBy: timestamp)
        {
          amountUSD
          timestamp
        }
      }
    }
    `;
        if (ready) {
            const timeoutId = setTimeout(() => {
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
            }, 2000);
            return () => clearTimeout(timeoutId);
        }
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
                {depositsV2.length === 0 && depositsV3.length === 0 ? (
                    <div className='mx-5 border border-lime-400 p-2 text-md'>
                        <h2 className='text-md text-center font-semibold'>Welcome to greenyield.xyz! 🎈</h2>
                        <h3 className='pt-2 text-sm text-center'>Here is a quick overview on how it works :</h3>
                        <ul className='text-sm text-center pt-1'>
                            <li className='text-xs'>1. Fund your account with your debit/credit card.</li>
                            <li className='text-xs'>2. Choose the yield source that you want.</li>
                            <li className='text-xs'>3. Approve & Deposit $.</li>
                            <li className='text-xs'>4. Enjoy the yield!</li>
                            <li className='text-xs'>5. Withdraw when you want.</li>
                        </ul>
                    </div>
                ) : (
                    <>
                        <div className="pt-1 mx-4">
                            <h2 className="font-light text-md justify-start">Home</h2>
                        </div>
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
                    </>
                )}

            </div>
            <BottomBar />
        </div>
    );
};

export default Home;

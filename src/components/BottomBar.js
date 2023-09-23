import React from 'react'
import Link from 'next/link'

const BottomBar = () => {
    return (
        <div>
            <div className="fixed bottom-0 w-full flex justify-center">
                <div className="grid grid-cols-3 p-3 mx-10 border-t rounded-full shadow-lg items-center bg-lime-400 ">
                    <Link href="/app/home" className="mx-3 flex flex-col items-center">
                        <img src="/home_black.png" alt="Home" className="h-8 w-8 items-center" />
                        {/* <span className="pt-3 font-extralight font-montserrat text-xs">HOME</span> */}
                    </Link>
                    <Link href="/app/yield" className="mx-3 flex flex-col items-center">
                        <img src="/yield_black.png" alt="yield" className="h-10 w-10 items-center" />
                        {/* <span className="pt-3 font-extralight font-montserrat text-xs">YIELD</span> */}
                    </Link>
                    <Link href="/app/wallet" className="mx-3 flex flex-col items-center">
                        <img src="/wallet_black.png" alt="wallet" className="h-14 w-14 items-center" />
                        {/* <span className="pt-3 font-extralight font-montserrat text-xs">WALLET</span> */}
                    </Link>
                </div>
                <div className='fixed -bottom-0'></div>
            </div>
        </div>
    )
}

export default BottomBar

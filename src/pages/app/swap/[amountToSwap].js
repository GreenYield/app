import React, { useState, useEffect } from 'react';
import Navbar from '@/components/NavbarApp';
import BottomBar from '@/components/BottomBar';
import { useRouter } from 'next/router';


const Swap = () => {
    const router = useRouter();
    const { amountToSwap } = router.query;


    return (
        <div>
            <Navbar />
            {amountToSwap}
            <BottomBar />
        </div >
    );
};

export default Swap;

import React, { useState, useEffect, useRef } from "react";
import { GateFiDisplayModeEnum, GateFiSDK } from "@gatefi/js-sdk";
import crypto from "crypto-browserify";
import Head from 'next/head';
import Navbar from '@/components/NavbarApp';
import BottomBar from '@/components/BottomBar';
import { usePrivy } from '@privy-io/react-auth';
import { ethers } from 'ethers';

const Home = () => {
    const { user } = usePrivy();
    const overlayInstanceSDK = useRef(null);
    const embedInstanceSDK = useRef(null);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [usdtBalance, setUsdtBalance] = useState(0);
    const [amountToSwap, setAmountToSwap] = useState('')

    useEffect(() => {
        console.log(user.wallet.address);
        fetchUsdtBalance(user.wallet.address);
        return () => {
            overlayInstanceSDK.current?.destroy();
            overlayInstanceSDK.current = null;
            embedInstanceSDK.current?.destroy();
            embedInstanceSDK.current = null;

        };
    }, []);

    useEffect(() => {
        const applyCustomUnlimit = () => {
            var iframe = document.querySelector('iframe[src="https://onramp-sandbox.gatefi.com/"]');
            if (iframe) {
                var div = iframe.parentElement;
                if (div.getAttribute('style')) {
                    div.setAttribute('style', div.getAttribute('style') + 'display: block !important;');
                } else {
                    div.setAttribute('style', 'display: block !important;');
                }

                if (iframe.getAttribute('style')) {
                    iframe.setAttribute('style', iframe.getAttribute('style') + 'width: 100% !important; height: 100% !important; border: none !important; border-radius: 0px !important; box-shadow: none !important; position: absolute !important;');
                } else {
                    iframe.setAttribute('style', 'width: 100% !important; height: 100% !important; border: none !important; border-radius: 0px !important; box-shadow: none !important; position: absolute !important;');
                }
            }
        };
        const waitForSDKRender = () => {
            const sdkRenderInterval = setInterval(() => {
                if (document.querySelector('iframe[src="https://onramp-sandbox.gatefi.com/"]')) {
                    applyCustomUnlimit();
                    clearInterval(sdkRenderInterval);
                }
            }, 1000);
        };

        waitForSDKRender();
    }, []);


    const handleBuyInputChange = (e) => {
        setAmountToSwap(e.target.value);
    }

    const fetchUsdtBalance = async (walletAddress) => {
        try {
            const provider = new ethers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/2wXwqcw_WT-a2gJSH4QM4V6ECw64VU_y");
            const usdtAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
            const usdtContractABI = [
                { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "userAddress", "type": "address" }, { "indexed": false, "internalType": "address payable", "name": "relayerAddress", "type": "address" }, { "indexed": false, "internalType": "bytes", "name": "functionSignature", "type": "bytes" }], "name": "MetaTransactionExecuted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "previousAdminRole", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "newAdminRole", "type": "bytes32" }], "name": "RoleAdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleGranted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleRevoked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "CHILD_CHAIN_ID", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "CHILD_CHAIN_ID_BYTES", "outputs": [{ "internalType": "bytes", "name": "", "type": "bytes" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DEFAULT_ADMIN_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DEPOSITOR_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ERC712_VERSION", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ROOT_CHAIN_ID", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ROOT_CHAIN_ID_BYTES", "outputs": [{ "internalType": "bytes", "name": "", "type": "bytes" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }], "name": "changeName", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "bytes", "name": "depositData", "type": "bytes" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "userAddress", "type": "address" }, { "internalType": "bytes", "name": "functionSignature", "type": "bytes" }, { "internalType": "bytes32", "name": "sigR", "type": "bytes32" }, { "internalType": "bytes32", "name": "sigS", "type": "bytes32" }, { "internalType": "uint8", "name": "sigV", "type": "uint8" }], "name": "executeMetaTransaction", "outputs": [{ "internalType": "bytes", "name": "", "type": "bytes" }], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "getChainId", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "getDomainSeperator", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "getNonce", "outputs": [{ "internalType": "uint256", "name": "nonce", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleAdmin", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getRoleMember", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleMemberCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "hasRole", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "uint8", "name": "decimals_", "type": "uint8" }, { "internalType": "address", "name": "childChainManager", "type": "address" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "renounceRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
            ];
            const usdtContract = new ethers.Contract(usdtAddress, usdtContractABI, provider);

            const balanceWei = await usdtContract.balanceOf(walletAddress);
            const balanceString = balanceWei.toString();
            const balanceStringEth = parseFloat(balanceString) / 1e6;
            const balanceOK = balanceStringEth.toFixed(2)
            setUsdtBalance(balanceOK);
        } catch (error) {
            console.error("Error fetching USDT balance:", error);
        }
    };

    const handleOnClick = () => {
        if (overlayInstanceSDK.current) {
            if (isOverlayVisible) {
                overlayInstanceSDK.current.hide();
                setIsOverlayVisible(false);
            } else {
                overlayInstanceSDK.current.show();
                setIsOverlayVisible(true);
                //TEST
                const customStylesheet = document.createElement('link');
                customStylesheet.rel = 'stylesheet';
                customStylesheet.href = '/widget-custom.css';
                document.head.appendChild(customStylesheet);
            }
        } else {
            const randomString = crypto.randomBytes(32).toString("hex");
            overlayInstanceSDK.current = new GateFiSDK({
                merchantId: "e84aa41d-d13e-4bae-bc26-e65383875dc3",
                displayMode: GateFiDisplayModeEnum.Overlay,
                nodeSelector: "#overlay-button",
                isSandbox: true,
                walletAddress: user.wallet.address,
                externalId: randomString,
                defaultFiat: {
                    currency: "USD",
                    amount: amountToSwap,
                },
                defaultCrypto: {
                    currency: "USDT-MATIC",
                },
                redirectUrl: `http://localhost:3000/app/swap/${amountToSwap}`,
            });
        }
        overlayInstanceSDK.current?.show();

        setIsOverlayVisible(true);
    };

    function withdraw() {
        alert('Will sell crypto to fiat w/ unlimit here!')
    }

    return (
        <div>
            <Head>
                <title>Manage your Wallet · GreenYield.xyz</title>
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
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <h2 className='font-light text-md'>Your Wallet </h2>
                            <img src='/wallet_black.png' width={26} height={26} className='mr-1 mx-1 mt-0.5' />
                        </div>
                        <div className='text-right'>
                            <h2 className='font-light text-md justify-start mx-4'>Your Balance:<span className='text-lime-400 font-bold px-1'> ${usdtBalance}</span></h2>
                        </div>
                    </div>
                </div>
                <div className="pt-40"></div>
                <div className="border border-black rounded-lg p-4 mx-4">
                    <h3 className='text-lime-400 font-semibold pt-2 text-center text-2xl'>Deposit</h3>
                    <div className="flex items-centerfont-light text-md justify-center mx-auto pt-4">
                        <input
                            type="number"
                            value={amountToSwap}
                            onChange={handleBuyInputChange}
                            placeholder="Amount to Deposit"
                            className="bg-black text-white text-xs rounded-xl border border-lime-400 mr-2 px-2 py-1"
                        />
                        <button
                            onClick={handleOnClick}
                            className="rounded-full bg-lime-400 text-black text-xs px-2 py-1"
                        >
                            DEPOSIT
                        </button>
                    </div>
                </div>
                <div className="pt-4"></div>
                <div className="border border-black rounded-lg p-4 mx-4">
                    <h3 className='text-lime-400 font-semibold pt-2 text-center text-2xl'>Withdraw</h3>
                    <div className="flex items-centerfont-light text-md justify-center mx-auto pt-4">
                        <input
                            type="number"
                            placeholder="Amount to Withdraw"
                            className="bg-black text-white text-xs rounded-xl border border-lime-400 mr-2 px-2 py-1"
                        />
                        <button
                            onClick={withdraw}
                            className="rounded-full bg-lime-400 text-black text-xs px-2 py-1"
                        >
                            WITHDRAW
                        </button>
                    </div>
                </div>
                <div className="w-2 h-2">
                    <div id="overlay-button"></div>
                </div>
            </div>

            <BottomBar />
        </div >
    );
};

export default Home;

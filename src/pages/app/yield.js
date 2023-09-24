import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/NavbarApp';
import BottomBar from '@/components/BottomBar';
import { usePrivy } from '@privy-io/react-auth';
import { ethers } from 'ethers';
import AAVEV2ABI from '../../utils/AAVEV2ABI.json';
import AAVEV3ABI from '../../utils/AAVEV3ABI.json';
import USDTABI from '../../utils/usdtABI.json';
import USDCABI from '../../utils/usdcABI.json';
import COMPABI from '../../utils/COMPABI.json';


const Yield = () => {
    const { user, sendTransaction, ready } = usePrivy();
    const [usdtBalance, setUsdtBalance] = useState(0);
    const [usdtBalanceWei, setUsdtBalanceWei] = useState(0);
    const [usdcBalance, setUsdcBalance] = useState(0);
    const [usdcBalanceWei, setUsdcBalanceWei] = useState(0);
    const [aaveV2Balance, setAAVEV2Balance] = useState(0);
    const [aaveV2BalanceWei, setAAVEV2BalanceWei] = useState(0);
    const [aaveV3Balance, setAAVEV3Balance] = useState(0);
    const [aaveV3BalanceWei, setAAVEV3BalanceWei] = useState(0);
    const [compBalance, setCompBalance] = useState(0);
    const [compBalanceWei, setCompBalanceWei] = useState(0);
    const [userWallet, setUserWallet] = useState('0x9b4ff9682287ac2207f3981c02922c0a3e1f515d');
    const [hasApprovedForV2, setHasApprovedForV2] = useState(false);
    const [hasApprovedForV3, setHasApprovedForV3] = useState(false);
    const [hasApprovedForCompound, setHasApprovedForCompound] = useState(false);

    const usdtContractAddress = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';
    const usdcContractAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
    const aavev2Contract = '0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf';
    const aavev3Contract = '0x794a61358D6845594F94dc1DB02A252b5b4814aD';
    const compoundContract = '0xF25212E676D1F7F89Cd72fFEe66158f541246445';
    const provider = new ethers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/2wXwqcw_WT-a2gJSH4QM4V6ECw64VU_y");
    const contractUSDT = new ethers.Contract(usdtContractAddress, USDTABI, provider);
    const contractUSDC = new ethers.Contract(usdcContractAddress, USDCABI, provider);
    const contractv2 = new ethers.Contract(aavev2Contract, AAVEV2ABI, provider);
    const contractv3 = new ethers.Contract(aavev3Contract, AAVEV3ABI, provider);
    const contractCompound = new ethers.Contract(compoundContract, COMPABI, provider);

    const refCode = 0;

    const dataApproveV2 = contractUSDT.interface.encodeFunctionData('approve', [aavev2Contract, usdtBalanceWei])
    const dataDepositV2 = contractv2.interface.encodeFunctionData('deposit', [usdtContractAddress, usdtBalanceWei, userWallet, refCode]);
    const dataWithdrawV2 = contractv2.interface.encodeFunctionData('withdraw', [usdtContractAddress, aaveV2BalanceWei, userWallet]);

    const dataApproveV3 = contractUSDT.interface.encodeFunctionData('approve', [aavev3Contract, usdtBalanceWei])
    const dataDepositV3 = contractv3.interface.encodeFunctionData('deposit', [usdtContractAddress, usdtBalanceWei, userWallet, refCode]);
    const dataWithdrawV3 = contractv3.interface.encodeFunctionData('withdraw', [usdtContractAddress, aaveV3BalanceWei, userWallet]);

    //FOR TEST
    const dataApproveComp = contractUSDC.interface.encodeFunctionData('approve', [compoundContract, usdcBalanceWei])
    const dataDepositComp = contractCompound.interface.encodeFunctionData('supply', [usdcContractAddress, usdcBalanceWei]);
    const dataWithdrawComp = contractCompound.interface.encodeFunctionData('withdraw', [usdcContractAddress, compBalanceWei]);


    const aavev2approveTx = {
        to: usdtContractAddress,
        chainId: 137,
        data: dataApproveV2,
        gasLimit: '0x00200B20',
    }

    const aavev2depositTx = {
        to: aavev2Contract,
        chainId: 137,
        data: dataDepositV2,
        gasLimit: '0x00200B20',
    };

    const aavev2withdrawTx = {
        to: aavev2Contract,
        chainId: 137,
        data: dataWithdrawV2,
        gasLimit: '0x00200B20',
    };

    const aavev3approveTx = {
        to: usdtContractAddress,
        chainId: 137,
        data: dataApproveV3,
        gasLimit: '0x00200B20',
    }

    const aavev3depositTx = {
        to: aavev3Contract,
        chainId: 137,
        data: dataDepositV3,
        gasLimit: '0x00200B20',
    };

    const aavev3withdrawTx = {
        to: aavev3Contract,
        chainId: 137,
        data: dataWithdrawV3,
        gasLimit: '0x00200B20',
    };

    const compapproveTx = {
        to: usdcContractAddress,
        chainId: 137,
        data: dataApproveComp,
        gasLimit: '0x00200B20',
    }

    const compdepositTx = {
        to: compoundContract,
        chainId: 137,
        data: dataDepositComp,
        gasLimit: '0x00200B20',
    };

    const compwithdrawTx = {
        to: compoundContract,
        chainId: 137,
        data: dataWithdrawComp,
        gasLimit: '0x00200B20',
    };

    useEffect(() => {
        const checkApprovalStatusForV2 = async () => {
            try {
                const allowancev2 = await contractUSDT.allowance(user.wallet.address, aavev2Contract);
                const allowStringv2 = allowancev2.toString();
                console.log("allow v2", allowStringv2)
                console.log("usdtwei", usdtBalanceWei)
                if (allowStringv2 != 0)
                    setHasApprovedForV2(true);
                else {
                    setHasApprovedForV2(false);
                }
            } catch (e) {
                console.error(e);
            }
        };
        const checkApprovalStatusForV3 = async () => {
            try {
                const allowancev3 = await contractUSDT.allowance(user.wallet.address, aavev3Contract);
                const allowStringv3 = allowancev3.toString();
                console.log("allow v3", allowStringv3)
                if (allowStringv3 != 0)
                    setHasApprovedForV3(true);
                else {
                    setHasApprovedForV3(false);
                }
            } catch (e) {
                console.error(e);
            }
        };
        const checkApprovalStatusForCOMP = async () => {
            try {
                const allowanceComp = await contractUSDC.allowance(user.wallet.address, compoundContract);
                const allowStringComp = allowanceComp.toString();
                console.log("allow comp", allowStringComp)
                if (allowStringComp != 0)
                    setHasApprovedForCompound(true);
                else {
                    setHasApprovedForCompound(false);
                }
            } catch (e) {
                console.error(e);
            }
        };
        if (ready) {
            console.log(user.wallet.address);
            setTimeout(() => {
                fetchUSDTBalance(user.wallet.address);
                fetchAAVEV2Balance(user.wallet.address);
                fetchAAVEV3Balance(user.wallet.address);
                fetchUSDCBalance(user.wallet.address);
                fetchCOMPBalance(user.wallet.address);
                setUserWallet(user.wallet.address);
                checkApprovalStatusForV2();
                checkApprovalStatusForV3();
                checkApprovalStatusForCOMP();
            }, 1500);
        }
    }, []);

    const fetchUSDTBalance = async (walletAddress) => {
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
            setUsdtBalanceWei(balanceString)
        } catch (error) {
            console.error("Error fetching USDT balance:", error);
        }
    };

    const fetchUSDCBalance = async (walletAddress) => {
        try {
            const provider = new ethers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/2wXwqcw_WT-a2gJSH4QM4V6ECw64VU_y");
            const usdcContractAddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
            const usdcABI = USDCABI;
            const usdcContract = new ethers.Contract(usdcContractAddress, usdcABI, provider);
            const balanceWei = await usdcContract.balanceOf(walletAddress);
            const balanceString = balanceWei.toString();
            console.log("COMP", balanceWei)
            const balanceStringEth = parseFloat(balanceString) / 1e6;
            const balanceOK = balanceStringEth.toFixed(2)
            setUsdcBalance(balanceOK);
            setUsdcBalanceWei(balanceString);
        } catch (error) {
            console.error("Error fetching USDT balance:", error);
        }
    };

    const fetchAAVEV2Balance = async (walletAddress) => {
        try {
            const provider = new ethers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/2wXwqcw_WT-a2gJSH4QM4V6ECw64VU_y");
            const usdtAddress = "0x60D55F02A771d515e077c9C2403a1ef324885CeC";
            const usdtContractABI = [
                { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "BalanceTransfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "indexed": true, "internalType": "address", "name": "pool", "type": "address" }, { "indexed": false, "internalType": "address", "name": "treasury", "type": "address" }, { "indexed": false, "internalType": "address", "name": "incentivesController", "type": "address" }, { "indexed": false, "internalType": "uint8", "name": "aTokenDecimals", "type": "uint8" }, { "indexed": false, "internalType": "string", "name": "aTokenName", "type": "string" }, { "indexed": false, "internalType": "string", "name": "aTokenSymbol", "type": "string" }, { "indexed": false, "internalType": "bytes", "name": "params", "type": "bytes" }], "name": "Initialized", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "ATOKEN_REVISION", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "EIP712_REVISION", "outputs": [{ "internalType": "bytes", "name": "", "type": "bytes" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "POOL", "outputs": [{ "internalType": "contract ILendingPool", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "RESERVE_TREASURY_ADDRESS", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "UNDERLYING_ASSET_ADDRESS", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "_nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "address", "name": "receiverOfUnderlying", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getIncentivesController", "outputs": [{ "internalType": "contract IAaveIncentivesController", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "getScaledUserBalanceAndSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "handleRepayment", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPool", "name": "pool", "type": "address" }, { "internalType": "address", "name": "treasury", "type": "address" }, { "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "internalType": "contract IAaveIncentivesController", "name": "incentivesController", "type": "address" }, { "internalType": "uint8", "name": "aTokenDecimals", "type": "uint8" }, { "internalType": "string", "name": "aTokenName", "type": "string" }, { "internalType": "string", "name": "aTokenSymbol", "type": "string" }, { "internalType": "bytes", "name": "params", "type": "bytes" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "mintToTreasury", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "scaledBalanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "scaledTotalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transferOnLiquidation", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferUnderlyingTo", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }
            ];
            const usdtContract = new ethers.Contract(usdtAddress, usdtContractABI, provider);

            const balanceWei = await usdtContract.balanceOf(walletAddress);
            const balanceString = balanceWei.toString();
            const balanceStringEth = parseFloat(balanceString) / 1e6;
            const balanceOK = balanceStringEth.toFixed(2)
            setAAVEV2Balance(balanceOK);
            setAAVEV2BalanceWei(balanceString);
        } catch (error) {
            console.error("Error fetching USDT balance:", error);
        }
    };

    const fetchAAVEV3Balance = async (walletAddress) => {
        try {
            const provider = new ethers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/2wXwqcw_WT-a2gJSH4QM4V6ECw64VU_y");
            const usdtAddress = "0x6ab707Aca953eDAeFBc4fD23bA73294241490620";
            const usdtContractABI = [
                { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "BalanceTransfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "indexed": true, "internalType": "address", "name": "pool", "type": "address" }, { "indexed": false, "internalType": "address", "name": "treasury", "type": "address" }, { "indexed": false, "internalType": "address", "name": "incentivesController", "type": "address" }, { "indexed": false, "internalType": "uint8", "name": "aTokenDecimals", "type": "uint8" }, { "indexed": false, "internalType": "string", "name": "aTokenName", "type": "string" }, { "indexed": false, "internalType": "string", "name": "aTokenSymbol", "type": "string" }, { "indexed": false, "internalType": "bytes", "name": "params", "type": "bytes" }], "name": "Initialized", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "ATOKEN_REVISION", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "EIP712_REVISION", "outputs": [{ "internalType": "bytes", "name": "", "type": "bytes" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "POOL", "outputs": [{ "internalType": "contract ILendingPool", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "RESERVE_TREASURY_ADDRESS", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "UNDERLYING_ASSET_ADDRESS", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "_nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "address", "name": "receiverOfUnderlying", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getIncentivesController", "outputs": [{ "internalType": "contract IAaveIncentivesController", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "getScaledUserBalanceAndSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "handleRepayment", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract ILendingPool", "name": "pool", "type": "address" }, { "internalType": "address", "name": "treasury", "type": "address" }, { "internalType": "address", "name": "underlyingAsset", "type": "address" }, { "internalType": "contract IAaveIncentivesController", "name": "incentivesController", "type": "address" }, { "internalType": "uint8", "name": "aTokenDecimals", "type": "uint8" }, { "internalType": "string", "name": "aTokenName", "type": "string" }, { "internalType": "string", "name": "aTokenSymbol", "type": "string" }, { "internalType": "bytes", "name": "params", "type": "bytes" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "mintToTreasury", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "scaledBalanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "scaledTotalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transferOnLiquidation", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferUnderlyingTo", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }
            ];
            const usdtContract = new ethers.Contract(usdtAddress, usdtContractABI, provider);
            const balanceWei = await usdtContract.balanceOf(walletAddress);
            const balanceString = balanceWei.toString();
            const balanceStringEth = parseFloat(balanceString) / 1e6;
            const balanceOK = balanceStringEth.toFixed(2)
            setAAVEV3Balance(balanceOK);
            setAAVEV3BalanceWei(balanceString);
        } catch (error) {
            console.error("Error fetching USDT balance:", error);
        }
    };

    const fetchCOMPBalance = async (walletAddress) => {
        try {
            const provider = new ethers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/2wXwqcw_WT-a2gJSH4QM4V6ECw64VU_y");
            const compAddress = "0xF25212E676D1F7F89Cd72fFEe66158f541246445";
            const compABI = [
                { "inputs": [{ "components": [{ "internalType": "address", "name": "governor", "type": "address" }, { "internalType": "address", "name": "pauseGuardian", "type": "address" }, { "internalType": "address", "name": "baseToken", "type": "address" }, { "internalType": "address", "name": "baseTokenPriceFeed", "type": "address" }, { "internalType": "address", "name": "extensionDelegate", "type": "address" }, { "internalType": "uint64", "name": "supplyKink", "type": "uint64" }, { "internalType": "uint64", "name": "supplyPerYearInterestRateSlopeLow", "type": "uint64" }, { "internalType": "uint64", "name": "supplyPerYearInterestRateSlopeHigh", "type": "uint64" }, { "internalType": "uint64", "name": "supplyPerYearInterestRateBase", "type": "uint64" }, { "internalType": "uint64", "name": "borrowKink", "type": "uint64" }, { "internalType": "uint64", "name": "borrowPerYearInterestRateSlopeLow", "type": "uint64" }, { "internalType": "uint64", "name": "borrowPerYearInterestRateSlopeHigh", "type": "uint64" }, { "internalType": "uint64", "name": "borrowPerYearInterestRateBase", "type": "uint64" }, { "internalType": "uint64", "name": "storeFrontPriceFactor", "type": "uint64" }, { "internalType": "uint64", "name": "trackingIndexScale", "type": "uint64" }, { "internalType": "uint64", "name": "baseTrackingSupplySpeed", "type": "uint64" }, { "internalType": "uint64", "name": "baseTrackingBorrowSpeed", "type": "uint64" }, { "internalType": "uint104", "name": "baseMinForRewards", "type": "uint104" }, { "internalType": "uint104", "name": "baseBorrowMin", "type": "uint104" }, { "internalType": "uint104", "name": "targetReserves", "type": "uint104" }, { "components": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "address", "name": "priceFeed", "type": "address" }, { "internalType": "uint8", "name": "decimals", "type": "uint8" }, { "internalType": "uint64", "name": "borrowCollateralFactor", "type": "uint64" }, { "internalType": "uint64", "name": "liquidateCollateralFactor", "type": "uint64" }, { "internalType": "uint64", "name": "liquidationFactor", "type": "uint64" }, { "internalType": "uint128", "name": "supplyCap", "type": "uint128" }], "internalType": "struct CometConfiguration.AssetConfig[]", "name": "assetConfigs", "type": "tuple[]" }], "internalType": "struct CometConfiguration.Configuration", "name": "config", "type": "tuple" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "Absurd", "type": "error" }, { "inputs": [], "name": "AlreadyInitialized", "type": "error" }, { "inputs": [], "name": "BadAsset", "type": "error" }, { "inputs": [], "name": "BadDecimals", "type": "error" }, { "inputs": [], "name": "BadDiscount", "type": "error" }, { "inputs": [], "name": "BadMinimum", "type": "error" }, { "inputs": [], "name": "BadPrice", "type": "error" }, { "inputs": [], "name": "BorrowCFTooLarge", "type": "error" }, { "inputs": [], "name": "BorrowTooSmall", "type": "error" }, { "inputs": [], "name": "InsufficientReserves", "type": "error" }, { "inputs": [], "name": "InvalidInt104", "type": "error" }, { "inputs": [], "name": "InvalidInt256", "type": "error" }, { "inputs": [], "name": "InvalidUInt104", "type": "error" }, { "inputs": [], "name": "InvalidUInt128", "type": "error" }, { "inputs": [], "name": "InvalidUInt64", "type": "error" }, { "inputs": [], "name": "LiquidateCFTooLarge", "type": "error" }, { "inputs": [], "name": "NegativeNumber", "type": "error" }, { "inputs": [], "name": "NoSelfTransfer", "type": "error" }, { "inputs": [], "name": "NotCollateralized", "type": "error" }, { "inputs": [], "name": "NotForSale", "type": "error" }, { "inputs": [], "name": "NotLiquidatable", "type": "error" }, { "inputs": [], "name": "Paused", "type": "error" }, { "inputs": [], "name": "SupplyCapExceeded", "type": "error" }, { "inputs": [], "name": "TimestampTooLarge", "type": "error" }, { "inputs": [], "name": "TooManyAssets", "type": "error" }, { "inputs": [], "name": "TooMuchSlippage", "type": "error" }, { "inputs": [], "name": "TransferInFailed", "type": "error" }, { "inputs": [], "name": "TransferOutFailed", "type": "error" }, { "inputs": [], "name": "Unauthorized", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "absorber", "type": "address" }, { "indexed": true, "internalType": "address", "name": "borrower", "type": "address" }, { "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "collateralAbsorbed", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "usdValue", "type": "uint256" }], "name": "AbsorbCollateral", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "absorber", "type": "address" }, { "indexed": true, "internalType": "address", "name": "borrower", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "basePaidOut", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "usdValue", "type": "uint256" }], "name": "AbsorbDebt", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "buyer", "type": "address" }, { "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "baseAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "collateralAmount", "type": "uint256" }], "name": "BuyCollateral", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bool", "name": "supplyPaused", "type": "bool" }, { "indexed": false, "internalType": "bool", "name": "transferPaused", "type": "bool" }, { "indexed": false, "internalType": "bool", "name": "withdrawPaused", "type": "bool" }, { "indexed": false, "internalType": "bool", "name": "absorbPaused", "type": "bool" }, { "indexed": false, "internalType": "bool", "name": "buyPaused", "type": "bool" }], "name": "PauseAction", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "dst", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Supply", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "dst", "type": "address" }, { "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "SupplyCollateral", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "TransferCollateral", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "src", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "src", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "WithdrawCollateral", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "WithdrawReserves", "type": "event" }, { "stateMutability": "payable", "type": "fallback" }, { "inputs": [{ "internalType": "address", "name": "absorber", "type": "address" }, { "internalType": "address[]", "name": "accounts", "type": "address[]" }], "name": "absorb", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "accrueAccount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "manager", "type": "address" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approveThis", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseBorrowMin", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseMinForRewards", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseScale", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseToken", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseTokenPriceFeed", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseTrackingBorrowSpeed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseTrackingSupplySpeed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "borrowBalanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "borrowKink", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "borrowPerSecondInterestRateBase", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "borrowPerSecondInterestRateSlopeHigh", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "borrowPerSecondInterestRateSlopeLow", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "minAmount", "type": "uint256" }, { "internalType": "uint256", "name": "baseAmount", "type": "uint256" }, { "internalType": "address", "name": "recipient", "type": "address" }], "name": "buyCollateral", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "extensionDelegate", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint8", "name": "i", "type": "uint8" }], "name": "getAssetInfo", "outputs": [{ "components": [{ "internalType": "uint8", "name": "offset", "type": "uint8" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "address", "name": "priceFeed", "type": "address" }, { "internalType": "uint64", "name": "scale", "type": "uint64" }, { "internalType": "uint64", "name": "borrowCollateralFactor", "type": "uint64" }, { "internalType": "uint64", "name": "liquidateCollateralFactor", "type": "uint64" }, { "internalType": "uint64", "name": "liquidationFactor", "type": "uint64" }, { "internalType": "uint128", "name": "supplyCap", "type": "uint128" }], "internalType": "struct CometCore.AssetInfo", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "getAssetInfoByAddress", "outputs": [{ "components": [{ "internalType": "uint8", "name": "offset", "type": "uint8" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "address", "name": "priceFeed", "type": "address" }, { "internalType": "uint64", "name": "scale", "type": "uint64" }, { "internalType": "uint64", "name": "borrowCollateralFactor", "type": "uint64" }, { "internalType": "uint64", "name": "liquidateCollateralFactor", "type": "uint64" }, { "internalType": "uint64", "name": "liquidationFactor", "type": "uint64" }, { "internalType": "uint128", "name": "supplyCap", "type": "uint128" }], "internalType": "struct CometCore.AssetInfo", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "utilization", "type": "uint256" }], "name": "getBorrowRate", "outputs": [{ "internalType": "uint64", "name": "", "type": "uint64" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "getCollateralReserves", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "priceFeed", "type": "address" }], "name": "getPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getReserves", "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "utilization", "type": "uint256" }], "name": "getSupplyRate", "outputs": [{ "internalType": "uint64", "name": "", "type": "uint64" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getUtilization", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "governor", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "manager", "type": "address" }], "name": "hasPermission", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "initializeStorage", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "isAbsorbPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "isAllowed", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "isBorrowCollateralized", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isBuyPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "isLiquidatable", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isSupplyPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isTransferPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isWithdrawPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "liquidatorPoints", "outputs": [{ "internalType": "uint32", "name": "numAbsorbs", "type": "uint32" }, { "internalType": "uint64", "name": "numAbsorbed", "type": "uint64" }, { "internalType": "uint128", "name": "approxSpend", "type": "uint128" }, { "internalType": "uint32", "name": "_reserved", "type": "uint32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "numAssets", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "supplyPaused", "type": "bool" }, { "internalType": "bool", "name": "transferPaused", "type": "bool" }, { "internalType": "bool", "name": "withdrawPaused", "type": "bool" }, { "internalType": "bool", "name": "absorbPaused", "type": "bool" }, { "internalType": "bool", "name": "buyPaused", "type": "bool" }], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "pauseGuardian", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "baseAmount", "type": "uint256" }], "name": "quoteCollateral", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "storeFrontPriceFactor", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "supply", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "supplyFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "supplyKink", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "supplyPerSecondInterestRateBase", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "supplyPerSecondInterestRateSlopeHigh", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "supplyPerSecondInterestRateSlopeLow", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "supplyTo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "targetReserves", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalBorrow", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "totalsCollateral", "outputs": [{ "internalType": "uint128", "name": "totalSupplyAsset", "type": "uint128" }, { "internalType": "uint128", "name": "_reserved", "type": "uint128" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "trackingIndexScale", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferAsset", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "src", "type": "address" }, { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferAssetFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "src", "type": "address" }, { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "userBasic", "outputs": [{ "internalType": "int104", "name": "principal", "type": "int104" }, { "internalType": "uint64", "name": "baseTrackingIndex", "type": "uint64" }, { "internalType": "uint64", "name": "baseTrackingAccrued", "type": "uint64" }, { "internalType": "uint16", "name": "assetsIn", "type": "uint16" }, { "internalType": "uint8", "name": "_reserved", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "userCollateral", "outputs": [{ "internalType": "uint128", "name": "balance", "type": "uint128" }, { "internalType": "uint128", "name": "_reserved", "type": "uint128" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "userNonce", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "src", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawReserves", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawTo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
            ];
            const compContract = new ethers.Contract(compAddress, compABI, provider);
            const balanceWei = await compContract.balanceOf(walletAddress);
            const balanceString = balanceWei.toString();
            const balanceStringEth = parseFloat(balanceString) / 1e6;
            const balanceOK = balanceStringEth.toFixed(2)
            setCompBalance(balanceOK);
            setCompBalanceWei(balanceString);
            console.log("cmp bal", compBalance)
        } catch (error) {
            console.error("Error fetching USDT balance:", error);
        }
    };

    return (
        <div>
            <Head>
                <title>Get Yield · GreenYield.xyz</title>
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
                            <h2 className='font-light text-md'>Get Yield </h2>
                            <img src='/yield_black.png' width={20} height={20} className='mr-1 mx-1' />
                        </div>
                        <div className='text-right'>
                            <h2 className='font-light text-md'>Available Balance:<span className='text-lime-400 font-bold px-1'>${usdtBalance}</span></h2>
                        </div>
                    </div>
                    <h3 className='text-lime-400 font-semibold pt-5 text-center text-xl'>USDT</h3>
                    <div className='mx-4 pt-2'>
                        <div className=' border border-black p-4 rounded-lg'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <h2 className='font-light text-sm'>AAVEv2</h2>
                                    <span className='rounded-full border border-black text-slate-600 px-1 py-0.5 mx-2 font-montserrat font-semibold text-[12px]'>1.33% APY</span>
                                </div>
                                <div className='flex items-center'>
                                    <span className='mx-1 font-light text-sm'>In Yield:</span>
                                    <span className='text-lime-400 font-bold px-1'>${aaveV2Balance}</span>
                                </div>
                            </div>
                            <div className='flex items-center justify-center pt-4'>
                                <div className='flex items-center'>
                                    {hasApprovedForV2 ? (
                                        <button className='rounded-full text-[15px] bg-lime-400 text-black px-7 py-0.5 mx-4 font-montserrat font-light mb-0.5' onClick={async () => { const txReceipt = await sendTransaction(aavev2depositTx); }}>
                                            DEPOSIT
                                        </button>
                                    ) : (
                                        <button className='rounded-full text-[15px] bg-lime-400 text-black px-7 py-0.5 mx-4 font-montserrat font-light mb-0.5' onClick={async () => { const txReceipt = await sendTransaction(aavev2approveTx); }}>
                                            APPROVE
                                        </button>
                                    )}
                                </div>
                                <div className='flex items-center'>
                                    <button className='rounded-full text-[15px] bg-lime-400 text-black px-7 py-0.5 mx-4 font-montserrat font-light mb-0.5' onClick={async () => { const txReceipt = await sendTransaction(aavev2withdrawTx); }}>
                                        WITHDRAW
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mx-4 pt-4'>
                        <div className=' border border-black p-4 rounded-lg'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <h2 className='font-light text-sm'>AAVEv3</h2>
                                    <span className='rounded-full border border-black text-slate-600 px-1 py-0.5 mx-2 font-montserrat font-semibold text-[12px]'>2.78% APY</span>
                                </div>
                                <div className='flex items-center'>
                                    <span className='mx-1 font-light text-sm'>In Yield:</span>
                                    <span className='text-lime-400 font-bold px-1'>${aaveV3Balance}</span>
                                </div>
                            </div>
                            <div className='flex items-center justify-center pt-4'>
                                <div className='flex items-center'>
                                    {hasApprovedForV3 ? (
                                        <button className='rounded-full text-[15px] bg-lime-400 text-black px-7 py-0.5 mx-4 font-montserrat font-light mb-0.5' onClick={async () => { const txReceipt = await sendTransaction(aavev3depositTx); }}>
                                            DEPOSIT
                                        </button>
                                    ) : (
                                        <button className='rounded-full text-[15px] bg-lime-400 text-black px-7 py-0.5 mx-4 font-montserrat font-light mb-0.5' onClick={async () => { const txReceipt = await sendTransaction(aavev3approveTx); }}>
                                            APPROVE
                                        </button>
                                    )}
                                </div>
                                <div className='flex items-center'>
                                    <button className='rounded-full text-[15px] bg-lime-400 text-black px-7 py-0.5 mx-4 font-montserrat font-light mb-0.5' onClick={async () => { const txReceipt = await sendTransaction(aavev3withdrawTx); }}>
                                        WITHDRAW
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 className='text-lime-400 font-semibold pt-5 text-center text-xl'>USDC</h3>
                    <div className='mx-4 pt-2'>
                        <div className=' border border-black p-4 rounded-lg'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <h2 className='font-light text-sm'>Compound</h2>
                                    <span className='rounded-full border border-black text-slate-600 px-1 py-0.5 mx-2 font-montserrat font-semibold text-[12px]'>4.64% APY</span>
                                </div>
                                <div className='flex items-center'>
                                    <span className='mx-1 font-light text-sm'>In Yield:</span>
                                    <span className='text-lime-400 font-bold px-1'>${compBalance}</span>
                                </div>
                            </div>
                            <div className='flex items-center justify-center pt-4'>
                                <div className='flex items-center'>
                                    {hasApprovedForCompound ? (
                                        <button className='rounded-full text-[15px] bg-lime-400 text-black px-7 py-0.5 mx-4 font-montserrat font-light mb-0.5' onClick={async () => { const txReceipt = await sendTransaction(compdepositTx); }}>
                                            DEPOSIT
                                        </button>
                                    ) : (
                                        <button className='rounded-full text-[15px] bg-lime-400 text-black px-7 py-0.5 mx-4 font-montserrat font-light mb-0.5' onClick={async () => { const txReceipt = await sendTransaction(compapproveTx); }}>
                                            APPROVE
                                        </button>
                                    )}
                                </div>
                                <div className='flex items-center'>
                                    <button className='rounded-full text-[15px] bg-lime-400 text-black px-7 py-0.5 mx-4 font-montserrat font-light mb-0.5' onClick={async () => { const txReceipt = await sendTransaction(compwithdrawTx); }}>
                                        WITHDRAW
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomBar />
        </div >
    );
};

export default Yield;

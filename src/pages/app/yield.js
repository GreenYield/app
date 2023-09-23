import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/NavbarApp';
import BottomBar from '@/components/BottomBar';
import { usePrivy } from '@privy-io/react-auth';
import { ethers } from 'ethers';
import AAVEV2ABI from '../utils/AAVEV2ABI.json'
import AAVEV3ABI from '../utils/AAVEV3ABI.json'
import USDTABI from '../utils/usdtABI.json'


const Yield = () => {
    const { user, sendTransaction, ready } = usePrivy();
    const [usdtBalance, setUsdtBalance] = useState(0);
    const [aaveV2Balance, setAAVEV2Balance] = useState(0);
    const [aaveV3Balance, setAAVEV3Balance] = useState(0);
    const [userWallet, setUserWallet] = useState('0x9b4FF9682287Ac2207f3981c02922C0a3E1F515D');

    const usdtContractAddress = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';
    const aavev2Contract = '0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf';
    const aavev3Contract = '0x794a61358D6845594F94dc1DB02A252b5b4814aD';
    const provider = new ethers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/2wXwqcw_WT-a2gJSH4QM4V6ECw64VU_y");
    const contractUSDT = new ethers.Contract(usdtContractAddress, USDTABI, provider);
    const contractv2 = new ethers.Contract(aavev2Contract, AAVEV2ABI, provider);
    const contractv3 = new ethers.Contract(aavev3Contract, AAVEV3ABI, provider);



    const amount = 1;
    const refCode = 0;

    const dataApproveV2 = contractUSDT.interface.encodeFunctionData('approve', [aavev2Contract, amount])
    const dataDepositV2 = contractv2.interface.encodeFunctionData('deposit', [usdtContractAddress, amount, userWallet, refCode]);
    const dataWithdrawV2 = contractv2.interface.encodeFunctionData('withdraw', [usdtContractAddress, amount, userWallet]);

    const dataApproveV3 = contractUSDT.interface.encodeFunctionData('approve', [aavev3Contract, amount])
    const dataDepositV3 = contractv3.interface.encodeFunctionData('deposit', [usdtContractAddress, amount, userWallet, refCode]);
    const dataWithdrawV3 = contractv3.interface.encodeFunctionData('withdraw', [usdtContractAddress, amount, userWallet]);


    const aavev2approveTx = {
        to: usdtContractAddress,
        chainId: 137,
        data: dataApproveV2,
        // value: '0x3B9ACA00',
        gasLimit: '0x00200B20',
    }

    const aavev2depositTx = {
        to: aavev2Contract,
        chainId: 137,
        data: dataDepositV2,
        // value: '0x3B9ACA00',
        gasLimit: '0x00200B20',
    };

    const aavev2withdrawTx = {
        to: aavev2Contract,
        chainId: 137,
        data: dataWithdrawV2,
        // value: '0x3B9ACA00',
        gasLimit: '0x00200B20',
    };

    const aavev3approveTx = {
        to: usdtContractAddress,
        chainId: 137,
        data: dataApproveV3,
        // value: '0x3B9ACA00',
        gasLimit: '0x00200B20',
    }

    const aavev3depositTx = {
        to: aavev3Contract,
        chainId: 137,
        data: dataDepositV3,
        // value: '0x3B9ACA00',
        gasLimit: '0x00200B20',
    };

    const aavev3withdrawTx = {
        to: aavev3Contract,
        chainId: 137,
        data: dataWithdrawV3,
        // value: '0x3B9ACA00',
        gasLimit: '0x00200B20',
    };

    useEffect(() => {
        console.log(user.wallet.address);
        fetchUSDTBalance(user.wallet.address);
        fetchAAVEV2Balance(user.wallet.address);
        fetchAAVEV3Balance(user.wallet.address);
        if (ready) {
            setUserWallet(user.wallet.address);
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

                    <div id='#aave'>
                        <div className=' mx-4 pt-4'>
                            <div className=' border border-black p-4 rounded-lg'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <h2 className='font-light text-md'>AAVEv2</h2>
                                        <span className='rounded-full bg-lime-400 text-slate-600 px-2 py-0.5 mx-2 font-montserrat font-semibold text-[12px]'>1.33% APY</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <span className='mx-1 font-light'>In Yield:</span>
                                        <span className='text-lime-400 font-bold px-1'>${aaveV2Balance}</span>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between pt-4'>
                                    <div className='flex items-center'>
                                        <button disabled={!user.wallet} className='rounded-full text-[15px] bg-lime-400 text-black px-7 py-0.5 mx-4 font-montserrat font-light mb-0.5' onClick={async () => { const txReceipt = await sendTransaction(aavev2approveTx); }}>
                                            APPROVE
                                        </button>
                                    </div>
                                    <div className='flex items-center'>
                                        <button disabled={!user.wallet} className='rounded-full text-[15px] bg-lime-400 text-black px-7 py-0.5 mx-4 font-montserrat font-light mb-0.5' onClick={async () => { const txReceipt = await sendTransaction(aavev2depositTx); }}>
                                            DEPOSIT
                                        </button>
                                    </div>
                                    <div className='flex items-center'>
                                        <button disabled={!user.wallet} className='rounded-full text-[15px] bg-lime-400 text-black px-7 py-0.5 mx-4 font-montserrat font-light mb-0.5' onClick={async () => { const txReceipt = await sendTransaction(aavev2withdrawTx); }}>
                                            WITHDRAW
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=' mx-4 pt-4'>
                            <div className=' border border-black p-4 rounded-lg'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <h2 className='font-light text-md'>AAVEv3</h2>
                                        <span className='rounded-full bg-lime-400 text-slate-600 px-2 py-0.5 mx-2 font-montserrat font-semibold text-[12px]'>2.78% APY</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <span className='mx-1 font-light'>In Yield:</span>
                                        <span className='text-lime-400 font-bold px-1'>${aaveV3Balance}</span>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between pt-4'>
                                    <div className='flex items-center'>
                                        <button disabled={!user.wallet} className='rounded-full text-[15px] bg-lime-400 text-black px-7 py-0.5 mx-4 font-montserrat font-light mb-0.5' onClick={async () => { const txReceipt = await sendTransaction(aavev3approveTx); }}>
                                            APPROVE
                                        </button>
                                    </div>
                                    <div className='flex items-center'>
                                        <button disabled={!user.wallet} className='rounded-full text-[15px] bg-lime-400 text-black px-7 py-0.5 mx-4 font-montserrat font-light mb-0.5' onClick={async () => { const txReceipt = await sendTransaction(aavev3depositTx); }}>
                                            DEPOSIT
                                        </button>
                                    </div>
                                    <div className='flex items-center'>
                                        <button disabled={!user.wallet} className='rounded-full text-[15px] bg-lime-400 text-black px-7 py-0.5 mx-4 font-montserrat font-light mb-0.5' onClick={async () => { const txReceipt = await sendTransaction(aavev3withdrawTx); }}>
                                            WITHDRAW
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div id='#compound'>
                        <h2 className='font-light text-md justify-start mx-4 pt-4'>Compound<button className='rounded-full bg-lime-400 text-black px-3 py-0.5 mx-4 font-montserrat font-light mb-0.5'>4.24%</button></h2>
                    </div> */}
                </div>
            </div>
            <BottomBar />
        </div >
    );
};

export default Yield;

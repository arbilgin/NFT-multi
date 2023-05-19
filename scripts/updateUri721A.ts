import { ethers } from 'hardhat';

import contract from '../artifacts/contracts/721A.sol/MentholNFT.json';

import { nftData } from './nftData';

require('dotenv').config();

// Get Alchemy API Key
const API_KEY = process.env.API_KEY as string;

// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('matic', API_KEY);

// Create a signer
const privateKey = process.env.PRIVATE_KEY as string;
const signer = new ethers.Wallet(privateKey, provider);

// Get contract ABI and address
const abi = contract.abi;
const contractAddress = '0x124A36bC917B9951798F94885B406017C61fbbc3';

// Create a contract instance
const myNftAirdrop = new ethers.Contract(contractAddress, abi, signer);

// Call updateAllTokenURI function
const updateUri = async () => {
    const accounts = await ethers.getSigners();
    const contractOwner = accounts[0];
    for (const data of nftData) {
        let feeData = await ethers.provider.getFeeData();
        let nonce = await ethers.provider.getTransactionCount(contractOwner.address);
        const newUri = data.uri2;
        let txn;
        txn = await myNftAirdrop.setURI(newUri, {
            gasPrice: feeData.gasPrice,
            nonce,
        });
        await txn.wait();
        console.log("NFTs updated successfully! Check it out at: https://mumbai.polygonscan.com/tx/${txn.hash}");
    }
};

updateUri()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

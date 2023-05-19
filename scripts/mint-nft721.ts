import { ethers } from 'hardhat';
import dotenv from 'dotenv';

dotenv.config();

// Get Alchemy API Key
const API_KEY = process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('matic', API_KEY);

import contract from "../artifacts/contracts/optimizedNFT.sol/NftAirdrop2.json";

import { nftData } from './nftData';

// Create a signer
const privateKey = process.env.PRIVATE_KEY!;
const signer = new ethers.Wallet(privateKey, provider);

// Get contract ABI and address
const abi = contract.abi;
const contractAddress = '???????????';

// Create a contract instance
const myNftAirdrop = new ethers.Contract(contractAddress, abi, signer);

// Get the NFT Metadata IPFS URL
// const tokenUri = "https://gateway.pinata.cloud/ipfs/QmZGpfCfdrKiX9wDa1YecxdrMSj32xYEtxJr32aT6x7Rzd/NotRevealed-KlimaDAO";

// Define a list of wallets to airdrop NFTs
// const airdropAddresses = [
//     '0x808b891a69f2cF52f84228DA61f2F4F5b08297DE',
// ];

// Call airdrop function
// const airdrop = async (addresses: string[], uri: string) => {
//     let txn;
//     txn = await myNftAirdrop.airdropNfts(airdropAddresses, tokenUri);
//     await txn.wait();
//     console.log("NFTs airdropped successfully! Check it out at: https://mumbai.polygonscan.com/tx/${txn.hash}");

//     // console.log("\nCurrent NFT balances:")
//     // for (let i = 0; i < airdropAddresses.length; i++) {
//     //     let bal = await myNftAirdrop.balanceOf(airdropAddresses[i]);
//     //     console.log(`${i + 1}. ${airdropAddresses[i]}: ${bal}`);
//     // }
// };
const airdrop = async () => {
    const accounts = await ethers.getSigners();
    const contractOwner = accounts[0];
    for (const partner of nftData) {
        let feeData = await ethers.provider.getFeeData();
        let nonce = await ethers.provider.getTransactionCount(contractOwner.address);
        const addresses = partner.addresses;
        const tokenUri = partner.uri;
        let txn;
        txn = await myNftAirdrop.airdropNfts(addresses, tokenUri, {
            gasPrice: feeData.gasPrice,
            nonce,
        });
        await txn.wait();
        console.log("NFTs airdropped successfully! Check it out at: https://mumbai.polygonscan.com/tx/${txn.hash}");
    }
};

airdrop()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

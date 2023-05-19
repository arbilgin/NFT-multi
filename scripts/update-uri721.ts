import { ethers } from 'ethers';

import contract from '../artifacts/contracts/NftAirdrop.sol/NftAirdrop.json';

import { nftData } from './nftData';

require('dotenv').config();

// Get Alchemy API Key
const API_KEY = process.env.API_KEY as string;

// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('maticmum', API_KEY);

// Create a signer
const privateKey = process.env.PRIVATE_KEY as string;
const signer = new ethers.Wallet(privateKey, provider);

// Get contract ABI and address
const abi = contract.abi;
const contractAddress = '????????????????????????';

// Create a contract instance
const myNftAirdrop = new ethers.Contract(contractAddress, abi, signer);

// Get the NFT Metadata IPFS URL
// const newUri = 'https://gateway.pinata.cloud/ipfs/QmXr7SGdPpXAxj3pcY7y3nCFpNFzWhKbGfEzuqAsBYctCR/Revealed-KlimaDAO';

// Define a list of NFT IDs to update
// const NftIds = [
//   '1',
//   '2',
//   '3',
//   '4',
//   '5',
//   '6',
// ];

// Call updateAllTokenURI function
const updateAllUri = async () => {
  for (const partner of nftData) {
    const NftIds = partner.tokenIds;
    const newUri = partner.uri2;
    const range = (start: number, end: number) => Array.from({length: end - start + 1}, (_, i) => start + i);
    const result = range(NftIds[3], NftIds[5]); // returns array of numbers from first to the last token id
    let txn;
    txn = await myNftAirdrop.updateAllTokenURI(result, newUri);
    await txn.wait();
    console.log("NFTs updated successfully! Check it out at: https://mumbai.polygonscan.com/tx/${txn.hash}");
  }
};

updateAllUri()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

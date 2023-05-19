import { ethers } from "hardhat";

import { nftData } from "./nftData";

async function main(): Promise<void> {
  const accounts = await ethers.getSigners();
  const contractOwner = accounts[0];

  const MyNFT = await ethers.getContractFactory("NftAirdrop");

  for (let data of nftData) {
    let feeData = await ethers.provider.getFeeData();
    let nonce = await ethers.provider.getTransactionCount(
      contractOwner.address
    );

    const myNFT = await MyNFT.deploy({
      gasPrice: feeData.gasPrice!,
      nonce: nonce,
    });
    await myNFT.deployed();
    console.log("Contract deployed to address:", myNFT.address);

    for (let address of data.addresses) {
      feeData = await ethers.provider.getFeeData();
      nonce = await ethers.provider.getTransactionCount(contractOwner.address);
      const tx = await myNFT.safeMint(address, data.uri, {
        gasPrice: feeData.gasPrice!,
        nonce: nonce,
      });

      console.log(tx.hash);

      await tx.wait();
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

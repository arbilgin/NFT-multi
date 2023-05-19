import { ethers } from "hardhat";
import { nftData } from "./nftData";

async function main(): Promise<void> {
  const [owner, ...accounts] = await ethers.getSigners();

  const MyNFT = await ethers.getContractFactory("MentholNFT");

  for (let data of nftData) {
    let feeData = await ethers.provider.getFeeData();
    let nonce = await ethers.provider.getTransactionCount(owner.address);

    const myNFT = await MyNFT.deploy(data.uri, {
      gasPrice: feeData.gasPrice,
      nonce,
    });
    await myNFT.deployed();
    console.log("Contract deployed to address:", myNFT.address);

    for (let address of data.addresses) {
      feeData = await ethers.provider.getFeeData();
      nonce = await ethers.provider.getTransactionCount(owner.address);
      const tx = await myNFT.mint(address, 1, {
        gasPrice: feeData.gasPrice,
        nonce,
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

async function main() {
    // Grab the contract factory 
    const NftAirdrop = await ethers.getContractFactory("NftAirdrop");
  
    // Start deployment, returning a promise that resolves to a contract object
    const nftAirdrop = await NftAirdrop.deploy(); // Instance of the contract 
    console.log("Contract deployed to address:", nftAirdrop.address);
  }
  
  main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });
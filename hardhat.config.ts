import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-ethers";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const { API_URL, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  // defaultNetwork: "matic",
  networks: {
    hardhat: {},
    matic: {
      url: API_URL!,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};

export default config;

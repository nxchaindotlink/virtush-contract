import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    amoy: {
       url: `${process.env.URL}`,
       chainId: parseInt(`${process.env.CHAIN_ID}`),
       accounts : {
        mnemonic: `${process.env.MNEMONIC}`,

       }
    }
  },
  etherscan: {
    apiKey: `${process.env.API_KEY}`
  }
};

export default config;

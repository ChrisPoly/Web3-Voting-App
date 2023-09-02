/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY

const SOLC_SETTINGS = {
   optimizer: {
     enabled: true,
     runs: 1_000,
   },
 }

module.exports = {
   solidity: {
     compilers: [
       {
         version: "0.8.11",
         settings: SOLC_SETTINGS
       }
     ],
   },
 
   defaultNetwork: "hardhat",
   networks: {
     hardhat: {},
 
     sepolia: {
       chainId: 11155111,
       url: SEPOLIA_RPC_URL,
       accounts: [PRIVATE_KEY],
       blockConfirmations: 3
     },
   },
 
   namedAccounts: {
     deployer: {
       default: 0,
     },
   },
 
   mocha: {
     timeout: 300000,
   },
 }
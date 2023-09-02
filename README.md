# Decentralized Voting Application

This is a demo of a voting application using solidity smart contract and ReactJS. 

## Installation

After you cloned the repository, you want to install the packages using

```shell
npm install
```

You first need to compile the contract and upload it to the blockchain network. Run the following commands to compile and upload the contract.

```shell
npx hardhat compile
npx hardhat run --network sepolia scripts/deploy.js
```

Create an .env file with the following variables.

```shell
PRIVATE_KEY = "fill-in-with-yours"
SEPOLIA_RPC_URL = "https://eth-sepolia.g.alchemy.com/v2/ThtkUTHJBWv_rECITx4_VYt1PrDM4K0h"
CONTRACT_ADDRESS = "fill-in-with-yours"
```

Once the contract is uploaded to the blockchain, copy the contract address and paste it in the .env and constant files.

Next paste your private key in the .env file and then run the following command

```shell
npm start
```

const { ethers } = require("hardhat")

async function main() {
  const Voting = await ethers.getContractFactory("Voting");
  const Countries = ["Sweden", "Finland", "Israel", "Norway", "Germany", "Spain", "Armenia", "France", "Portugal", "Austria", "Croatia", "Albania", "Ukraine", "United Kingdom", "Serbia", "Czechia", "Italy", "Slovenia", "Poland", "Belgium", "Netherlands", "Australia", "Greece", "Cyprus", "Estonia", "Georgia", "Lithuania", "Switzerland", "Moldova", "Iceland", "Ireland", "Latvia", "Denmark", "Azerbaijan", "Romania", "San Marino", "Malta"];

  // Start deployment, returning a promise that resolves to a contract object
  const Voting_ = await Voting.deploy(Countries);
  console.log("Contract address:", Voting_.address);


}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });
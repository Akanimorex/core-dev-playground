// const { ethers } = require("hardhat");

// async function main() {
//   const [deployer] = await ethers.getSigners();

//   console.log("Deploying contract with the account:", deployer.address);

//   const HelloWorld = await ethers.getContractFactory("HelloWorld");
//   const helloWorld = await HelloWorld.deploy("Hello, World");

//   console.log("HelloWorld Contract Address:", await helloWorld.getAddress());
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });


const { ethers } = require("hardhat");

async function main() {
  // Get the account that will deploy the contract
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);

  // Get the contract factory for HelloWorld
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  
  // Deploy the contract
  const helloWorld = await HelloWorld.deploy();
  
  // Wait for the deployment transaction to be mined
  await helloWorld.waitForDeployment();

  console.log("HelloWorld Contract Address:", await helloWorld.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

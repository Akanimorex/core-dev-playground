const { expect } = require("chai");

describe("HelloWorld contract", function () {
  let HelloWorld;
  let helloWorld;
  let owner;

  beforeEach(async function () {
    HelloWorld = await ethers.getContractFactory("HelloWorld");
    [owner] = await ethers.getSigners();
    helloWorld = await HelloWorld.deploy();
    await helloWorld.waitForDeployment(); // Correct way to ensure contract is deployed
  });

  it("Should return the initial greeting message", async function () {
    expect(await helloWorld.getGreeting()).to.equal("Hello, World");
  });

  it("Should update the greeting message", async function () {
    const tx = await helloWorld.setGreeting("Hardhat");
    await tx.wait(); // Wait for the transaction to be mined
    expect(await helloWorld.getGreeting()).to.equal("Hello, Hardhat");
  });

  it("Should reject empty greetings", async function () {
    await expect(helloWorld.setGreeting(""))
      .to.be.revertedWith("Greeting cannot be empty");
  });
});

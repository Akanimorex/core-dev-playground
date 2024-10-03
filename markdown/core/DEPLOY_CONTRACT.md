Solidity is a high level language. It is partly designed after ECMAScript and therefore it is said to be **similar to JavaScript**. The similarity ends there because it gets compiled (not interpreted) and usually deployed on blockchains that understand the Ethereum Virtual Machine (EVM), like Core! When a smart contract is deployed, it becomes immutable. This has both benefits and drawbacks, which we will discuss below.

We can use [HardHat](https://hardhat.org) to ease development and deployment of our Solidity code. For detailed tutorials on using other IDEs for deploying smart contracts on Core, refer to the [official tutorials](https://docs.coredao.org/docs/category/dev-guides).

# Pre-requisite

* IDE of your choice (like VS Code).
* [Git](https://git-scm.com/) v2.44.0
* [Node.js](https://nodejs.org/en) v20.11.1
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) v10.2.4
* [Hardhat](https://hardhat.org/hardhat-runner/docs/getting-started#installation) v2.22.7
* [MetaMask Web Wallet Extension](https://metamask.io/download/)
* A Metamask account with test CORE Tokens, details [here](https://docs.coredao.org/docs/Dev-Guide/core-testnet-wallet-config).

# Setup Project 

1. Create a new directory for the project and navigate into it

```bash
mkdir hello-world-dapp
cd hello-world-dapp
```
2. Install Hardhat

```bash
npm init --yes
npm install --save-dev hardhat
```
3. Initialize Hardhat project by running the following command

```bash
npx hardhat init
```

4. Install and configure MetaMask Chrome Extension to use with Core Testnet. Refer [here](https://docs.coredao.org/docs/Dev-Guide/core-testnet-wallet-config) for a detailed guide.

5. rename the file **`contracts/core/HelloWorld/secret.json.example`** to **`secret.json`** and store the private key of your MetaMask wallet in it. Refer [here](https://support.metamask.io/managing-my-wallet/secret-recovery-phrase-and-private-keys/how-to-export-an-accounts-private-key/) for details on how to get MetaMask account's private key.

```json
{"PrivateKey":"you private key, do not leak this file, do keep it absolutely safe"}
```

{% hint style="warning" %}
Do not forget to add this file to the `.gitignore` file in the root folder of your project so that you don't accidentally check your private keys/secret phrases into a public repository. Make sure you keep this file in an absolutely safe place!
{% endhint %}

# Configure hardhat.config.js for Core Testnet

- Copy the following into your `hardhat.config.js` file

```js
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const { PrivateKey } = require('./secret.json');
module.exports = {
  defaultNetwork: 'core_testnet',

  networks: {
     hardhat: {
     },
     core_testnet: {
        url: 'https://rpc.test.btcs.network',
        accounts: [PrivateKey],
        chainId: 1115,
     }
  },
  solidity: {
     compilers: [
       {
          version: '0.8.26',
          settings: {
             evmVersion: 'paris',
             optimizer: {
                enabled: true,
                runs: 200,
             },
          },
       },
     ],
  },
  paths: {
     sources: './contracts',
     cache: './cache',
     artifacts: './artifacts',
  },
  mocha: {
     timeout: 60000,
  },
};
```

# 🌐 The HelloWorld Solidity contract

- One of the most basic, non-trivial, types of smart contract is a **Hello World contract**.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract HelloWorld {
    string public greet = "World";  //variable for storing name

    constructor(){
        greet = "World";
    }

    /** @dev Retrieve Message to Print
      * @return The Message to Print, Hello, Concatenated with the User Name
      */
    function getGreeting() public view returns(string memory){
        return concat("Hello, " , greet);
    }

        /** @dev Set the Name to Greet
        * @param  _name  user name
        * @return success Returns bool value (True or False) to indicate if save was successful or not
        */
    function setGreeting(string memory _name) public returns(bool success){
        require(bytes(_name).length > 0);
        greet= _name;
        return true;
    }

    /** @dev Set the Name to Greet
        * @param  _base  contains the base value " Hello, "
        * @param  _value contains the name to append to message to display
        * @return the concatenated string of _base+_value i.e. Hello, Name
        */
    function concat(string memory _base, string memory _value) internal pure returns (string memory) {
            bytes memory _baseBytes = bytes(_base);
            bytes memory _valueBytes = bytes(_value);

            string memory _tmpValue = new string(_baseBytes.length + _valueBytes.length);
            bytes memory _newValue = bytes(_tmpValue);

            uint i;
            uint j;

            for(i=0; i<_baseBytes.length; i++) {
                _newValue[j++] = _baseBytes[i];
            }

            for(i=0; i<_valueBytes.length; i++) {
                _newValue[j++] = _valueBytes[i];
            }

            return string(_newValue);
        }

}
```

The first line of a Solidity file should contain a comment which describes the type of license governing the source code. The `SPDX-License-Identifier` will most commonly be the MIT licence, although a comprehensive list can be found at [https://spdx.org/licenses/](https://spdx.org/licenses/). The Solidity compiler will issue a [warning](https://docs.soliditylang.org/en/v0.8.26/security-considerations.html#take-warnings-seriously) if this line is not present at compilation time.

The next line specifies the version of the Solidity compiler to be used when compiling this contract. Using [semantic versioning](https://semver.org/), it is possible to prevent a Solidity file from being compiled by incompatible versions - most often in the case of breaking changes between major versions. The most recent version of Solidity compiler is \([`0.8.26`](https://docs.soliditylang.org/en/v0.8.26/) at the time of this writing\).

Next we define our contract name, `HelloWorld` - The contract name can be anything, but should be descriptive of the functionality. The naming convention for Solidity is that the filename should match the UpperCamelCase contract name, hence `HelloWorld.sol`.

The `constructor()` is called only once, when the contract is deployed. The constructor is the place to assign default values to any variables, and performs an initial configuration of the app state. We will set the initial value of the `greet` variable to `World`.

Next we declare a function signature for the `setGreeting()` function, which has a [visibility](https://docs.soliditylang.org/en/v0.8.26/contracts.html#visibility-and-getters) of public. `setGreeting` takes a single argument `_name`, an string memory \([string](https://docs.soliditylang.org/en/v0.8.26/types.html#string-literals-and-types)\). The function body consists of 3 lines. The first is a require statement, which means the value of the `_name` variable should not be undefined or null. In the second line, the value passed via `_name_` is assigned to the `greet` state variable. The third line, simply returns `true` if the body is executed successfully.

The `getGreeting()` function signature is slightly different, in that there is no argument being passed. It also has a visibility of public, is a [view](https://docs.soliditylang.org/en/v0.8.26/types.html?highlight=view#function-types) type of function, and specifies a return type of `string`. Its function body will simply return the string "Hello" concatenated with the current value of `greet`. Here, `concat` is a user defined function.

# 🔧 Test the smart contract

Because deployed bytecode is immutable, it is best to work with security and best practices in mind. Prevent accidentally deploying code with errors by always _testing prior to deployment_. In our tests we're going to use ethers.js to interact with the smart contract we built in the previous section, and use Mocha as the test runner.

In the `test` folder, `HelloWorld.js` is the test script to test the `HelloWorld` smart contract before deploying it.

```javascript
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

```

Run the command `npx hardhat test` to run the test script. This will compile the contract before deploying it to the local Harhat and performing the tests. You should see similar output in your terminal:

```text

  HelloWorld contract
    √ Should return the initial greeting message (377ms)
    √ Should update the greeting message (6355ms)
    √ Should reject empty greetings (759ms)


  3 passing (25s)
```

{% hint style="warning" %}
If there is an error : `Error: Cannot find module`. You need to install the dependencies in this sub-module as mentioned at the beginning of the tutorial.
{% endhint %}

# ⛓ Deploy the smart contract

{% hint style="tip" %}
For this learnign pathway, we have included as sample `secret.example.json` file for reference. Rename this file to `secret.json`and paste your Metamask account's private key into this file, as explained earlier.
{% endhint %}

Compiling Solidity with Hardhat is a straightforward process, just make sure that your preferred configuration is set in `hardhat.config.js` \(paths, compilers, networks, etc.\) and then run the following command:

```text
npx hardhat compile
```

To deploy the HelloWorld contract to Core blockchain, run this command :

```text
npx hardhat run scripts/deploy.js --network core_testnet
```

The flag `--network core_testnet` lets Hardhat know which network we want to deploy our smart contract to. The configuration for each network is set inside of `hardhat.config.js`.

For the deployment to work, make sure there is a valid private key inside of the `secret.json` file, and that the account has some tCORE tokens. If you have followed the tutorial steps so far, these conditions should be satisfied.

---

# 🧩 Using the Application Binary Interface (ABI):

[The Solidity Contract ABI Specification](https://docs.soliditylang.org/en/v0.8.17/abi-spec.html) explains that an ABI is a standard way to interact with contracts in the Ethereum ecosystem, both from outside the blockchain and for contract-to-contract interaction. Data is encoded according to its type, as described in the specification. The encoding is not self describing and thus requires a schema in order to decode.

The ABI is considered an "[artifact](https://trufflesuite.github.io/artifact-updates/background.html#what-are-artifacts)" in relation to a compiled Solidity contract. Most commonly, developers will interact with an ABI in JSON format. Read more about [what this means](https://docs.soliditylang.org/en/v0.8.17/abi-spec.html#json).

---

# ✅ Make sure it works

Once the contract is compiled and deployed, paste the contract address into the textinput on the right side of this page and click to **Check deployment**. This will execute the `getCode` method available to the provider to ensure that there is a deployed contract at the specified address.

---

# 🏁 Conclusion

Truffle is only one of several different ways to deploy smart contracts on Core blockchain. It is also rssible to use the Ethereum [Remix IDE](https://remix.ethereum.org), or another smart contract development tool called [HardHat](https://hardhat.org). Now that we have a deployed and functioning smart contract on Core blockchain, let's interact with it!

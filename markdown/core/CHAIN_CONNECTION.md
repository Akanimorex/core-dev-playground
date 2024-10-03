# 🤔 Ethers.js

To manage our connection with the Core blockchain and interact with smart contracts, we can use a popular and [well-tested](https://docs.ethers.io/v5/testing/) JavaScript library called [**ethers.js**](https://docs.ethers.io/v5/api/). We can connect to and perform operations with Core blockchain using ethers' API with only a few lines of code.

In ethers, a **provider** is a read-only abstraction to access the blockchain data. A **signer** is an abstraction of an Ethereum Account, which can be used to sign messages and transactions, and send signed transactions to the network.

The ethers library has some helpful functions that will make this a snap! Read the ethers.js[ API documentation](https://docs.ethers.io/v5/api/) to learn more about its various functions.

{% hint style="info" %}
_It is important to note that throughout the Pathway, we will refer to the_ ethers.js _library only as "_ethers_".
{% endhint %}

---

# 🏋️ Challenge

{% hint style="tip" %}
**Imagine this scenario:** You're a fresh Web3 developer who just landed a sweet role at a promising new startup, eager to show off your skills. You've been asked to show users of our dApp which network they are connected to (to avoid any confusion) and store the address of the account currently selected in Metamask (so that we can reference it later). In **`components/core/challenges/connect.ts`**, implement the`connect` function.
{% endhint %}

**Take a few minutes to figure this out.**

```typescript
const connect = async () => {
  try {
    const provider = undefined;

    if (provider) {
      // Request the currently selected accounts in MetaMask
      const accounts = undefined;

      // Make sure you have accounts and get the first one (currently selected)
      if (accounts.length > 0) {
        const address = undefined;
        return {
          address,
        };
      } else {
        return {
          error: 'No accounts found. Please select an account in MetaMask.',
        };
      }
    } else {
      return {
        error: 'Please install MetaMask at https://metamask.io',
      };
    }
  } catch (error) {
    return {
      error: 'An unexpected error occurred',
    };
  }
};
```

**Need some help?** Check out these links 👇

- **Connect to Core Blockchain** using ethers' Web3Provider and the Metamask wallet
  - [Ethers' docs for creating a Web3Provider instance](https://docs.ethers.io/v5/api/providers/other/#Web3Provider)
  - [StackOverflow post about connecting Metamask to Ethers](https://stackoverflow.com/questions/60785630/how-to-connect-ethers-js-with-metamask)
- **Display the connected network**
  - [Get the Network from a Ethers provider](https://docs.ethers.io/v5/api/providers/)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
const connect = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    if (provider) {
      // Request the currently selected accounts in MetaMask
      const accounts = await provider.send('eth_requestAccounts', []);

      // Make sure you have accounts and get the first one (currently selected)
      if (accounts.length > 0) {
        const address = accounts[0];
        return {
          address,
        };
      } else {
        return {
          error: 'No accounts found. Please select an account in MetaMask.',
        };
      }
    } else {
      return {
        error: 'Please install MetaMask at https://metamask.io',
      };
    }
  } catch (error) {
    return {
      error: 'An unexpected error occurred',
    };
  }
};
```

**What happened in the code above?**

- First, we need to define the provider by calling `Web3Provider` method of `providers`.
- We need to ensure that Metamask connects to the page, and that we can query the currently selected account in Metamask. This is done by using the method `send` on the provider, to send the `eth_requestAccounts` query. This will bring up a Metamask dialog, asking the user to unlock their Metamask if it is locked, or to connect an account to the page if Metamask is unlocked - this account functions as a `signer`.
- As said above the `signer` represents the current connected account. Then, calling the `accounts[0]` method will do the job of fetching the address of the current connected account.

---

# ✅ Make sure it works

## Once the code in `components/core/challenges/connect.ts` is complete, click on **Check Metamask Connection** to open Metamask and connect to Core Blockchain Testnet.

# 🔐 Addresses, Wallets, and Mnemonics

Every account on Core blockchain has a private key, a public key, and a mnemonic associated with it (referred to as a "[Secret Recovery Phrase](https://community.metamask.io/t/what-is-a-secret-recovery-phrase-and-how-to-keep-your-crypto-wallet-secure/3440)" by Metamask.

The format of all Core blockchain addresses match those on Ethereum. Each address is 42 characters in length - `0x` indicating that the following string is comprised of hexadecimal characters, and then the 40 hexadecimal characters representing the last 20 bytes of the account's public key. Sometimes people refer to an address as a public key, but they are not interchangeable in this case.

A **wallet** refers to either a piece of software used to manage cryptographic keys and the contents of associated addresses, such as Metamask or Trust Wallet, or _the address itself_. You may sometimes hear users refer to their address as their wallet.

Generating a new address in Metamask is not the same as generating a new secret recovery phrase/mnemonic. However, [`ethers.Wallet.createRandom()`](https://docs.ethers.io/v5/api/signer/#Wallet-createRandom) can be used to make new accounts and mnemonics.  
The 12 words of a secret recovery phrase are taken from a specific wordlist. They give control of the entire contents of any address generated with them. For this reason it is vitally important that you protect your private keys and secret recovery phrases. _Never share them with anyone_.

{% hint style="info" %}
This is an important topic to be comfortable with as both a user and blockchain developer. Spend some time experimenting with providers, signers and wallets to get acquainted with these fundamental blockchain concepts. There are many good explanations of the workings of [Hierarchical Deterministic](https://weteachblockchain.org/courses/bitcoin-for-developers/3/hd-wallets) (HD) wallets available online, just know that a secret recovery phrase/mnemonic is a critical piece of information which should be kept secret and secure at all times.
{% endhint %}

---

# 🏁 Conclusion

Now that we have a connected to the Core blockchain, we can use ethers to query information from the blockchain. In the next tutorial, we will cover how to query Core blockchain and display the information.

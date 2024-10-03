# 🦊 Install Metamask

Make sure you have the [Metamask](https://metamask.io/) browser extension installed!

---

# 🦺 Safety disclaimers

{% hint style="info" %}
If you **ALREADY** have Metamask installed and are using it for a hot wallet, it is _**strongly recommend**_ creating an entirely new wallet in Metamask for the purposes of these tutorials. Core wants nothing to do with your personal keys and do not also want any accidents involving anybody's cryptocurrency! Again, you _must not continue_ until you take care of this.  
{% endhint %}

{% hint style="danger" %}
If you **DO NOT** already have Metamask installed, welcome to the wonderful world of Web3!  
The first piece of advice we will give you is to make _absolutely sure that you write down the_ [**Secret Recovery Phrase**](https://community.metamask.io/t/what-is-a-secret-recovery-phrase-and-how-to-keep-your-crypto-wallet-secure/3440) that is generated during Metamask's initial setup. Do not store it in a digital format. Do not share it with anybody. Please do keep it accessible to yourself because you will be using it during your learning pathway using the Core Developer Playground.
{% endhint %}

---

# ⛓ Add the Core Blockchain TestNet to Metamask

Core is the first Bitcoin-aligned EVM-compatible Layer-1 blockchain, designed to be Bitcoin's complementary and hyper-scalable smart contract platform. In this developer playground, we target the dapp development on the Core blockchain.

The first task is to connect to the Core blockchain TestNet by adding it to the list of RPC endpoints in Metamask. Click on the Fox head icon in your web browser to open the popup, and then follow this workflow to complete the process :

- Click on the current network at the top of the Metamask popup (by default is says "Ethereum Mainnet")
- Scroll down and click on "Custom RPC"
- Fill in the form:
  - Network Name: `Core Blockchain TestNet`
  - New RPC URL: `https://rpc.test.btcs.network`
  - Chain ID: `1115`
  - Currency Symbol: `tCORE`
  - Block Explorer URL: `https://scan.test.btcs.network`
- Double check the information, then click on the Save button.

![add-core-testnet-to-metamask](/add_core_testnet.png)

We use the testnet for development before moving into production on the main network or "mainnet".

---

# 🧩 API keys

If you're using a private infractructure provider, you may require an API key to access nodes via their endpoints. Remember to have your API key saved in `/learn-web3-dapp/.env.local`. You can then reference your API key in the pathway code via `process.env.<SOME_VARIABLE_NAME>`.

If you are using the [Core's default public endpoints](https://docs.coredao.org/docs/Dev-Guide/rpc-list) you do not require an API key, and you can connect directly without any additions to `.env.local`.

{% hint style="tip" %}
If the Next.js development server was running at the time you changed the environment variable's value, you will need to restart the Next.js server to make it aware of the new value. You can do this by pressing `Ctrl+C` in the terminal where the Next.js server is running, then restart it with the command `yarn dev` or `npm run dev`.
{% endhint %}

---

# 👣 Next Steps

Click on the **Next: Connect to Core Blockchain** button below.

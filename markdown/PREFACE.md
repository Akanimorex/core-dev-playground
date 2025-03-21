## 🧑‍🏫 Instructions on the left, 🤝 interaction on the right

Each step of this Developer Playground covers a different aspect of using the Core blockchain. The format is easy to follow, with instructions on the left side and the right side for you to interact with your code. Remember that the left side can be scrolled down to show the rest of the content.

## 🏋️ Challenges & hints

After some explanation of each topic, there is a coding challenge for you to complete before you can proceed to the next step, for example:

```js
// path/to/the/file/to/edit.ts - this is only an example!
const provider = undefined; // Create a provider using ethers
const selectedAddress = undefined; // then get the address
const balanceToDisplay = undefined; // and format its balance
```

For every challenge, we will give you hints and tips to help you get started. They usually point to the relevant documentation page, for example:

**Need some help?** Check out these links 👇

- Getting a [provider](https://docs.ethers.io/v5/api/providers/#providers) with ethers.js
- Formatting a balance with [formatUnits](https://docs.ethers.io/v5/api/utils/display-logic/#utils-formatUnits)

## 😅 Providing solutions

Don't worry if you can't find the answer, we provide the solution to every challenge. It's just hidden so that we don't spoil anything for you, click "Show Solution" to reveal it:

```js
// solution
// path/to/the/file/to/edit.ts - this is only an example!
const provider = new ethers.providers.Web3Provider(window.ethereum);
const selectedAddress = provider.selectedAddress;
const balanceOfAddress = await provider.getBalance(selectedAddress);
const balanceToDisplay = ethers.utils.formatUnits(balanceOfAddress, 18);
```

When you have completed the code, make sure it works by interacting with the UI on the right side of the page. The button at the bottom right of the screen will be enabled and allow you to move on to the next step!

# 🧩 API keys

Core Developer Playground make use of public RPC endpoints only. There is no need to supply an API key to access the public endpoints.

If you're using a private infractructure provider, you may require an API key to access nodes via their endpoints. Remember to have your API key saved in `/core-dev-playground/.env.example`. You can then reference your API key in the pathway code via `process.env.<SOME_VARIABLE_NAME>`.

## 💬 Connect with us on Discord

If you experience any difficulty in using the Core Developer Playground or want to talk about BTCfi, please join our Developer community on [Discord](https://discord.com/invite/coredaoofficial).

## 👣 Next Steps

Click on the **Next** (or **Setup the project**) button below to continue with the Pathway.

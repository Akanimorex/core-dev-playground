import {ethers} from 'ethers';

declare let window: {
  ethereum: ethers.providers.ExternalProvider;
};

const getBalance = async (address: string) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // TODO:get the balance
    const balance = undefined;
    if (!balance) {
      throw new Error('Please complete the code');
    }
    if (balance.isZero()) {
      throw new Error('Get the testnet tokens from the faucet');
    }
    return {
      balance: balance.toString(),
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export default getBalance;

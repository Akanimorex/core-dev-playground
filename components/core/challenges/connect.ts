import {ethers} from 'ethers';

declare let window: {
  ethereum: ethers.providers.ExternalProvider;
};

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

export default connect;

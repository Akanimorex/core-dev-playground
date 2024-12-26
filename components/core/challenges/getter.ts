import {ethers} from 'ethers';
import HelloWorldJson from './HelloWorld.json';

declare let window: {
  ethereum: ethers.providers.ExternalProvider;
};

const getValue = async (contractAddress: string) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // TODO: Instantiate the contract with the correct ABI and contract address
    const contract = new ethers.Contract(undefined);

    // TODO: Call the expected method (getGreeting) to retrieve the value from the contract
    const value = undefined;
    return {value};
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export default getValue;

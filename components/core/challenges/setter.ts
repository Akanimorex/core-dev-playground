import {ethers} from 'ethers';
import HelloWorldJson from './HelloWorld.json';

declare let window: {
  ethereum: ethers.providers.ExternalProvider;
};

const setValue = async (contractAddress: string, value: number) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // TODO: Instantiate the contract with the correct ABI and contract address
    const contract = new ethers.Contract(undefined);

    // TODO: Call the expected method (setGreeting) with the value argument
    const transactionResult = undefined;
    const receipt = await transactionResult.wait();
    return {hash: receipt.transactionHash};
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export default setValue;

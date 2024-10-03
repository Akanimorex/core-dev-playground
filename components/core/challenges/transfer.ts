import {ethers} from 'ethers';

declare let window: {
  ethereum: ethers.providers.ExternalProvider;
};

// A random test's address
const RECIPIENT = '0x2787D2ff0cc90907D84cBCE7459b4a1aF9c141CA';
// 0.1 tCORE
const AMOUNT = '0.01';

const transfer = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const send_account = provider.getSigner().getAddress();

    const currentGasPrice = await provider.getGasPrice();
    const gas_price = ethers.utils.hexlify(
      parseInt(currentGasPrice.toString()),
    );

    const transaction = undefined;

    const hash = undefined;
    const receipt = await hash.wait();
    return {hash: receipt.transactionHash};
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export default transfer;

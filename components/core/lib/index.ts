export const accountExplorer = (network: string) => (address: string) => {
  return `https://scan.test2.btcs.network/address/${address}`;
};

export const getCoreBlockExplorerURL = (block: number) => {
  return `https://scan.test2.btcs.network/block/${block}`;
};

export const getCoreTxExplorerURL = (txId: string) => {
  return `https://scan.test2.btcs.network/tx/${txId}`;
};

export const getCoreTokenExplorerURL = (address: string) => {
  return `https://scan.test2.btcs.network/token/${address}`;
};

export const getCoreFaucetURL = () => {
  return `https://scan.test2.btcs.network/faucet`;
};

import {CHAINS, CORE_NETWORKS, NETWORK} from 'types';

export const networksMap = (
  network: NETWORK,
  chain: CHAINS,
): string | undefined => {
  // CORE NETWORKS MAP
  if (chain === CHAINS.CORE) {
    if (network === NETWORK.TESTNET) {
      return CORE_NETWORKS.TESTNET;
    } else {
      return undefined;
    }
  }
};

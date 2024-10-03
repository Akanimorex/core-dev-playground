import {CHAINS, NETWORKS, PROTOCOLS} from 'types';

export const getNodeURL = (
  chain: CHAINS,
  network: NETWORKS,
  protocol?: PROTOCOLS,
  node?: string,
): string => {
  if (node === 'devnet') {
    return getTestnetNodeURL(chain);
  }
  if (node === 'localnet') {
    return getLocalNodeURL(chain);
  }
  return getExternalNodeURL(chain, network, protocol);
};

const getTestnetNodeURL = (chain: CHAINS): string => {
  switch (chain) {
    case CHAINS.CORE:
      return 'https://rpc.test.btcs.network';
    default:
      return '';
  }
};

const getLocalNodeURL = (chain: CHAINS): string => {
  switch (chain) {
    case CHAINS.CORE:
      return 'http://127.0.0.1:8545';
    default:
      return '';
  }
};

export const getExternalNodeURL = (
  chain: CHAINS,
  network: NETWORKS,
  protocol?: PROTOCOLS,
): string => {
  switch (chain) {
    case CHAINS.CORE:
      return getExternalCoreNodeUrl();
    default:
      return '';
  }
};

const getExternalCoreNodeUrl = (): string => `${process.env.CORE_TESTNET_URL}`;

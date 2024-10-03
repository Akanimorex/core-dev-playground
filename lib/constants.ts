import {
  CHAINS,
  CORE_NETWORKS,
  CORE_PROTOCOLS,
  ChainsType,
  PROTOCOL_STEPS_ID,
} from 'types';

export const GRID_LAYOUT = [13, 11];
export const HEADER_HEIGHT = 80;
export const FOOTER_HEIGHT = 90;

export const CHAINS_CONFIG: ChainsType = {
  [CHAINS.CORE]: {
    id: CHAINS.CORE,
    label: 'Core',
    active: true,
    logoUrl:
      'https://miro.medium.com/v2/resize:fit:400/1*mBBtjPJv50S3d9Q1gS8O2w.png',
    protocol: CORE_PROTOCOLS.RPC,
    network: CORE_NETWORKS.TESTNET,
    steps: [
      {
        id: PROTOCOL_STEPS_ID.PREFACE,
        title: 'Welcome to the Core Developer Playground',
        isOneColumn: true,
      },
      {
        id: PROTOCOL_STEPS_ID.PROJECT_SETUP,
        title: 'Setup the project',
        isOneColumn: true,
      },
      {
        id: PROTOCOL_STEPS_ID.CHAIN_CONNECTION,
        title: 'Connect to Core Blockchain',
      },
      {
        id: PROTOCOL_STEPS_ID.QUERY_CHAIN,
        title: 'Query Core Blockchain',
      },
      {
        id: PROTOCOL_STEPS_ID.GET_BALANCE,
        title: 'Fund a Core Blockchain account',
      },
      {
        id: PROTOCOL_STEPS_ID.TRANSFER_TOKEN,
        title: 'Transfer some CORE',
      },
      {
        id: PROTOCOL_STEPS_ID.DEPLOY_CONTRACT,
        title: 'Deploy a Solidity Smart Contract',
      },
      {
        id: PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE,
        title: 'Set the storage of the contract',
      },
      {
        id: PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE,
        title: 'Get the storage of the contract',
      },
      /*{
        id: PROTOCOL_STEPS_ID.RESTORE_ACCOUNT,
        title: 'Restore your account',
      },*/
      {
        id: PROTOCOL_STEPS_ID.FINAL,
        title: '🎓 Developer Playground Complete!',
        isOneColumn: true,
      },
    ],
  },
};

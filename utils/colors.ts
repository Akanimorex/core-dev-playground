import {CHAINS} from 'types';

export const colors = {
  coreOrange: '#FF9211',
  darkBackground: 'rgb(33, 37, 41)',
  textColor: '#ffffff',
};

type ChainColorsType = {
  primaryColor: string;
  secondaryColor: string;
};

export const getChainColors = (chainId: CHAINS): ChainColorsType => {
  return {
    primaryColor: getPrimaryColor(chainId),
    secondaryColor: getSecondaryColor(chainId),
  };
};

const getPrimaryColor = (chainId: CHAINS) => {
  if (chainId === CHAINS.CORE) {
    return '#FF9211';
  }
  return 'rgb(255, 242, 155)';
};

const getSecondaryColor = (chainId: CHAINS) => {
  if (chainId === CHAINS.CORE) {
    return '#0B0E116';
  }
  return 'black';
};

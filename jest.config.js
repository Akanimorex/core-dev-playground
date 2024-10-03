module.exports = {
  testPathIgnorePatterns: ['./node_modules/', './.next/'],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset
    https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {presets: ['next/babel']}],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  modulePaths: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    '^@core/(.*)$': 'components/core/$1',
    '^@thegraph/(.*)$': 'components/the_graph/$1',
  },
};

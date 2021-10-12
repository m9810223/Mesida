module.exports = {
  rootDir: '..',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/configs/jest.setup.js'],
  collectCoverage: false,
  testEnvironment: 'jsdom',
  transform: { '^.+\\.(js|jsx|ts)$': ['babel-jest', { configFile: './.babelrc.js' }] },
  globals: {
    __WINVAR__: 'readonly',
    __NAME__: 'readonly',
    __VERSION__: 'readonly',
    __MODE__: 'readonly',
  },
  moduleNameMapper: {
    // alias:
    '^core(.*)$': '<rootDir>/src/core$1',
  },
};

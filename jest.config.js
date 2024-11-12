module.exports = {
    preset: 'jest-preset-angular',
    transform: {
      '^.+\\.(ts|mjs|html|json)$': 'ts-jest',
    },
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  };
  
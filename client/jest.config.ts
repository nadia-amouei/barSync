export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['<rootDir>/jest.setup.ts'],
  transform: {
      "^.+\\.tsx?$": "ts-jest"
  // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
      '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/tests/mocks/fileMock.js',
      '\\.(css|less)$': '<rootDir>/src/tests/mocks/styleMock.js',
  },
}
module.exports = {
  preset: 'react-native',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)',
  ],
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/src/assets/**',
    '!**/src/firebase/**',
    '!**/__tests__/**',
    '!**/__server_tests__/**',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 40,
      functions: 75,
      lines: 45,
    },
  },
};

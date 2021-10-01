const path = require('path');
module.exports = {
  preset: 'jest-expo',
  testRunner: 'jest-circus/runner',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)',
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
  ],
  watchPathIgnorePatterns: ['<rootDir>/node_modules'],
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, 'src'),
    'shared',
    path.join(__dirname, 'test'),
  ],
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/src/assets/**',
    '!**/src/firebase/**',
    '!**/src/utils/timedLog.js',
    '!**/src/utils/onSignOut.js',
    '!**/__tests__/**',
    '!**/__server_tests__/**',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      statements: 65,
      branches: 88,
      functions: 63,
      lines: 64,
    },
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};

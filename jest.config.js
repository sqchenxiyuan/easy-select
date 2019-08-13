module.exports = {
  collectCoverage: true,
  coverageDirectory: 'test__reports',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/node_modules/**'
  ],
  coverageReporters: [
    'text',
    'html'
  ],
  coverageThreshold: {
    // "global": {
    //   "branches": 80,
    //   "functions": 80,
    //   "lines": 80,
    //   "statements": 80
    // }
  },
  moduleFileExtensions: [
    'js',
    'ts'
  ],
  modulePaths: [
    '<rootDir>'
  ],
  testRegex: '\\.test\\.ts$'
}

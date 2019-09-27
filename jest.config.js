module.exports = {
  coverageDirectory: 'test__reports',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/filters/*.js',
    '!**/node_modules/**'
  ],
  coverageReporters: [
    'text',
    'json'
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
    'js'
  ],
  modulePaths: [
    '<rootDir>'
  ],
  testRegex: '\\.test\\.js$'
}

module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['packages/**/lib/**/*.{js,jsx,ts,tsx}'],
  coverageReporters: ['json', 'lcov'],
  projects: ['<rootDir>/packages/*/jest.config.js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

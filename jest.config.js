/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testMatch: [
    '**/?(*.)+(spec).ts?(x)',
    '**/?(*.)+(test).ts?(x)'
  ],
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['./src/**/*.ts']
}

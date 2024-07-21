import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'
import type { Config } from 'jest'
import 'dotenv/config'

const jestConfig: Config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/modules/**/use-cases/**/*usecase.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/use-cases/**/*.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

export default jestConfig

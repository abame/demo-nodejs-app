import type { Config } from '@jest/types'

type CoverageThreshold = {
  global: Record<string, number>;
};

export function coverageThreshold (threshold: number): CoverageThreshold {
  return {
    global: {
      branches: threshold,
      functions: threshold,
      lines: threshold,
      statements: threshold
    }
  }
}

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/*.spec.ts'],
  coverageThreshold: coverageThreshold(100)
}

export default config

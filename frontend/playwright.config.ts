import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  expect: { timeout: 12_000 },
  reporter: 'list',
  use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:52321', headless: true },
  webServer: {
    command: 'node ./node_modules/next/dist/bin/next dev --port 52321',
    url: 'http://localhost:52321',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});

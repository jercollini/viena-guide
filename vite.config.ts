/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { guide } from './src/guide/config'

export default defineConfig({
  plugins: [react()],
  // Must match the GitHub repo name so assets resolve on GitHub Pages.
  base: `/${guide.repo}/`,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/testing/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/**/*.test.{ts,tsx}',
        'src/testing/**',
      ],
    },
  },
})

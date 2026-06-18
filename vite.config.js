import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  base: process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` : '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  }
})

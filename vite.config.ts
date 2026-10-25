
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

const siteConfigPath = path.resolve(
  import.meta.dirname,
  './.figma/make/site.json'
)

const siteConfiguration = fs.existsSync(siteConfigPath)
  ? JSON.parse(fs.readFileSync(siteConfigPath, 'utf-8'))
  : {}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'process.env.SITE_CONFIG': JSON.stringify(siteConfiguration),
  },
})

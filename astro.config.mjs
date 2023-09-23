// For defining astro configuration
import { defineConfig } from 'astro/config'

// Astro plugins for react and tailwind setup
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

// Node.js path module
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// auto-import plugin
import AutoImport from 'unplugin-auto-import/astro'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// For automaticaly importing react, react-dom and hooks
const autoImportConfig = {
  include: [/\.[tj]sx?$/],
  dirs: [
    resolve(__dirname, 'src', 'utils', '**'),
    resolve(__dirname, 'src', 'components', '**'),
  ],
  imports: [
    'react',
    {
      react: ['useState', 'useEffect'],
    },
  ],
  dts: resolve(__dirname, 'src', 'types', 'env.d.ts'),
}

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), AutoImport(autoImportConfig)],
  vite: {
    css: {
      preprocessorOptions: {
        styl: {
          additionalData: `@import "${resolve(
            __dirname,
            'src',
            'stylus',
            'global'
          )}"`,
        },
      },
    },
  },
})

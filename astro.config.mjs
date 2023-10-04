// For defining astro configuration
import { defineConfig } from 'astro/config'

// Astro plugins for react and tailwind setup
import tailwind from '@astrojs/tailwind'

// Node.js path module
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// auto-import plugin
import AutoImport from 'unplugin-auto-import/astro'
import vue from '@astrojs/vue'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// For automaticaly importing react, react-dom and hooks
const autoImportConfig = {
  include: [/\.[tj]s+.vue?$/],
  dirs: [
    resolve(__dirname, 'src', 'utils', '**'),
    resolve(__dirname, 'src', 'components', '**'),
    resolve(__dirname, 'src', 'store', '**'),
  ],
  imports: [
    {
      vue: ['ref', 'watch', 'computed', 'onMounted', 'onUnmounted'],
    },
  ],
  dts: resolve(__dirname, 'src', 'auto-imports.d.ts'),
}

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), tailwind(), AutoImport(autoImportConfig)],
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
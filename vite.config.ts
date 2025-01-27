import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import code from '@yankeeinlondon/code-builder'
import link from '@yankeeinlondon/link-builder'
import meta from '@yankeeinlondon/meta-builder'
import MarkdownItGitHubAlerts from 'markdown-it-github-alerts'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import Markdown from 'vite-plugin-md'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    UnoCSS(),
    vueDevTools(),
    VueRouter({
      extensions: ['.vue', '.md'],
    }),
    Components({
      extensions: ['vue', 'md'],

      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: './components.d.ts',
    }),
    Markdown({
      builders: [code({
        theme: 'solarizedLight',
      }), link(), meta()],
      markdownItSetup(md) {
        md.use(MarkdownItGitHubAlerts)
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@lib': fileURLToPath(new URL('./packages/lib', import.meta.url)),
      '@css': fileURLToPath(new URL('./packages/css', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./packages/hooks', import.meta.url)),
    },
  },
})

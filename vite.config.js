import { defineConfig } from 'vite'
import path from "path";
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import vitePluginStylusAlias from 'vite-plugin-stylus-alias'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vitePluginStylusAlias(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },

  server: {
    proxy: {
      '/adminApi': {
        target: 'https://api.bloniea.xyz/blogAdmin/api/private/v1/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/adminApi/, '')
      },
    },

  },


})

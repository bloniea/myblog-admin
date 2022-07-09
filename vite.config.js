import { defineConfig } from 'vite'
import path from "path";
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    vue(),

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
    hmr: true,
    proxy: {
      '/adminApi': {
        target: 'https://api.bloniea.xyz/blogAdmin/api/private/',
        // target: 'http://localhost:5555/api/private/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/adminApi/, '')
      },


    },

  },


})

import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // https://cn.vitejs.dev/config/server-options.html#server-proxy
    proxy: {
      "/front": { // 打 http://localhost:400/front 本地代理打 http://39.97.218.60/front
        target: loadEnv("", process.cwd()).VITE_API_URL,
        changeOrigin: true, // 目標會知道原始請求是從誰發起
        // rewrite: (path) => path.replace(/^\/front/, '') // 修改路徑
      },
      "/boss": {
        target: loadEnv("", process.cwd()).VITE_API_URL,
        changeOrigin: true, // 目標會知道原始請求是從誰發起
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'], // 自動導入 vue 相關函式如 ref, reactive, toRef 等，之後就不用寫 import
      resolvers: [ElementPlusResolver(), IconsResolver()]
      // eslintrc: { enabled: true } // 9/4 不影響。這裡主要生成 .eslintrc-auto-import.json 解決 eslint 報錯問題
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep'] // ep = element plus
        })
      ]
    }),
    Icons({
      autoInstall: true // 使用 Icon 時，自動安裝圖片，不用手動 import
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});

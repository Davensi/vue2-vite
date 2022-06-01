import { createVuePlugin } from 'vite-plugin-vue2';
import { defineConfig } from 'vite';
import commonjs from "rollup-plugin-commonjs";
import externalGlobals from "rollup-plugin-external-globals";

export default defineConfig((...args) => {
  return {
    //
    
    plugins: [createVuePlugin({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    })],
     
    // 代理跨域请求
    server: {
      proxy: {
        '/myapi': {
          target: 'http://localhost:8800/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/myapi/, '')
        },
      },
    },
    resolve: {
      // 路劲别名
      alias: {
        '@': '/src',
        '@api': '/src/api'
      },
      // 配置后扩展名可不写
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    // 删除console和debugger
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      external: ["axios", "moment"],
      plugins: [
        commonjs(),
        externalGlobals({
          axios: "axios",
          moment: "moment",
        }),
      ],
      // 小于阈值的资源将转为 base64，。 设置为0禁用
      assetsInlineLimit: 4096 * 2, // => 8kb
      // CDN加速
      rollupOptions: {
        // 拆分静态资源
        output: {
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          // chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
             const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
             return `js/${fileName}/[name].[hash].js`;
          },
          // 超大静态资源拆分
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      },
    },
   
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2'
import path from 'node:path';
import sass from 'sass';

export default defineConfig(({ command }) => {
    const isProduction = command === 'build';

    return {
        plugins: [
            react(),
            isProduction && compression(),
        ],
        server: {
            proxy: {
                '/api': {
                    target: 'https://bdm.stat.gov.pl',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                }
            }
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            },
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
        },
        css: {
            preprocessorOptions: {
                scss: {
                    implementation: sass,
                }
            }
        },
    };
});

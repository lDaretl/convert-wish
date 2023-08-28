import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
//import * as API_KEYS from '/api_keys.json'
import ViteFaviconsPlugin from 'vite-plugin-favicon2';

// https://vitejs.dev/config/

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes("node_modules")) {
                        if (id.includes("react")) {
                            return "react";
                        }
                    }
                },
            },
        },
    },

    server: {
        host: true,
        https: true,
        cors: true,
        port: 443
    },

    plugins: [
        react(),
        mkcert(),
        ViteFaviconsPlugin(
            {
                logo: './src/assets/favicon.png',
                favicons: {
                    icons: {
                        appleIcon: false,
                        appleStartup: false
                    }
                }
            }
        )
    ]
})

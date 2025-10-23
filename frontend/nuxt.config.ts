if (!process.env.RAPID_API_HOST) {
    throw new Error('RAPID_API_HOST is required.')
}

if (!process.env.RAPID_API_KEY) {
    throw new Error('RAPID_API_KEY is required.')
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    modules: ['@nuxt/eslint', '@nuxt/ui', '@vueuse/nuxt', '@nuxt/icon'],
    css: ['~/assets/main.css'],
    devtools: { enabled: true },
    runtimeConfig: {
        rapidApiHost: process.env.RAPID_API_HOST,
        rapidApiKey: process.env.RAPID_API_KEY,
        public: {
            baseUrl: process.env.NUXT_PUBLIC_BASE_URL || '',
        },
    },
    sourcemap: true,
    postcss: {
        plugins: {
            '@tailwindcss/postcss': {},
        },
    },
    routeRules: {
        '/api/streaming-api': {
            headers: {
                'Cache-Control': 'max-age=36000 Public',
            },
        },
        '/': {
            redirect: '/movies',
        },
        // generated on demand once until next deployment, cached on CDN
        // '/movies': { isr: true },
    },
    nitro: {
        preset: 'cloudflare-pages',
        prerender: {
            autoSubfolderIndex: false,
        },
    },
})

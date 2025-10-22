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
    },
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
    },
})

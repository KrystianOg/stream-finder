if (!process.env.RAPID_API_HOST) {
    throw new Error('RAPID_API_HOST is required.')
}

if (!process.env.RAPID_API_KEY) {
    throw new Error('RAPID_API_KEY is required.')
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    modules: [
        '@nuxt/eslint',
        '@nuxt/ui',
        '@vueuse/nuxt',
        '@nuxt/icon',
        '@nuxt/image',
    ],
    css: ['~/assets/main.css'],
    devtools: { enabled: true },
    runtimeConfig: {
        rapidApiHost: process.env.RAPID_API_HOST,
        rapidApiKey: process.env.RAPID_API_KEY,
        public: {
            baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
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
        // generated on demand, revalidates in background, cached on CDN
        '/movies': { isr: 3600 },
        '/movies/**': { isr: 86400 },
        '/series': { isr: 3600 },
        '/series/**': { isr: 86400 },
    },
    nitro: {
        preset: 'cloudflare-pages',
        prerender: {
            autoSubfolderIndex: false,
        },
        cloudflare: {
            wrangler: {
                name: 'streaming-availability-proxy',
                compatibility_date: '2025-02-04',
                main: './server/kv.ts',
                observability: {
                    enabled: true,
                },
                kv_namespaces: [
                    {
                        id: process.env.CLOUDFLARE_KV_ID,
                        binding: 'KV',
                        preview_id: process.env.CLOUDFLARE_KV_PREVIEW_ID,
                    },
                ],
            },
        },
    },
    image: {
        cloudflare: {
            baseUrl: process.env.CLOUDFLARE_IMAGE_BASE_URL,
        },
    },
})

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
        '@vite-pwa/nuxt',
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
    app: {
        head: {
            link: [
                {
                    rel: 'icon',
                    type: 'image/svg+xml',
                    href: '/favicon.svg',
                },
                {
                    rel: 'manifest',
                    href: '/manifest.webmanifest',
                },
            ],
            meta: [{ name: 'theme-color', content: '#8b5cf6' }],
        },
    },
    sourcemap: true,
    postcss: {
        plugins: {
            '@tailwindcss/postcss': {},
        },
    },
    routeRules: {
        '/': {
            redirect: '/movies',
        },
        '/api/streaming-api/**': {
            headers: {
                'Cache-Control': 'max-age=36000 Public',
            },
            cache: { maxAge: 36000 },
        },
        '/movies': {
            cache: { maxAge: 3600 },
        },
        '/movies/**': { cache: { maxAge: 86400 } },
        '/series': { cache: { maxAge: 3600 } },
        '/series/**': { cache: { maxAge: 86400 } },
        '/**': {
            headers: {
                'Content-Security-Policy': [
                    "default-src 'self'",
                    "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://static.cloudflareinsights.com",
                    "style-src 'self' 'unsafe-inline'",
                    "img-src 'self' data: blob: https:",
                    "font-src 'self' data:",
                    "connect-src 'self' https://streaming-availability.p.rapidapi.com https://cloudflareinsights.com",
                    "manifest-src 'self'",
                    "frame-ancestors 'none'",
                    "base-uri 'self'",
                    "form-action 'self'",
                ].join('; '),
                'Strict-Transport-Security':
                    'max-age=63072000; includeSubDomains; preload',
                'Cross-Origin-Opener-Policy': 'same-origin',
                'X-Frame-Options': 'DENY',
                'X-Content-Type-Options': 'nosniff',
                'Referrer-Policy': 'strict-origin-when-cross-origin',
                'Permissions-Policy':
                    'camera=(), microphone=(), geolocation=()',
            },
        },
    },
    vite: {
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        'floating-ui': [
                            '@floating-ui/core',
                            '@floating-ui/dom',
                        ],
                        'vue-runtime': ['@vue/runtime-core'],
                    },
                },
            },
        },
    },
    nitro: {
        preset: 'cloudflare-pages',
        prerender: {
            autoSubfolderIndex: false,
        },
        cloudflare: {
            wrangler: {
                name: 'streaming-availability-proxy',
                compatibility_date: '2025-07-15',
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
        domains: ['www.movieofthenight.com', 'cdn.movieofthenight.com'],
        cloudflare: {
            baseUrl: process.env.CLOUDFLARE_IMAGE_BASE_URL,
        },
    },
    pwa: {
        registerType: 'autoUpdate',
        manifest: {
            name: 'Stream Finder',
            short_name: 'StreamFinder',
            description: 'Find where to stream your favorite movies and series',
            theme_color: '#8b5cf6',
            background_color: '#1e1e2f',
            display: 'standalone',
            lang: 'en',
            start_url: '/',
            icons: [
                // Android/Chrome
                {
                    src: '/android/android-launchericon-192-192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: '/android/android-launchericon-512-512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
                {
                    src: '/android/android-launchericon-512-512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable',
                },
                // iOS (Safari)
                {
                    src: '/ios/180.png',
                    sizes: '180x180',
                    type: 'image/png',
                },
            ],
        },
        workbox: {
            navigateFallback: '/',
            globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,ico,gif,woff2}'],
            runtimeCaching: [
                {
                    urlPattern: /^https:\/\/api\..*/i,
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'api-cache',
                        expiration: {
                            maxEntries: 50,
                            maxAgeSeconds: 60 * 60 * 24,
                        },
                    },
                },
            ],
        },
        devOptions: {
            enabled: true,
            type: 'module',
        },
    },
})

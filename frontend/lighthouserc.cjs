module.exports = {
    // https://web.dev/articles/lighthouse-ci
    ci: {
        collect: {
            // Number of times to run Lighthouse per URL
            numberOfRuns: 5,
            startServerCommand: 'npm run preview',
            startServerReadyPattern: 'Listening on',
            startServerReadyTimeout: 30000,
            // URLs to test - add more routes as needed
            url: [
                'http://localhost:3000/',
                // Add more routes here, e.g.:
                // 'http://localhost:4173/about',
                // 'http://localhost:4173/products',
            ],
            settings: {
                preset: 'desktop', // Change to 'mobile' for mobile testing
                chromeFlags: '--no-sandbox --disable-gpu',
            },
        },
        assert: {
            // Define performance budgets and assertions
            assertions: {
                // Category scores (0-1 scale)
                'categories:performance': ['error', { minScore: 0.9 }],
                'categories:accessibility': ['error', { minScore: 0.9 }],
                'categories:best-practices': ['error', { minScore: 0.9 }],
                'categories:seo': ['error', { minScore: 0.9 }],

                // Specific metrics - Core Web Vitals
                'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
                'largest-contentful-paint': [
                    'error',
                    { maxNumericValue: 2500 },
                ],
                'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
                'total-blocking-time': ['warn', { maxNumericValue: 300 }],
                'speed-index': ['warn', { maxNumericValue: 3000 }],
                interactive: ['warn', { maxNumericValue: 3500 }],

                // Resource size budgets
                'resource-summary:document:size': [
                    'error',
                    { maxNumericValue: 50000 },
                ],
                'resource-summary:script:size': [
                    'error',
                    { maxNumericValue: 300000 },
                ],
                'resource-summary:stylesheet:size': [
                    'warn',
                    { maxNumericValue: 50000 },
                ],
                'resource-summary:image:size': [
                    'warn',
                    { maxNumericValue: 500000 },
                ],
                'resource-summary:font:size': [
                    'warn',
                    { maxNumericValue: 100000 },
                ],

                // Other important audits
                'uses-responsive-images': 'warn',
                'offscreen-images': 'warn',
                'unminified-css': 'error',
                'unminified-javascript': 'error',
                'unused-css-rules': 'warn',
                'uses-optimized-images': 'warn',
                'modern-image-formats': 'warn',
                'uses-text-compression': 'error',
                'uses-rel-preconnect': 'warn',
                'font-display': 'warn',
            },
        },
        upload: {
            // Store reports temporarily - can be configured for permanent storage
            // https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md#target
            target: 'temporary-public-storage',
            // For GitHub Actions, consider using LHCI server
            // target: 'lhci',
            // serverBaseUrl: 'https://your-lhci-server.com',
            // token: process.env.LHCI_TOKEN,
        },
    },
}

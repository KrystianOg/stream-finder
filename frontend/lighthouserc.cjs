module.exports = {
    // https://web.dev/articles/lighthouse-ci
    ci: {
        collect: {
            // Number of times to run Lighthouse per URL
            numberOfRuns: 3,
            startServerCommand: 'npm run preview',
            startServerReadyPattern: 'Listening on',
            startServerReadyTimeout: 30000,
            // URLs to test - add more routes as needed
            url: [
                'http://localhost:3000/movies',
                'http://localhost:3000/movies/14625863',
                'http://localhost:3000/tv-series',
                'http://localhost:3000/tv-series/651',
                // Add more routes here
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
                'categories:performance': ['warn', { minScore: 0.9 }],
                'categories:accessibility': ['warn', { minScore: 0.9 }],
                'categories:best-practices': ['warn', { minScore: 0.9 }],
                'categories:seo': ['warn', { minScore: 0.9 }],

                // Specific metrics - Core Web Vitals
                'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
                'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
                'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
                'total-blocking-time': ['warn', { maxNumericValue: 300 }],
                'speed-index': ['warn', { maxNumericValue: 3000 }],
                interactive: ['warn', { maxNumericValue: 3500 }],

                // Resource size budgets
                'resource-summary:document:size': [
                    'warn',
                    { maxNumericValue: 50000 },
                ],
                'resource-summary:script:size': [
                    'warn',
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
                'unminified-css': 'warn',
                'unminified-javascript': 'warn',
                'unused-css-rules': 'warn',
                'uses-optimized-images': 'warn',
                'modern-image-formats': 'warn',
                'uses-text-compression': 'warn',
                'uses-rel-preconnect': 'warn',
                'font-display': 'warn',
            },
        },
        upload: {
            // Store lighthouse reports temporarily (90D)
            // https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md#target
            target: 'filesystem',
            outputDir: '.lighthouse',
        },
    },
}

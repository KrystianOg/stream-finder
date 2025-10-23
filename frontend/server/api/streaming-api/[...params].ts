import { hash } from 'ohash'

export default defineEventHandler(async (event) => {
    const { rapidApiHost, rapidApiKey } = useRuntimeConfig()

    setResponseHeaders(event, {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'CDN-Cache-Control': 'public, max-age=3600',
        'Cloudflare-CDN-Cache-Control': 'public, max-age=3600',
    })

    // TODO: remove nullish searchparams as they unnecessarily duplicate requests made,
    // when they could be resolved from cache
    const path = event.path.replace(/^\/api\/streaming-api\//, '')
    const target = new URL(path, 'https://' + rapidApiHost).toString()

    if (import.meta.dev) {
        const cacheKey = `api:${hash(target)}`
        // NOTE: this is already optimized so we don't make so many costly requests
        // for presentation purposes we can undo this or create fake delay of about 700ms
        // cause this is how long it takes for API to respond
        const cached = await useStorage('cache').getItem(cacheKey)

        if (cached) {
            return cached
        }

        const data = await $fetch(target, {
            headers: {
                'x-rapidapi-host': rapidApiHost,
                'x-rapidapi-key': rapidApiKey,
            },
        })

        await useStorage('cache').setItem(cacheKey, JSON.stringify(data), {
            ttl: 3600,
        })

        return data
    }

    const data = await $fetch(target, {
        headers: {
            'x-rapidapi-host': rapidApiHost,
            'x-rapidapi-key': rapidApiKey,
        },
    })

    return data
})

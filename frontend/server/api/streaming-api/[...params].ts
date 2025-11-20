import { hash } from 'ohash'

const TWO_WEEKS_IN_SECONDS = 14 * 24 * 60 * 60

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
    const cacheKey = `api:${hash(target)}`

    const KV = event.context.cloudflare?.env?.KV

    if (KV) {
        const cached = await KV.get(cacheKey)

        if (cached) {
            return JSON.parse(cached)
        }
    }

    const data = await $fetch(target, {
        headers: {
            'x-rapidapi-host': rapidApiHost,
            'x-rapidapi-key': rapidApiKey,
        },
    })

    if (KV) {
        await KV.put(cacheKey, JSON.stringify(data), {
            expirationTtl: TWO_WEEKS_IN_SECONDS,
        })
    }

    return data
})

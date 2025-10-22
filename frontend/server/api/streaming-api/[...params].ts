import { hash } from 'ohash'

export default defineEventHandler(async (event) => {
    const { rapidApiHost, rapidApiKey } = useRuntimeConfig()
    const path = event.path.replace(/^\/api\/streaming-api\//, '')
    const target = new URL(path, 'https://' + rapidApiHost).toString()

    const cacheKey = `api:${hash(target)}`

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
})

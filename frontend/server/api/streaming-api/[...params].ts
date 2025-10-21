export default defineEventHandler((event) => {
    const {rapidApiHost, rapidApiKey}= useRuntimeConfig()
    const path = event.path.replace(/^\/api\/streaming-api\//,'')
    const target = new URL(path, "https://" + rapidApiHost)

    // FIXME: remove response headers starting with x-rapidapi and x-ratelimit
    // as clients should not see this 
    return proxyRequest(event, target.toString(), {
        headers: {
            'x-rapidapi-host': rapidApiHost,
            'x-rapidapi-key': rapidApiKey
        },
    })
})
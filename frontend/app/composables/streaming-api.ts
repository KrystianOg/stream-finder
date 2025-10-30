import { Client, Configuration } from 'streaming-availability'

export const useStreamingSDK = () => {
    const config = useRuntimeConfig()

    const baseUrl = import.meta.server
        ? config.public.baseUrl
        : window.location.origin

    const sdk = new Client(
        new Configuration({
            basePath: `${baseUrl}/api/streaming-api`,
        })
    )

    return sdk
}

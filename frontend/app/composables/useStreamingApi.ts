import {
    Client,
    Configuration,
    type SearchShowsByFiltersRequest,
} from 'streaming-availability'

const useStreamingSDK = () => {
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

export const useStreamingAvailability = () => {
    const sdk = useStreamingSDK()

    const useAsyncGetShow = (id: string | undefined) => {
        if (!id) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Show not found',
            })
        }
        return useAsyncData(() => sdk.showsApi.getShow({ id }))
    }

    const useAsyncSearchShows = (
        key: MaybeRefOrGetter<string>,
        params: Omit<SearchShowsByFiltersRequest, 'country'>
    ) => {
        return useAsyncData(key, () =>
            sdk.showsApi.searchShowsByFilters({
                country: DEFAULT_COUNTRY_CODE,
                ...params,
            })
        )
    }

    return {
        sdk,
        useAsyncGetShow,
        useAsyncSearchShows,
    }
}

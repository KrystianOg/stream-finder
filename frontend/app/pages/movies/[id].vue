<script setup lang="ts">
import { sdk } from '@/utils/streaming-api'

const id = useRoute().params.id as string | undefined

if (!id) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page not found.',
    })
}

const { data: show } = useAsyncData(() =>
    sdk.showsApi.getShow({
        id,
    })
)
</script>
<template>
    <pre>{{ JSON.stringify(show) }}</pre>
    <img :src="show?.imageSet.horizontalPoster?.w1440" />
</template>

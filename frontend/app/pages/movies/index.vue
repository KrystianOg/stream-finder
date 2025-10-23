<script setup lang="ts">
interface SearchParams {
    cursor?: string | undefined
    search?: string | undefined
}
const { cursor, search } = useUrlSearchParams<SearchParams>('history')

const pageTitle = computed(() => {
    return search ? `Search: ${search} - Movies` : 'Browse Movies'
})

const pageDescription = computed(() => {
    if (search) {
        return `Search results for "${search}" - Find where to stream movies online. Check availability across all streaming platforms.`
    }
    return 'Browse and discover movies available for streaming. Find where to watch your favorite films across Netflix, Amazon Prime, Disney+, and more streaming platforms.'
})

useHead(() => ({
    title: pageTitle.value,
}))

useSeoMeta({
    title: pageTitle.value,
    description: pageDescription.value,
    ogTitle: pageTitle.value,
    ogDescription: pageDescription.value,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle.value,
    twitterDescription: pageDescription.value,
    robots: search ? 'noindex, follow' : 'index, follow',
})
</script>
<template>
    <ShowCardGrid
        v-model:cursor="cursor"
        v-model:search="search"
        show-type="movie"
    />
</template>

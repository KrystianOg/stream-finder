<script setup lang="ts">
const id = useRoute().params.id as string | undefined

const { data: show, status } =
    await useStreamingAvailability().useAsyncGetShow(id)

const streamingOptions = computed(
    () => show.value?.streamingOptions?.[DEFAULT_COUNTRY_CODE]
)

const streamingOptionsDescription = computed(() => {
    if (!streamingOptions.value?.length) return 'Not available for streaming'
    return streamingOptions.value.map((v) => v.service).join(', ')
})

const pageTitle = computed(() => {
    if (!show.value) return 'Show Details'
    const year = show.value.releaseYear || show.value.firstAirYear
    return year ? `${show.value.title} (${year})` : show.value.title
})

const pageDescription = computed(() => {
    if (!show.value) return 'View streaming availability and details'
    const overview = show.value.overview || 'No description available'
    const platforms = streamingOptionsDescription.value
    return `${overview.slice(0, 120)}... | Available on: ${platforms}`
})

const ogImage = computed(() => {
    return (
        show.value?.imageSet?.horizontalPoster?.w480 ||
        show.value?.imageSet?.verticalPoster?.w480 ||
        '/default-og-image.png'
    )
})

useHead(() => ({
    title: pageTitle.value,
}))

useSeoMeta({
    title: pageTitle.value,
    description: pageDescription.value,
    ogTitle: pageTitle.value,
    ogDescription: show.value?.overview || pageDescription.value,
    ogImage: ogImage.value,
    ogType: 'video.tv_show',
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle.value,
    twitterDescription: show.value?.overview || pageDescription.value,
    twitterImage: ogImage.value,
})
</script>
<template>
    <ShowDetail v-if="status === 'success' && show" :show />
    <p v-else-if="status === 'pending'">Loading ....</p>
    <p v-else>Some error occured.</p>
</template>

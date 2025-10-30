<script setup lang="ts">
const config = useRuntimeConfig()
useHead({
    title: 'Stream Finder',
    titleTemplate: '%s | Stream Finder',
    htmlAttrs: {
        lang: DEFAULT_COUNTRY_CODE,
    },
    bodyAttrs: {
        class: 'antialiased',
    },
})
useSeoMeta({
    title: 'Stream Finder - Discover Your Favorite Streams',
    description:
        'Find and explore live streams across multiple platforms. Discover content creators, gaming streams, and entertainment in one place.',
    ogTitle: 'Stream Finder - Discover Your Favorite Streams',
    ogDescription:
        'Find and explore live streams across multiple platforms. Discover content creators, gaming streams, and entertainment in one place.',
    ogImage: '/og-image.png',
    ogUrl: config.public.baseUrl,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Stream Finder - Discover Your Favorite Streams',
    twitterDescription:
        'Find and explore live streams across multiple platforms.',
    twitterImage: '/og-image.png',
})
</script>
<template>
    <UApp>
        <Header />
        <UMain>
            <NuxtLayout>
                <NuxtPage />
            </NuxtLayout>
        </UMain>
        <UFooter />
    </UApp>
</template>

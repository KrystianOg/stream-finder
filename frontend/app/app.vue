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
    script: !import.meta.dev
        ? [
              {
                  src: 'https://static.cloudflareinsights.com/beacon.min.js',
                  'data-cf-beacon':
                      '{"token": "bc00d4fde6fa404688e917b8ab6f6c3b"}',
                  defer: true,
              },
          ]
        : [],
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
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>

<script setup lang="ts">
import { contrastingColor } from '#imports'
import type { Show } from 'streaming-availability'

const props = defineProps<Show>()

const streamingOptions = computed(() => {
    const streamingOptions = props.streamingOptions[DEFAULT_COUNTRY_CODE]

    if (!streamingOptions) return

    const uniqueStreamingOptions = uniqBy(
        streamingOptions,
        (item) => item.service.id
    )

    uniqueStreamingOptions.sort((a, b) =>
        a.service.name.localeCompare(b.service.name)
    )

    const overrideColors: Record<string, string> = {
        '#00A8E1': '#0074A0',
    }

    uniqueStreamingOptions.forEach((option) => {
        if (Object.hasOwn(overrideColors, option.service.themeColorCode)) {
            option.service.themeColorCode =
                overrideColors[option.service.themeColorCode]!
        }
    })

    return uniqueStreamingOptions
})

const overview = computed<string>(
    () => props.overview || 'No overview available.'
)

const firstAirYear = computed<string | undefined>(() =>
    props.firstAirYear?.toString()
)

const imageLoaded = ref(false)

const imdbId = computed(() => IMDB_TITLE_URL + props.imdbId)
const rating = computed(() => (props.rating / 10).toFixed(1))
</script>
<template>
    <UCard
        :ui="{ header: 'relative p-0 sm:p-0', body: 'flex-1 border-b-0' }"
        class="flex flex-col"
    >
        <template #header>
            <div class="w-full aspect-video">
                <div
                    v-if="!imageLoaded"
                    class="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-shimmer"
                />

                <LazyNuxtImg
                    v-if="props.imageSet.horizontalBackdrop?.w480"
                    :src="props.imageSet.horizontalBackdrop.w480"
                    alt=""
                    class="w-full h-full object-cover"
                    densities="x1 x2"
                    format="webp"
                    :preload="false"
                    @load="imageLoaded = true"
                />
            </div>
            <ULink
                external
                target="_blank"
                :href="imdbId"
                class="absolute top-2 right-2 flex items-center gap-1"
            >
                <UIcon name="i-lucide-star" />
                {{ rating }}
            </ULink>
        </template>

        <h2 class="text-lg font-semibold">{{ props.title }}</h2>
        <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <time :datetime="firstAirYear">{{ props.firstAirYear }}</time>
            <span v-if="props.genres.length" aria-label="Genres">
                {{ props.genres.map((g) => g.name).join(', ') }}
            </span>
        </div>

        <p class="mt-2 line-clamp-2">{{ overview }}</p>

        <template #footer>
            <nav aria-label="Streaming services">
                <ul class="flex flex-wrap gap-2">
                    <li
                        v-for="{ service, link } in streamingOptions"
                        :key="service.id"
                    >
                        <ULink external target="_blank" :href="link">
                            <UBadge
                                :label="service.name"
                                :style="{
                                    'background-color': service.themeColorCode,
                                    color: contrastingColor(
                                        service.themeColorCode
                                    ),
                                }"
                            />
                        </ULink>
                    </li>
                </ul>
            </nav>

            <NuxtLink
                :to="`/${props.showType === 'movie' ? 'movies' : 'series'}/${props.id}`"
                class="w-full mt-2 rounded-md flex items-center justify-center gap-2 p-2 font-medium border border-slate-800"
            >
                <UIcon name="i-lucide-info" size="20" />

                Wiecej informacji
            </NuxtLink>
        </template>
    </UCard>
</template>

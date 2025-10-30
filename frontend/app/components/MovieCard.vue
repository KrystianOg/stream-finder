<script setup lang="ts">
import { contrastingColor } from '#imports'
import type { Show } from 'streaming-availability'

const props = defineProps<Show>()

const streamingOptions = computed(() => {
    const streamingOptions = props.streamingOptions[DEFAULT_COUNTRY_CODE]

    if (!streamingOptions) return

    return uniqBy(streamingOptions, (item) => item.service.id)
})

const overview = computed<string>(
    () => props.overview || 'No overview available.'
)

const firstAirYear = computed<string | undefined>(() =>
    props.firstAirYear?.toString()
)

const imdbId = computed(() => IMDB_TITLE_URL + props.imdbId)
const rating = computed(() => (props.rating / 10).toFixed(1))
</script>
<template>
    <UCard
        :ui="{ header: 'relative p-0 sm:p-0', body: 'flex-1 border-b-0' }"
        class="flex flex-col"
    >
        <template #header>
            <!-- TODO: there's potential optimization for lower resolutions -->
            <img
                :src="props.imageSet.horizontalPoster.w1440"
                :alt="`${$props.title} poster`"
            />
            <ULink
                external
                target="_blank"
                :href="imdbId"
                class="absolute top-2 right-2 flex items-center gap-1"
            >
                <UIcon name="i-lucide-star" />
                {{ rating }}
            </ULink>
            <div></div>
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

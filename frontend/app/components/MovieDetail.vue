<script setup lang="ts">
import { useStreamingSDK } from '~/composables/streaming-api'

const { id } = defineProps<{ id: string }>()

const sdk = useStreamingSDK()
const { data: show } = await useAsyncData(() =>
    sdk.showsApi.getShow({
        id,
    })
)

const yearRange = computed(() => {
    if (!show.value) return ''
    if (show.value.showType === 'movie') {
        return show.value.firstAirYear
    }
    if (show.value.firstAirYear === show.value.lastAirYear) {
        return show.value.firstAirYear
    }
    return `${show.value.firstAirYear} - ${show.value.lastAirYear}`
})

const episodeInfo = computed(() => {
    if (!show.value || show.value.showType === 'movie') return ''
    return `${show.value.seasonCount} ${show.value.seasonCount === 1 ? 'Season' : 'Seasons'} - ${show.value.episodeCount} Episodes`
})
</script>
<template>
    <div v-if="show" class="relative">
        <!-- Hero Section with Backdrop -->
        <div class="relative h-[60vh] min-h-[400px] overflow-hidden">
            <!-- Background Image -->
            <div class="absolute inset-0">
                <img
                    :src="
                        show.imageSet.horizontalPoster?.w1440 ||
                        show.imageSet.verticalPoster?.w480
                    "
                    :alt="show.title"
                    class="w-full h-full object-cover"
                />
                <!-- Gradient Overlay -->
                <div
                    class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent"
                />
                <div
                    class="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/50 to-transparent"
                />
            </div>

            <!-- Content -->
            <div
                class="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12"
            >
                <div class="flex flex-col md:flex-row gap-6 items-end">
                    <!-- Poster -->
                    <img
                        :src="show.imageSet.verticalPoster?.w360"
                        :alt="show.title"
                        class="w-48 h-72 object-cover rounded-lg shadow-2xl hidden md:block"
                    />

                    <!-- Title and Meta -->
                    <div class="flex-1">
                        <h1
                            class="text-4xl md:text-5xl font-bold text-white mb-2"
                        >
                            {{ show.title }}
                        </h1>
                        <p
                            v-if="show.originalTitle !== show.title"
                            class="text-lg text-gray-300 mb-3"
                        >
                            {{ show.originalTitle }}
                        </p>
                        <div
                            class="flex flex-wrap items-center gap-3 text-sm text-gray-300"
                        >
                            <span>{{ yearRange }}</span>
                            <span v-if="episodeInfo">•</span>
                            <span v-if="episodeInfo">{{ episodeInfo }}</span>
                            <span v-if="show.rating">•</span>
                            <div
                                v-if="show.rating"
                                class="flex items-center gap-1"
                            >
                                <UIcon
                                    name="i-heroicons-star-solid"
                                    class="text-yellow-400"
                                />
                                <span class="font-semibold"
                                    >{{ show.rating }}%</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Genres -->
            <div class="flex flex-wrap gap-2 mb-6">
                <UBadge
                    v-for="genre in show.genres"
                    :key="genre.id"
                    variant="subtle"
                    size="lg"
                >
                    {{ genre.name }}
                </UBadge>
            </div>

            <!-- Overview -->
            <div class="mb-8">
                <h2 class="text-2xl font-semibold mb-3">Overview</h2>
                <p class="text-lg text-gray-300 leading-relaxed">
                    {{ show.overview }}
                </p>
            </div>

            <div class="grid md:grid-cols-2 gap-8">
                <!-- Cast -->
                <div v-if="show.cast?.length">
                    <h2 class="text-2xl font-semibold mb-4">Cast</h2>
                    <div class="flex flex-wrap gap-2">
                        <UBadge
                            v-for="actor in show.cast"
                            :key="actor"
                            color="neutral"
                            variant="soft"
                        >
                            {{ actor }}
                        </UBadge>
                    </div>
                </div>

                <!-- Creators -->
                <div v-if="show.creators?.length">
                    <h2 class="text-2xl font-semibold mb-4">Creators</h2>
                    <div class="flex flex-wrap gap-2">
                        <UBadge
                            v-for="creator in show.creators"
                            :key="creator"
                            color="neutral"
                            variant="soft"
                        >
                            {{ creator }}
                        </UBadge>
                    </div>
                </div>
            </div>

            <!-- Additional Info -->
            <div class="mt-8 p-6 bg-gray-900/50 rounded-lg">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div v-if="show.imdbId">
                        <div class="text-gray-400 text-sm mb-1">IMDb ID</div>
                        <a
                            :href="`https://www.imdb.com/title/${show.imdbId}`"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-blue-400 hover:text-blue-300 font-mono"
                        >
                            {{ show.imdbId }}
                        </a>
                    </div>
                    <div v-if="show.showType === 'series' && show.seasonCount">
                        <div class="text-gray-400 text-sm mb-1">Seasons</div>
                        <div class="text-xl font-semibold">
                            {{ show.seasonCount }}
                        </div>
                    </div>
                    <div v-if="show.showType === 'series' && show.episodeCount">
                        <div class="text-gray-400 text-sm mb-1">Episodes</div>
                        <div class="text-xl font-semibold">
                            {{ show.episodeCount }}
                        </div>
                    </div>
                    <div v-if="show.rating">
                        <div class="text-gray-400 text-sm mb-1">Rating</div>
                        <div class="text-xl font-semibold">
                            {{ show.rating }}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

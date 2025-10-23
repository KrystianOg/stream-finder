<script setup lang="ts">
import type { SearchShowsByFiltersRequest } from 'streaming-availability'

type ShowCardGridProps = Pick<SearchShowsByFiltersRequest, 'showType'>

const { showType } = defineProps<ShowCardGridProps>()
const search = defineModel<string | undefined>('search')
const cursor = defineModel<string | undefined>('cursor')

const key = computed(
    () => `${showType}-${cursor.value || 'initial'}-${search.value}`
)

const { data } = await useStreamingAvailability().useAsyncSearchShows(key, {
    showType: showType,
    orderBy: search.value ? 'popularity_alltime' : 'popularity_1month',
    cursor: cursor.value,
    keyword: search.value,
})

const shows = computed(() => data.value?.shows)

watch(
    () => [showType, cursor],
    () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
)
</script>
<template>
    <UInput
        v-model="search"
        icon="i-lucide-search"
        size="md"
        variant="outline"
        placeholder="Search..."
        class="my-4 w-full md:w-1/2"
    />
    <UPageGrid>
        <ShowCard v-for="show in shows" :key="show.id" v-bind="show" />
    </UPageGrid>
    <UButton
        v-if="data?.nextCursor"
        class="mt-6 bg-transparent border border-primary text-white w-full md:w-1/2 inline-block"
        @click="cursor = data?.nextCursor"
    >
        Next page
    </UButton>
</template>

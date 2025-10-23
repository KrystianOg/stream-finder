<script lang="ts">
import type { SearchShowsByFiltersRequest } from 'streaming-availability'
import { useStreamingSDK } from '~/composables/streaming-api'
interface SearchParams {
    cursor?: string | undefined
    search?: string | undefined
}
</script>
<script setup lang="ts">
type ShowCardGridProps = Pick<SearchShowsByFiltersRequest, 'showType'>

const props = defineProps<ShowCardGridProps>()
const params = useUrlSearchParams<SearchParams>('history')
const sdk = useStreamingSDK()

const key = computed(
    () => `${props.showType}-${params.cursor || 'initial'}-${params.search}`
)

const { data } = await useAsyncData(key, () =>
    sdk.showsApi.searchShowsByFilters({
        country: DEFAULT_COUNTRY_CODE,
        showType: props.showType,
        orderBy: params.search ? 'popularity_alltime' : 'popularity_1month',
        cursor: params.cursor,
        keyword: params.search,
    })
)

const shows = computed(() => data.value?.shows)

watch(
    () => [props.showType, params.cursor],
    () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
)
</script>
<template>
    <UInput
        v-model="params.search"
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
        @click="params.cursor = data?.nextCursor"
    >
        Next page
    </UButton>
</template>

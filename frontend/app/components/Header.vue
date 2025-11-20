<script setup lang="ts">
const route = useRoute()

const items = computed(() => [
    {
        label: 'Filmy',
        to: '/movies',
        active: route.path.startsWith('/movies'),
    },
    {
        label: 'Seriale',
        to: '/series',
        active: route.path.startsWith('/series'),
    },
])
</script>
<template>
    <UHeader title="StreamFinder">
        <UNavigationMenu :items="items" variant="link" />

        <template #right>
            <UColorModeButton />

            <UButton
                color="neutral"
                variant="ghost"
                to="https://github.com/KrystianOg/stream-finder"
                target="_blank"
                icon="i-simple-icons-github"
                aria-label="Github"
            />
        </template>
    </UHeader>
</template>

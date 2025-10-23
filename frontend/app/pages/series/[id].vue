<script setup lang="ts">
const id = useRoute().params.id as string | undefined

if (!id) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Series not found.',
    })
}
</script>
<template>
    <ShowDetail :id />
</template>

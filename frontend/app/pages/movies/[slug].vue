<script setup lang="ts">
import { sdk } from '@/utils/streaming-api'

const { data } = useAsyncData(
    () =>
        sdk.countriesApi.getCountryRaw({
            countryCode: 'pl',
        }),
    { server: false }
)
</script>
<template>
    <main></main>
</template>
<style lang="css"></style>

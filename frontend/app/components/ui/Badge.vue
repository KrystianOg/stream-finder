<script setup lang="ts">
import type { BadgeProps } from '@nuxt/ui'

const props = defineProps<BadgeProps>()
</script>
<template>
    <UBadge v-bind="props" />
</template>

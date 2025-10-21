<script setup lang="ts">
import type { AvatarProps } from '@nuxt/ui'

const props = defineProps<AvatarProps>()
</script>
<template>
    <UAvatar v-bind="props" />
</template>

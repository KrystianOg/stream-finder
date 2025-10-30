<script lang="ts">
import type {
    HorizontalImage,
    ShowImageSet,
    VerticalImage,
} from 'streaming-availability'

interface SAImageProps {
    loading?: 'lazy' | 'eager'
    sizes?: string
    imageSet: ShowImageSet
    imageType?:
        | 'verticalPoster'
        | 'horizontalPoster'
        | 'verticalBackdrop'
        | 'horizontalBackdrop'
}
</script>
<script setup lang="ts">
const {
    imageSet,
    loading = 'lazy',
    imageType = 'horizontalPoster',
    sizes,
} = defineProps<SAImageProps>()

const getImageData = () => {
    const image = imageSet[imageType]

    if (!image) {
        return {
            image: imageSet.verticalPoster,
            isHorizontal: false,
        }
    }
    const isHorizontal = imageType.includes('horizontal')
    return { image, isHorizontal }
}

const { image, isHorizontal } = getImageData()

const srcset = computed(() => {
    if (isHorizontal) {
        const img = image as HorizontalImage
        return `${img.w360} 360w, ${img.w480} 480w, ${img.w720} 720w, ${img.w1080}, ${img.w1440} 1440w`
    } else {
        const img = image as VerticalImage
        return `${img.w240} 240w, ${img.w360} 360w, ${img.w480} 480w, ${img.w600} 600w, ${img.w720} 720w`
    }
})

const defaultSizes = computed(() => {
    if (sizes) return sizes

    if (isHorizontal) {
        // Horizontal images (16:9 aspect ratio typically)
        return '(min-width: 1440px) 1440px, (min-width: 1080px) 1080px, (min-width: 720px) 720px, (min-width: 480px) 480px, 360px'
    } else {
        // Vertical images (2:3 aspect ratio typically)
        return '(min-width: 720px) 720px, (min-width: 600px) 600px, (min-width: 480px) 480px, (min-width: 360px) 360px, 240px'
    }
})

// Use smallest image as src fallback
const src = computed(() => {
    return isHorizontal
        ? (image as HorizontalImage).w360
        : (image as VerticalImage).w240
})
</script>
<template>
    <img :src :srcset :sizes="defaultSizes" :loading decoding="async" />
</template>

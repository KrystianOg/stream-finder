<script setup lang="ts"></script>
<template>
    <UHeader title="StreamFinder">
        <nav>
            <ul>
                <li>
                    <a>Filmy</a>
                </li>
                <li>
                    <a>Seriale</a>
                </li>
                <li>
                    <a>Lista życzeń</a>
                </li>
            </ul>
        </nav>

        <template #right>
            <UColorModeButton />

            <UTooltip text="TODO:" :kbds="['meta', 'G']">
                <UButton
                    color="neutral"
                    variant="ghost"
                    target="_blank"
                    icon="i-simgple-icons-github"
                    aria-label="Github"
                />
            </UTooltip>
        </template>
    </UHeader>
</template>

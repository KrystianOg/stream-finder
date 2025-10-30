// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default withNuxt(prettierConfig, {
    plugins: {
        prettier: prettierPlugin,
    },
    rules: {
        'prettier/prettier': 'warn',
        'vue/multi-word-component-names': 'off',
        'vue/no-multiple-template-root': 'off',
    },
})

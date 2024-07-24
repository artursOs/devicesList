module.exports = {
  tailwindConfig: './tailwind.config.js',
  arrowParens: 'avoid',
  trailingComma: 'none',
  tabWidth: 2,
  printWidth: 100,
  semi: false,
  singleQuote: true,
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss' // MUST come last
  ],
  pluginSearchDirs: false,
  importOrder: [
    '<TYPES>',
    '^@/openApi/(.*)$',
    '^@/types/(.*)$',
    '^@/assets/(.*)$',
    '^interfaces/(.*)$',
    '^next/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@/api/(.*)$',
    '^@/config/(.*)$',
    '^@/i18n/(.*)$',
    '^@/const/(.*)$',
    '^@/lib/(.*)$',
    '^@/hooks/(.*)$',
    '^@/components/(.*)$',
    '^@/markups/(.*)$',
    '^@/app/(.*)$',
    '^components/(.*)$',
    '^(?!.*[.]scss$)[./].*$',
    '^theme/(.*)$',
    '.(s)css$'
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: false
}

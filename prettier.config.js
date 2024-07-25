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
    '^@/types/(.*)$',
    '^@/assets/(.*)$',
    '^next/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@/api/(.*)$',
    '^@/config/(.*)$',
    '^@/lib/(.*)$',
    '^@/hooks/(.*)$',
    '^@/components/(.*)$',
    '^@/app/(.*)$',
    '^components/(.*)$'
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: false
}

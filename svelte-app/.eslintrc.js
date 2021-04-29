module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },
  plugins: [
    'svelte3'
  ],
  ignorePatterns: [
    'public/build/'
  ],
  overrides: [
    {
      files: [ '**/*.svelte' ],
      processor: 'svelte3/svelte3'
    }
  ],
  extends: [
    'eslint:recommended'
  ],
  rules: {
    semi: [ 'error', 'never' ], // remove ;
    quotes: [ 'error', 'single' ], // " -> '
    indent: [ 'error', 2, // 2 spaces indent
      { 'SwitchCase': 1 } ],
    'object-curly-spacing': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ]
  }
}
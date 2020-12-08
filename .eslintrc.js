const DOMGlobals = ['window', 'document']
const NodeGlobals = ['module', 'require']

module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'react-app',
        'react-app/jest',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:cypress/recommended',
        // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    rules: {
        'no-unused-vars': [
            'error',
            // we are only using this rule to check for unused arguments since TS
            // catches unused variables but not args.
            { varsIgnorePattern: '.*', args: 'none' },
        ],
        // most of the codebase are expected to be env agnostic
        'no-restricted-globals': ['error', ...DOMGlobals, ...NodeGlobals],
    },
    overrides: [
        // tests, no restrictions (runs in Node / jest with jsdom)
        {
            files: ['**/__tests__/**', 'test-dts/**', './*.js', 'cypress/**'],
            rules: {
                'no-restricted-globals': 'off',
            },
        },
        // services targeting DOM
        {
            files: ['services/{web, admin}/**'],
            rules: {
                'no-restricted-globals': ['error', ...NodeGlobals],
            },
        },
        // services targeting NodeJS
        {
            files: ['scripts/**'],
            rules: {
                'no-restricted-globals': ['error', ...DOMGlobals],
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],
}

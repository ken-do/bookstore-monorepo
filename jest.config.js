module.exports = {
    preset: 'ts-jest',
    globals: {
        __DEV__: true,
        __TEST__: true,
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        __VERSION__: require('./package.json').version,
        __BROWSER__: false,
        __GLOBAL__: false,
        __ESM_BUNDLER__: true,
        __ESM_BROWSER__: false,
        __NODE_JS__: true,
        __FEATURE_OPTIONS_API__: true,
        __FEATURE_SUSPENSE__: true,
        __FEATURE_PROD_DEVTOOLS__: false,
    },
    coverageDirectory: 'coverage',
    coverageReporters: ['html', 'lcov', 'text'],
    collectCoverageFrom: ['services/*/src/**/*.ts'],
    watchPathIgnorePatterns: ['/node_modules/', '/build/', '/.git/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    moduleNameMapper: {
        '^@bookstore/(.*?)$': '<rootDir>/services/$1/src',
    },
    rootDir: __dirname,
    testMatch: ['<rootDir>/services/**/src/**/*test.[jt]s?(x)'],
    testPathIgnorePatterns: ['/node_modules/'],
}

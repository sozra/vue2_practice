module.exports = {
    moduleFileExtensions: ['js', 'json', 'vue'],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.js$': 'babel-jest',
        // ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
    },
    modulePaths: ['<rootDir>/node_modules', '<rootDir>'],
    moduleNameMapper: {
        '^element-ui(.*)$': '<rootDir>/node_modules/element-ui/lib/$1',
        // '^element-ui$': '<rootDir>/node_modules/element-ui/lib/$1',
        '^@/(.*)$': '<rootDir>/src/$1',
        // "\\.(css|less)$": "identity-obj-proxy",
    },
    testMatch: [
        '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
    ],
    //   snapshotSerializers: ['jest-serializer-vue'],
    //   testURL: 'http://localhost/'
    setupFiles: ['<rootDir>/tests/setup.js'],
    testEnvironment : 'jsdom',
    testEnvironmentOptions: {
        url: 'http://localhost',
    }
}
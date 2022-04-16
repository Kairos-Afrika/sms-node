import type { Config } from '@jest/types';
const config: Config.InitialOptions = {
    preset: 'ts-jest',
    verbose: true,
    transform: {
        'node_modules/variables/.+\\.(j|t)sx?$': 'ts-jest',
    },
    testRegex: "(/__tests__/ .*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
    testTimeout: 30000,
};

export default config;
const tailwindcss       = require('tailwindcss');
const postcssPresetEnv  = require('postcss-preset-env');

module.exports = {
    plugins: [
        tailwindcss,
        postcssPresetEnv({
            stage: 1,
            features: {
                'is-pseudo-class': false,
            },
        }),
    ],
};
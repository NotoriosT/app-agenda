// babel.config.js
module.exports = function(api) {
    api.cache(true);
    return {
        presets: [
            'babel-preset-expo'
        ],
        // se mesmo com Hermes você ainda tiver código legacy usando `?.`,
        // descomente o plugin abaixo:
        // plugins: ['@babel/plugin-proposal-optional-chaining'],
    };
};

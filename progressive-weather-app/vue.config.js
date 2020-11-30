module.exports = {
    publicPath: '/',
    configureWebpack: {
        optimization: {
          splitChunks: false
        },
        output: {
            filename: 'js/minifiedscript.js'
        }
    },
    css: {
        extract: false,
    },
    pwa: {
        themeColor: '#6CB9C8',
        msTileColor: '#484F60'
    }
}

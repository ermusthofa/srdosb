module.exports = {
    publicPath: '/',
    configureWebpack: {
        optimization: {
          splitChunks: false
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

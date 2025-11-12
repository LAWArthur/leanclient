const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    outputDir: 'dist/public',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8081',
                changeOrigin: true
                // pathRewrite: { '^/api': '' }
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
});
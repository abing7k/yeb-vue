const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            "": {
                target: "http://yeb.hanbing777.top",
                PathRewrite: {"^/": ""},
                changeOrigin: true,
                ws: false
            }
        }
    }

})

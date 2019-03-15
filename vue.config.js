const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}

/**
 * @description 配置Svg
 */
function addSvgConfig(config) {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
        .test(/\.svg$/)
        .include.add(resolve('./examples/icon'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
            // symbolId: 'icon-[name]'
        })
}

/**
 * 使package加入编译
 */
function addPackageConfig(config) {
    return config.module
        .rule('js')
        .include.add(resolve('./packages'))
        .end()
        .use('babel')
        .loader('babel-loader')
        .tap(options => {
            // 修改它的选项...
            return options
        })
}

/**
 * 移除eslint
 */
function removeEslint(config) {
    return config.module.rules.delete('eslint')
}

module.exports = {
    //将example目录添加为新的页面
    pages: {
        index: {
            //page入口
            entry: 'examples/main.js',
            //模板来源
            template: 'public/index.html',
            //输出文件
            filename: 'index.html'
        }
    },
    chainWebpack: config => {
        addSvgConfig(config)
        addPackageConfig(config)
        //移除eslint检查
        removeEslint(config)
    },
    css: {
        extract: true, //true在生产中，false在开发中(true开启样式分离,false导致骨架屏样式失效)
        // sourceMap:sourceMapEnabled
        sourceMap: false, //是否为css启用源映射，将此设置为true可能会影响构建性能
        modules: false, //启用css modules
        loaderOptions: {
            // css:{},
            postcss: {
                plugins: [
                    require('autoprefixer'),
                    require('postcss-px2rem')({ remUnit: 75, baseDpr: 2 }) // 换算的基数
                ]
            },
            sass: {
                ////设置css中引用文件的路径，引入通用使用的scss文件（如包含的@mixin）
                // data: `@import "@/assets/scss/vant.scss";`
            }
        }
    },
    publicPath: '/',
    outputDir: 'dist',
    lintOnSave: true,
    productionSourceMap: false,
    devServer: {
        open: true, //开启服务后是否打开浏览器
        host: '0.0.0.0',
        port: 6000,
        https: false,
        hotOnly: false,
        proxy: null //设置代理
    }
}

## 环境

+ node 
    - 设置npm config 参照  http://61.129.128.226:4873
+ ruby
    - gen install sass
    - gen install compass
+ 拉代码
+ 代码根目录下执行 npm i 安装依赖项
+ npm run build 执行打包
+ npm run dev 打开开发环境 
    http://localhost:6001 是当前启动的开环境
    http://localhost:6001/webpack-dev-server 可以看到所有运行时的html文件。

## 基础JS库
+ require('emf') 操作DOM的，zepto + template + loader 
+ require('emf/src/js/util/util-nativepi') 原生交互，文档待定。。。

cnpm i eslint eslint-loader file-loader node-noop  node-sass optimize-css-assets-webpack-plugin  raw-loader resolve-url-loader sass-loader url-loader vue-loader vue-style-loader vue-template-compiler webpack-bundle-analyzer -D
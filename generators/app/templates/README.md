
PPSIMPLE
=========================

[![npm version](https://badge.fury.io/js/ppsimple.svg)](https://badge.fury.io/js/ppsimple)

简单前端构建打包工作，适用于JS、CSS、IMG的构建，同时支持VUE的构建。

## 特性
- 基于webpack打包JS、CSS、IMG
- 调试、构建VUE
- 热加载，无需刷新页面，改动即反应到前端

## 上手
### 1、下载
从github上下载**ppsimle**的[最新版本](https://github.com/aheroaa/ppsimple/archive/master.zip)并解压到项目中的pack目录；
### 2、安装依赖
```
    npm install
```
### 3、修改配置
**input/index.conf.js**
```
  {
  "root"  :  "../../",      // 项目根路径相对于当前文件的路径
  "src"   :  "src",         // src目录
  "dist"  :  "dist",        // dist目录，最终src里的文件会构建到此目录中
  "asset" :  "dist"         // asset目录
  }
```
**config/index.js**
port表示调试模式时运行的端口，默认为6001，执行__npm run dev__后访问[localhost:6001](http://localhost:6001)即可访问站点
### 4、命令
```
npm run dev
```
调试代码，会自动打开浏览器，运行您的构建的项目，如果项目是运行于**IIS**、**Tomcat**等其它服务器上面，可手动引用 [http://localhost:[port]/[entry].js]，也能实现无刷新自动加载变动。
```
npm run build
```
打包代码

## 更新记录

[CHANGELOG_CN.md](./CHANGELOG.md)

## License

The MIT License (http://opensource.org/licenses/MIT)
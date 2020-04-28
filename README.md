# H5Project

## 介绍

H5Project，新界面，新体验。

一些说明在[Gitee Pages](http://mintotea.gitee.io/h5project/)

### 软件架构

#### 当前已应用

NodeJs,React,React-Router,antd, DvaJs,Electron,Echarts,react-intl-universal

### 使用

设计分辨率：1280*800

1. 下载NodeJs，下载地址[Nodejs](http://nodejs.cn/)，12.14版本即可；
2. 推荐使用IDE：VSCode，下载地址[Visual Studio Code](https://code.visualstudio.com/)，原因：免费，轻量级，丰富扩展。

打开项目方法：

1. 安装NodeJs、VSCode；
2. git下载`git clone https://gitee.com/mintotea/H5Project.git`使用ssh方式需在码云加入自己的公钥。
3. 进入项目主目录；
4. 右键，选择Visual Studio Code打开。

#### 安装教程

##### 推荐yarn

推荐使用yarn来安装依赖！

1. 全局安装yarn`npm install yarn@latest -g`
2. 安装依赖`yarn`

##### 使用npm

1. 在主目录内通过终端执行`npm install`来安装所需依赖；
2. 执行`npm start`或`npm run start`，在localhost:3000即可预览；
3. 执行`npm build`或`npm run build`，编译程序。

#### 脚本

+ `start`启动调试服务器，并打开项目
+ `build`打包H5项目网站到build目录
+ `electron`在软件中查看效果
+ `ele-build-pc-x86`编译32位版本的PC版程序
+ `ele-build-pc-x64`编译64位版本的PC版程序
+ `ele-build-linux-x86`编译32位版本的Linux版程序
+ `ele-build-linux-ARM64`编译ARM64位版本的Linux版程序
+ `test`测试

##### VSCode直接执行

在VSCode左侧的自带脚本中，直接点击对应的箭头即可直接运行。

### 目录说明

| 文件/目录 | 注释 |
| ----- | ----- |
| package.json | 依赖目录，不需手动修改，yarn add时自动添加 |
| src | 资源主目录 |
| src/index.js | 用来加载组件到public/index.html的root内 |
| src/App.js | 整体框架，被加载到router.js中 |
| src/router.js | 路由，用来跳转中间主要内容区的内容，在index.js中被加载到index.html的root容器 |
| src/model | Dva用到的model |
| src/component/ | 整体框架的组件目录 |
| src/component/header | 头部状态栏，被加载到App.js中，index.js是容器，其它文件是各个组件 |
| src/component/leftstate | 左侧分屏的状态查看，被加载到App.js中 |
| src/component/rightbutton | 右侧按钮，被加载到App.js中 |
| src/component/footer | 底部按钮，被加载到App.js中，index.js是容器，其它文件是各个组件 |
| src/component/paraframe | 按下右下角按钮跳出的窗口，被加载到footer/index.js中 |
| src/layout | 页面保存目录 |
| src/layout/state | 左侧状态栏中各个界面 |
| src/layout/pages | 中间主要界面的各个页面，在router.js中路由 |
| src/service/network | 与Server端通讯的函数 |
| src/service/commandlist | 与Server端通讯的命令字 |
| src/model | dva存储全局状态的models |
| src/locales | 多语言翻译文件 |
| src/font | 字体 |
| document | Hexo blog，具体撰写方式参考[文档](https://hexo.io/zh-cn/docs/index.html) |
| public | 网页目录，没有必要无需修改 |
| public/index.html | 仅用来加载，没有必要修改 |
| public/favicon.ico | 图标 |
| electron-zip | 编译PC版软件的依赖 |

### 注意事项

1. 所有字符串需要用`intl.get()`包起来；
2. 尽量使用react hooks做组件；

### 下一步工作

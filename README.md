# autojs_dev_tool

这是一个辅助开发 autojs 脚本的工具，用电脑开发脚本并自动传送到手机上，方便脚本的开发。通过在开发脚本的电脑上运行服务器端，在autojs客户端的手机上运行 autojs_dev_tool.js 脚本实现客户端。每次电脑上的文件发生变更后， 在1秒后并会同步（覆盖）到手机中。

## 使用方式

### 服务器端

1. 建立项目文件夹, 如aaa
2. 通过 yarn init 初始化项目
3. 通过 yarn add 安装 tgz 文件
4. 建立 src 文件夹 在 aaa 文件夹中
5. 通过 yarn autojsserver src 激活对 src 文件夹的监控

### 手机端

1. 下载 autojs_dev_tool.js 脚本
2. 运行 autojs_dev_tool.js 脚本
3. 便会自动同步服务器端的 src 文件夹的内容到手机上


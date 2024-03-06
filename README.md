# electron-quickly-start

## 安装

下载/初始化项目模版

```bash
npm create eqs-cli@latest init
```

## 运行

```bash
# 安装 pnpm
npm i pnpm -g
# 安装依赖
pnpm i
```

打开两个终端分别启动 vue 和 electron

> 注意，如果是 Mac 或者 Ubuntu 启动时需要在 packages/app/packages.json 文件里吧 scripts 字段里的 dev 字段
> 改成 `"tsc && electron ."` 删除掉 `chcp 65001` 命令，这个命令是用于在 windows 中运行的，防止 electron 的 console 输出乱码。

先启动 vue 项目

```bash
npm run dev:web
```

再启动 electron 项目

```bash
npm run dev:app
```

## 打包

```bash
npm run build
```

## 发布

```bash
npm run release
```

## 替换项目占位符以及变量等可修改内容

替换 packages/app/electron.builder.json 里的 `appId` 为自己的项目域名，例如 electron.baidu.com ， 以及 `copyright` 。

修改 scripts/release.sh 里的 37 行分支名，如果提交分支是默认的 main 则无需修改。

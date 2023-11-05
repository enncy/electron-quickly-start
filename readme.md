# electron-quickly-start

## 运行

```bash
# 安装 pnpm
npm i pnpm -g
# 安装依赖
pnpm i
```

打开两个终端分别启动 vue 和 electron

```bash
cd ./packages/web
npm run dev
```

```bash
cd ./packages/app
npm run dev
```

## 打包

```bash
npm run build
```

## 发布

```bash
npm run release
```

## 替换项目占位符

全局搜索: `example-name` ， 英文项目名

全局搜索: `https://github.com/enncy/electron-quickly-start` ， 项目 git 地址

替换 packages/app/electron.builder.json 里的 appId 为自己的。

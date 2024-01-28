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
npm run dev:web
```

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
 

替换 packages/app/electron.builder.json 里的 appId 为自己的项目域名，例如  electron.baidu.com 。

修改 scripts/release.sh 里的 37 行分支名，如果提交分支是默认的 main 则无需修改。

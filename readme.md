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

## 替换项目占位符以及变量等可修改内容

全局搜索: `example-name` ， 英文项目名

全局搜索: `{electron-app-git-url}` ， 改成自己的项目 git 地址，如果没有则可无视
 
替换 packages/app/electron.builder.json 里的 appId 为自己的。

修改 scripts/release.sh 里的 37 行分支名，如果提交分支是默认的 main 则无需修改。

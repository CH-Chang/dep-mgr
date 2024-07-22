# 🔄 dep-mgr 依賴包管理器

![License](https://img.shields.io/github/license/CH-Chang/dep-mgr)
![Github last commit (branch)](https://img.shields.io/github/last-commit/CH-Chang/dep-mgr/main)
![npm](https://img.shields.io/npm/v/%40dep-mgr%2Fcli)
![npm download](https://img.shields.io/npm/dt/%40dep-mgr/cli)

[English](README_EN.md) | 繁體中文 | [简体中文](README_ZH_CN.md)

---

## "dep-mgr 依賴包管理器" 是什麼？

"dep-mgr 依賴包管理器" 提供下列兩項功能

- 根據 npm/pnpm/yarn lockfile 至指定 registry 下載相關依賴套件
- 將指定目錄內的所有依賴包推送至指定 registry

透過上述兩項功能，可將專案所需要的所有依賴包下載至本地，並重新推送至指定的私人 registry，以讓僅能存取特定 registry 的包版機器能夠正常下載專案所需的依賴套件。

## 依賴要求

- Node.js ^18.16.0

## 安裝方法

```bash
npm i -g @dep-mgr/cli
```

## 使用方法

- 根據專案 lockfile 下載依賴套件

  ```bash
  dep-mgr download -h

  # Usage: dep-mgr-download [options]
  #
  # Options:
  #   -r, --registry <string>  Specific download packages from which registry
  #   -o, --outDir <string>    Specific download packages to which directory
  #   -d, --depMgr <string>    Specific current project use which dependency manager
  #   -h, --help               display help for command
  ```

- 推送指定目錄依賴包至指定 registry

  ```bash
  dep-mgr publish -h

  # Usage: dep-mgr-publish [options]
  #
  # Options:
  #   -r, --registry <string>  Specific publish packages to which registry
  #   -o, --pkgDir <string>    Specific publish packages directory
  #   -h, --help               display help for command
  ```

## 貢獻我們

我們歡迎您為倉庫做出貢獻，相關貢獻方式及規範詳見[CONTRIBUTING](CONTRIBUTING.md)

## 版權聲明

dep-mgr 依賴包管理器 基於 MIT 授權，授權內容詳見[LICENSE](LICENSE)

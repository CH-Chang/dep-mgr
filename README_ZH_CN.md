# 🔄 dep-mgr 依赖包管理器

![License](https://img.shields.io/github/license/CH-Chang/dep-mgr)
![Github last commit (branch)](https://img.shields.io/github/last-commit/CH-Chang/dep-mgr/main)

[English](README_EN.md) | [繁体中文](README.md) | 简体中文

---

## "dep-mgr 依赖包管理器" 是什麽？

"dep-mgr 依赖包管理器" 提供下列两项功能

- 根据 pnpm lockfile 至指定 registry 下载相关依赖套件
- 将指定目录内的所有依赖包推送至指定 registry

透过上述两项功能，可将专案所需要的所有依赖包下载至本地，并重新推送至指定的私人 registry，以让仅能存取特定 registry 的包版机器能够正常下载专案所需的依赖套件。

## 依赖要求

- Node.js ^18.16.0

## 安装方法

```bash
npm i -g @dep-mgr/cli
```

## 使用方法

- 根据专案 lockfile 下载依赖套件

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

- 推送指定目录依赖包至指定 registry

```bash
dep-mgr publish -h

# Usage: dep-mgr-publish [options]
#
# Options:
#   -r, --registry <string>  Specific download packages from which registry
#   -o, --pkgDir <string>    Specific publish packages directory
#   -h, --help               display help for command
```

## 版权声明

dep-mgr 依赖包管理器 基于 MIT 授权，授权内容详见[LICENSE](LICENSE)

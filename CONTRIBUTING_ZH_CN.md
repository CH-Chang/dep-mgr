# ❤️ 欢迎您对 dep-mgr 作出贡献

[English](CONTRIBUTING_ZH_CN.md) | [繁體中文](CONTRIBUTING.md) | 简体中文

- 分支命名原则
- Issue 原则
- Pull Request 原则
- 开发方法及原则
- 其他

## 分支命名原则

若您有权限在本仓库创建分支，请您依照下方所列之格式命名您的分支

    [dev/feature/bug]/[您的名称]/[分支目的]

第一部分表示该分支的类别，第二部分指出谁创建了该分支，而最后一部分则指出该分支主要的创建原因。

## Issue 原则

若您以新想法或发现 Bugs，我们非常欢迎您在 Issue 页面发布议题。请分类好议题类别并完成相关议题表单的填写，我们将尽快解决这些问题并将相关变更合併进入主分支。

## Pull Request 原则

若您有新想法或发现 Bugs，且已经有实作成功，欢迎您提出 Pull Request 给我们，请求将您的变更合併进入主分支。请完成 Pull Request 表单的填写并确定您的 Pull Request 标题遵循下方所列之格式

    [dev/fix/docs/style/refactor/perf/test/build/ci/chore/revert](package name): [your title]

我们会尽快审视您的变更，并在阅览者同意且通过所有状态检查后，完成分支合併。另外，若您的变更会提升相关包的版本，请不要忘记执行 changeset 相关的指令。

## 开发方法及原则

我们建议您使用测试驱动开发模式进行开发—先撰写测试程式码，并逐步完成主要功能，同时验证其结果。如此您可以不必建置整个专案，来验证您撰写的程式码是否正确。

下方列举本专案建置/测试/发布相关指令

- 建置

  ```bash
  # 建置所有包
  pnpm build

  # 建置单一包
  pnpm build-single [定义在 package.json 的包名]

  ```

- 测试

  ```bash
  # 测试所有包
  pnpm run test

  # 测试单一包
  pnpm test-single [定义在 package.json 的包名]
  ```

- 发布

  ```bash
  # Changeset
  pnpm run changeset

  # 版本提升
  pnpm version-packages

  # 登入仓库
  npm adduser --registry [registry url]

  # 发布
  pnpm release
  ```

## 其他

若您有其他问题，欢迎电子邮件给仓库拥有者 <ch.chang.software@gmail.com>

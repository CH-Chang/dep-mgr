# ❤️ 歡迎您對 dep-mgr 作出貢獻

[English](CONTRIBUTING_EN.md) | 繁體中文 | [简体中文](CONTRIBUTING_ZH_CN.md)

- 分支命名原則
- Issue 原則
- Pull Request 原則
- 開發方法及原則
- 其他

## 分支命名原則

若您有權限在本倉庫創建分支，請您依照下方所列之格式命名您的分支

    [dev/feature/bug]/[您的名稱]/[分支目的]

第一部分表示該分支的類別，第二部分指出誰創建了該分支，而最後一部分則指出該分支主要的創建原因。

## Issue 原則

若您以新想法或發現 Bugs，我們非常歡迎您在 Issue 頁面發布議題。請分類好議題類別並完成相關議題表單的填寫，我們將盡快解決這些問題並將相關變更合併進入主分支。

## Pull Request 原則

若您有新想法或發現 Bugs，且已經有實作成功，歡迎您提出 Pull Request 給我們，請求將您的變更合併進入主分支。請完成 Pull Request 表單的填寫並確定您的 Pull Request 標題遵循下方所列之格式

    [dev/fix/docs/style/refactor/perf/test/build/ci/chore/revert](package name): [your title]

我們會盡快審視您的變更，並在閱覽者同意且通過所有狀態檢查後，完成分支合併。另外，若您的變更會提升相關包的版本，請不要忘記執行 changeset 相關的指令。

## 開發方法及原則

我們建議您使用測試驅動開發模式進行開發—先撰寫測試程式碼，並逐步完成主要功能，同時驗證其結果。如此您可以不必建置整個專案，來驗證您撰寫的程式碼是否正確。

下方列舉本專案建置/測試/發布相關指令

- 建置

  ```bash
  # 建置所有包
  pnpm build

  # 建置單一包
  pnpm build-single [定義在 package.json 的包名]
  ```

- 測試

  ```bash
  # 測試所有包
  pnpm test

  # 測試單一包
  pnpm test-single [定義在 package.json 的包名]
  ```

- 發布

  ```bash
  # Changeset
  pnpm run changeset

  # 版本提升
  pnpm version-packages

  # 登入倉庫
  npm adduser --registry [registry url]

  # 發布
  pnpm release
  ```

## 其他

若您有其他問題，歡迎電子郵件給倉庫擁有者 <ch.chang.software@gmail.com>

# ❤️ Welcome to contributing to dep-mgr

- [Branch Naming Principles](#Branch Naming Principles)
- Issue Principles
- Pull Request Principles
- Getting Started
- Others

## Branch Naming Principles

If you have the permission to create branches in this repository, please following the below format.

  [dev/feature/bug]/[your name]/[what do you want to do]

In the first part indicate which category the branch belongs to. In the second part mention who created the branch. Finally mention the reason for creating the branch.

## Issue Principles

If you have new features or find bugs, we welcome you to post them on our issue page! Please create a issue for with right category and complete the issue template. We will as soon as possible to solve it and merge to the main branch then release those changes.

## Pull Request Principles

If you have a new feature or have found a bug and fixed it. Welcome to create a pull request to ask for merge your branch into main branch. Please complete the pull request template and make sure your request title following the below format.

  [dev/fix/docs/style/refactor/perf/test/build/ci/chore/revert](package name): [your title]

We will merge your changes as soon as the reviewer approves them and they pass all action status checks! Also, don't forget to run changeset and upload the changelog results if your changes need to be a package bump.

## Getting Started

We recommend that you follow the Test-Driven Development (TDD) model to develop this project. Write test scripts and step through the code. You can easily validate the code results without building the entire project.

The build/test/release commands for this repository are listed below

- Building

  ```bash
  # Building for all packages
  pnpm build

  # Building for single packages
  pnpm build [the package name defined in package.json]

  ```

- Testing

  ```bash
  # Testing for all packages
  pnpm test

  # Testing for single packages
  pnpm test [the package name defined in package.json]
  ```

- Releasing

  ```bash
  # Changeset
  pnpm run changeset

  # Version bumps
  pnpm version-packages

  # Login to registry
  npm adduser --registry [registry url]

  # Publish
  pnpm release
  ```

## Others

If you have other question, welcome email to the owner of this repository. <ch.chang.software@gmail.com>

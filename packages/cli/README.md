# 🔄 @dep-mgr/cli - dependency package manager

![License](https://img.shields.io/github/license/CH-Chang/dep-mgr)
![Github last commit (branch)](https://img.shields.io/github/last-commit/CH-Chang/dep-mgr/main)

---

## What is "dep-mgr - dependency package manager"?

"dep-mgr - dependency package manager" provides the following two features:

- Download dependency packages according to pnpm lockfile to the specified registry.
- Push all dependency packages from a specified directory to a specified registry.

The above two features allow you to download all the dependency packages needed for your project to local and push them back to a specified private registry, so that package machines that only have access to a specific registry can download the dependencies needed for your project.

## Environment Requirement

- Node.js ^18.16.0

## Installation

```bash
npm i -g @dep-mgr/cli
```

## Usage

- Download dependency packages according to lockfile

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

- publish dependency package from specified directory to specified registry

  ```bash
  dep-mgr publish -h

  # Usage: dep-mgr-publish [options]
  #
  # Options:
  #   -r, --registry <string>  Specific download packages from which registry
  #   -o, --pkgDir <string>    Specific publish packages directory
  #   -h, --help               display help for command
  ```

## Contribution

We are loving to you to contribute to this repository.
See the detail of contribution methods and specification under [CONTRIBUTING](CONTRIBUTING_EN.md)

## License

dep-mgr - dependency package manager Based on MIT license, licensed under [LICENSE](LICENSE)

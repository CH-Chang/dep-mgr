import commander from 'commander'
import { isEmpty, isUndefined, size } from 'lodash'
import { DepMgr, type Package, download } from '@dep-mgr/downloader'
import cliProgress from 'cli-progress'
import chalk from 'chalk'

const RawDepMgrToDepMgrMap: Record<string, DepMgr> = {
  pnpm: DepMgr.Pnpm,
  npm: DepMgr.Npm,
  yarn: DepMgr.Yarn
}

async function main (): Promise<void> {
  commander.program
    .option(
      '-r, --registry <string>',
      'Specific download packages from which registry'
    )
    .option(
      '-o, --outDir <string>',
      'Specific download packages to which directory'
    )
    .option(
      '-d, --depMgr <string>',
      'Specific current project use which dependency manager'
    )

  await commander.program.parseAsync()

  const registry = commander.program.getOptionValue('registry') as
    | string
    | undefined
  const outDir = commander.program.getOptionValue('outDir') as
    | string
    | undefined

  const rawDepMgr = commander.program.getOptionValue('depMgr') as
    | string
    | undefined
  const depMgr = isUndefined(rawDepMgr)
    ? undefined
    : RawDepMgrToDepMgrMap[rawDepMgr]

  const progressBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  )

  const successPackages: Package[] = []
  const failPackages: Package[] = []

  const lockFileParsed = (packagesParam: Package[]): void => {
    const packageCount = size(packagesParam)
    progressBar.start(packageCount, 0)
  }

  const packageDownloadSuccess = (aPackage: Package): void => {
    successPackages.push(aPackage)

    progressBar.increment()
  }

  const packageDownloadFail = (aPackage: Package): void => {
    failPackages.push(aPackage)

    progressBar.increment()
  }

  await download({
    registry,
    depMgr,
    outDir,
    callbacks: {
      lockFileParsed,
      packageDownloadFail,
      packageDownloadSuccess
    }
  })

  progressBar.stop()

  console.log(
    chalk.green(`Download Success with ${size(successPackages)} packages\n`)
  )

  for (const aPackage of successPackages) {
    const { organization, name, version } = aPackage
    console.log(
      chalk.green(
        ` - ${
          isUndefined(organization) ? '' : `@${organization}/`
        }${name}@${version}`
      )
    )
  }

  console.log('\n')

  if (!isEmpty(failPackages)) {
    console.log(
      chalk.red(`Download fail with ${size(failPackages)} packages\n`)
    )

    for (const aPackage of failPackages) {
      const { organization, name, version } = aPackage
      console.log(
        chalk.red(
          ` - ${
            isUndefined(organization) ? '' : `@${organization}/`
          }${name}@${version}`
        )
      )
    }

    console.log('\n')
  }
}

void main()

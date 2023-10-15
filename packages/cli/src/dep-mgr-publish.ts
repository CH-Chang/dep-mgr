import commander from 'commander'
import { isEmpty, isUndefined, size } from 'lodash'
import { type LocalPackage, publish } from '@dep-mgr/publisher'
import cliProgress from 'cli-progress'
import chalk from 'chalk'

async function main (): Promise<void> {
  commander.program
    .option(
      '-r, --registry <string>',
      'Specific download packages from which registry'
    )
    .option('-o, --pkgDir <string>', 'Specific publish packages directory')

  await commander.program.parseAsync()

  const registry = commander.program.getOptionValue('registry') as
    | string
    | undefined
  const pkgDir = commander.program.getOptionValue('pkgDir') as
    | string
    | undefined

  console.log(
    chalk.yellow(
      '\nWARN: SHOULD CONFIG NPM AUTHORIZATION WITH BELOW COMMAND BEFORE PUBLISH\n' +
        '   "npm adduser --registry=[registry]"\n'
    )
  )

  const progressBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  )

  const successPackages: LocalPackage[] = []
  const failPackages: LocalPackage[] = []
  const skipPackages: LocalPackage[] = []

  const pkgDirParsed = (localPackages: LocalPackage[]): void => {
    const localPackageCount = size(localPackages)
    progressBar.start(0, localPackageCount)
  }

  const publishPackageSkipped = (localPackage: LocalPackage): void => {
    skipPackages.push(localPackage)
    progressBar.increment()
  }

  const publishPackageSuccess = (localPackage: LocalPackage): void => {
    successPackages.push(localPackage)
    progressBar.increment()
  }

  const publishPackageFail = (localPackage: LocalPackage): void => {
    failPackages.push(localPackage)
    progressBar.increment()
  }

  await publish({
    registry,
    pkgDir,
    callbacks: {
      pkgDirParsed,
      publishPackageSkipped,
      publishPackageSuccess,
      publishPackageFail
    }
  })

  progressBar.stop()

  console.log(
    chalk.green(`Publish Success with ${size(successPackages)} packages\n`)
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

  if (!isEmpty(skipPackages)) {
    console.log(chalk.red(`Publish skip with ${size(skipPackages)} packages\n`))

    for (const aPackage of skipPackages) {
      const { organization, name, version } = aPackage
      console.log(
        chalk.red(
          ` - ${
            isUndefined(organization) ? '' : `@${organization}/`
          }${name}@${version}`
        )
      )
    }
  }

  console.log('\n')

  if (!isEmpty(failPackages)) {
    console.log(chalk.red(`Publish fail with ${size(failPackages)} packages\n`))

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

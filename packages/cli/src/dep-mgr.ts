import commander from 'commander'

async function main (): Promise<void> {
  const program = new commander.Command()

  program
    .name('dep-mgr')
    .description('A cli tool to manage dependency')
    .command(
      'download',
      'Download all packages according to npm, yarn or pnpm lockfile'
    )
    .alias('d')
    .command(
      'publish',
      'Publish all packages under directory to specific registry'
    )
    .alias('p')

  await program.parseAsync(process.argv)
}

void main()

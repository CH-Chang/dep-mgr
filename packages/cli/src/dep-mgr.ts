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

  await program.parseAsync(process.argv)
}

void main()

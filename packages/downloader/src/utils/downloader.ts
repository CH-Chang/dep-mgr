import { type Status, type Package } from '../constants'

export const download = async (
  packages: Package[],
  registry: string,
  outDir: string,
  callback?: (status: Status, extra: unknown) => void
): Promise<void> => {}

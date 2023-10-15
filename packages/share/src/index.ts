export interface Package {
  organization?: string
  name: string
  version: string
}

export const DEFAULT_REGISTRY = 'https://registry.npmjs.org'
export const DEFAULT_OUT_DIR = 'dependency-packages'

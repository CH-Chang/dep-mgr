import { type Package } from '@dep-mgr/share'

export interface LocalPackage extends Package {
  location: string
}

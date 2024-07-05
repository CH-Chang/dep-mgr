import { isUndefined } from 'lodash'
import urlJoin from 'url-join'

export const joinPackageUrl = (registry: string, organization: string | undefined, name: string, version: string): string => {
  const url = isUndefined(organization)
    ? urlJoin(registry, name, '-', `${name}-${version}.tgz`)
    : urlJoin(registry, organization, name, '-', `${name}-${version}.tgz`)
  return url
}

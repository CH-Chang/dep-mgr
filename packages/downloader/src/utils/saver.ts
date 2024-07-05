import fs from 'graceful-fs'
import path from 'path'

export const savePackage = (location: string, packageBuffer: Buffer): void => {
  const dir = path.dirname(location)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(location, packageBuffer)
}

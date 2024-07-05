import { retryAsync } from 'ts-retry'
import fetch from 'node-fetch'

export const requestPackage = async (url: string): Promise<Buffer | null> => {
  const response = await retryAsync(
    async () => await fetch(url),
    { delay: 100, maxTry: 3 }
  )

  const { status } = response

  if (status === 200) {
    const packageArrayBuffer = await response.arrayBuffer()
    const packageBuffer = Buffer.from(packageArrayBuffer)
    return packageBuffer
  }

  return null
}

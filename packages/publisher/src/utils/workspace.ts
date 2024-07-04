import fs from 'fs'
import os from 'os'
import path from 'path'
import spawn from 'cross-spawn'
import { nanoid } from 'nanoid'
import { rimrafSync } from 'rimraf'

export const createWorkspace = (registry: string): string => {
  const tmpDir = os.tmpdir()
  const workspaceDir = path.resolve(tmpDir, nanoid())
  fs.mkdirSync(workspaceDir, { recursive: true })

  spawn.sync('npm', [
    'config',
    'set',
    'registry',
    registry,
    '--location=project'
  ], { cwd: workspaceDir })

  return workspaceDir
}

export const removeWorkspace = (workspaceDir: string): void => {
  if (fs.existsSync(workspaceDir)) {
    rimrafSync(workspaceDir)
  }
}

import type { RollupOptions } from 'rollup'
import eslint from '@rollup/plugin-eslint'
import typescript from '@rollup/plugin-typescript'
import summary from 'rollup-plugin-summary'
import terser from '@rollup/plugin-terser'

const inputs = ['dep-mgr', 'dep-mgr-download']

const jsConfig = (input: string): RollupOptions => {
  return {
    input: `src/${input}.ts`,
    plugins: [
      eslint(),
      typescript({
        tsconfig: 'tsconfig.build.json'
      }),
      terser(),
      summary()
    ],
    treeshake: true,
    output: [
      {
        file: `dist/${input}.js`,
        format: 'cjs',
        banner: '#!/usr/bin/env node',
        sourcemap: false
      }
    ]
  }
}

// eslint-disable-next-line lodash/prefer-lodash-method
export default inputs.map(jsConfig)

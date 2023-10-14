import type { InputPluginOption, RollupOptions } from 'rollup'
import license from 'rollup-plugin-license'
import eslint from '@rollup/plugin-eslint'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import del from 'rollup-plugin-delete'
import summary from 'rollup-plugin-summary'
import terser from '@rollup/plugin-terser'

const jsConfig: RollupOptions = {
  input: 'src/index.ts',
  plugins: [
    eslint(),
    del({
      targets: ['dist/*']
    }) as InputPluginOption,
    typescript({
      tsconfig: 'tsconfig.build.json'
    }),
    terser(),
    summary()
  ],
  treeshake: true,
  output: [
    {
      // name: '@dep-mgr/downloader',
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: false
    }
  ]
}

const typeConfig: RollupOptions = {
  input: 'dist/types/index.d.ts',
  plugins: [
    dts(),
    license({
      banner: {
        commentStyle: 'regular',
        content:
          'Copyright © <%= moment().format("YYYY")%> CH-Chang. All rights reserved.'
      }
    }),
    summary()
  ],
  output: [
    {
      file: 'dist/index.d.ts',
      format: 'es'
    }
  ]
}

export default [jsConfig, typeConfig]

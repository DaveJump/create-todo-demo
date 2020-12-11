import type { UserConfig } from 'vite'
import { resolve } from 'path'

function resolvePath(...dirs: string[]) {
  return resolve(__dirname, '.', ...dirs);
}

function isProd() {
  return process.env.NODE_ENV === 'production'
}

const viteConfig: UserConfig = {
  /**
   * Transpile target for esbuild.
   * @default 'es2020'
   */
  esbuildTarget: 'es2020',
  /**
   * @default 'localhost'
   */
  hostname: 'localhost',
  /**
   * Run to open the browser automatically
   * @default 'false'
   */
  open: false,
  /**
   * Set to `false` to disable minification, or specify the minifier to use.
   * Available options are 'terser' or 'esbuild'.
   * @default 'terser'
   */
  minify: 'terser',
  /**
   * Base public path when served in production.
   * @default '/'
   */
  base: '/',
  /**
   * Directory relative from `root` where build output will be placed. If the
   * directory exists, it will be removed before the build.
   * @default 'dist'
   */
  outDir: 'dist',
  /**
   * Whether to generate sourcemap
   * @default false
   */
  sourcemap: false,
  /**
   * Whether to log asset info to console
   * @default false
   */
  silent: false,
  /**
   * Import alias.
   */
  alias: {
    '/@/': resolvePath('src'),
    '/components/': resolvePath('src/components'),
    '/store/': resolvePath('src/store')
  },
  terserOptions: {
    compress: {
      drop_console: isProd(),
    },
  },
  optimizeDeps: {
    include: [],
  },
}

export default viteConfig
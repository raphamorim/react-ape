const path = require('path');
const {rollup} = require('rollup');
const closure = require('./plugins/closure-plugin');
const babel = require('rollup-plugin-babel');
const stripBanner = require('rollup-plugin-strip-banner');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const {uglify} = require('rollup-plugin-uglify');
const replace = require('rollup-plugin-replace');
const optimizeJs = require('rollup-plugin-optimize-js');
const chalk = require('chalk');

const tasks = [];
const packagePath = 'packages/react-ape';
const reactApeVersion = require(path.resolve(
  process.cwd(),
  `${packagePath}/package.json`
)).version;

const closureOptions = {
  compilation_level: 'SIMPLE',
  language_in: 'ECMASCRIPT5_STRICT',
  language_out: 'ECMASCRIPT5_STRICT',
  env: 'CUSTOM',
  warning_level: 'QUIET',
  apply_input_source_maps: false,
  use_types_for_optimization: false,
  process_common_js_modules: false,
  rewrite_polyfills: false,
};

function stripEnvVariables(env) {
  return {
    __DEV__: env === 'production' ? 'false' : 'true',
    'process.env.NODE_ENV': "'" + env + "'",
  };
}

function createBundle({entryPath, bundleType, destName}) {
  entryPath = path.resolve(entryPath);
  const logKey =
    chalk.white.bold(entryPath) + chalk.dim(` (${reactApeVersion})`);
  console.log(`${chalk.blue(bundleType)} ${logKey} -> dist/${destName}`);

  let plugins = [
    replace(stripEnvVariables(bundleType)),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        '@babel/preset-flow',
        '@babel/preset-env',
        '@babel/preset-react',
      ],
      plugins: ['@babel/plugin-proposal-class-properties'],
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    // Remove 'use strict' from individual source files.
    {
      transform(source) {
        return source.replace(/['"]use strict['"']/g, '');
      },
    },
    stripBanner({
      exclude: 'node_modules/**/*',
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    // Apply dead code elimination and/or minification.
    bundleType === 'production' &&
      closure(
        Object.assign({}, closureOptions, {
          // Don't let it create global variables in the browser.
          // https://github.com/facebook/react/issues/10909
          assume_function_wrapper: false,
          // Works because `google-closure-compiler-js` is forked in Yarn lockfile.
          // We can remove this if GCC merges my PR:
          // https://github.com/google/closure-compiler/pull/2707
          // and then the compiled version is released via `google-closure-compiler-js`.
          renaming: true,
        })
      ),
  ];

  if (bundleType.indexOf('production') >= 0) {
    plugins = plugins.concat([optimizeJs(), uglify()]);
  }

  rollup({
    external: ['react'],
    input: entryPath,
    plugins: plugins,
  }).then(bundle => {
    tasks.push(
      bundle.write({
        format: 'umd',
        globals: {
          react: 'React',
        },
        name: 'ReactApe',
        file: `${packagePath}/dist/${destName}`,
      })
    );
  });
}

createBundle({
  entryPath: `${packagePath}/reactApeEntry.js`,
  bundleType: 'production',
  destName: 'react-ape.production.js',
});

createBundle({
  entryPath: `${packagePath}/reactApeEntry.js`,
  bundleType: 'development',
  destName: 'react-ape.development.js',
});

Promise.all(tasks).catch(error => {
  Promise.reject(error);
});

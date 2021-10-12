/* eslint-disable no-console */

const webpack = require('webpack');
const path = require('path');

const baseDir = path.resolve(`${__dirname}/..`);

// eslint-disable-next-line import/no-dynamic-require
const packageJson = require(`${baseDir}/package.json`);

const srcDir = `${baseDir}/src`;
const distDir = `${baseDir}/dist`;

const defaultConfig = (siteId) => {
  const config = {
    entry: {
      main: `${srcDir}/main.js`,
    },
    output: {
      path: distDir,
      filename: `${siteId}.js`,
      // clean: true,
    },
    mode: process.env.NODE_ENV,
    devtool: 'source-map',
    stats: { modules: false, hash: false },
    watchOptions: { ignored: /node_modules/ },
    resolve: {
      alias: {
        core: `${srcDir}/core/`,
        sites: `${srcDir}/sites/`,
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        __WINVAR__: JSON.stringify(packageJson.config.windowVar),
        __NAME__: JSON.stringify(packageJson.name),
        __VERSION__: JSON.stringify(packageJson.version),
        __MODE__: JSON.stringify(process.env.NODE_ENV),
        __SITEID__: JSON.stringify(siteId),
      }),
      // new webpack.ContextReplacementPlugin(
      //   /core\/Site\/Trigger/,
      //   new RegExp(
      //     fs
      //       .readdirSync(`${srcDir}/core/Site/Trigger`)
      //       .map((x) => x.replace(/\.js$/, ''))
      //       .join('|')
      //   )
      // ),
      // new webpack.ContextReplacementPlugin(/core\/Site\/Trigger/, new RegExp()),
    ],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: { loader: 'babel-loader' },
        },
      ],
    },
  };
  console.log('\x1B[31;7m', config.mode, '\x1B[0m');
  console.log('\x1B[31;7m', `http://localhost:${packageJson.config.port}/${siteId}.js`, '\x1B[0m');
  return config;
};

// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => {
  const config = defaultConfig(env.siteId);
  return config;
};

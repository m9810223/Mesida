const webpack = require('webpack');
const path = require('path');

const baseDir = path.resolve(`${__dirname}/..`);

const packageJson = require(`${baseDir}/package.json`);

const srcDir = `${baseDir}/src`;
const distDir = `${baseDir}/dist`;

const defaultConfig = (siteIds) => {
  entryFiles = siteIds.split(' ').reduce((acc, cur) => ({ ...acc, [cur]: `${srcDir}/sites/${cur}/index.js` }), {});
  console.log('entryFiles:', entryFiles);
  const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

  const config = {
    entry: entryFiles,
    output: {
      path: `${distDir}`,
      filename: '[name].js',
      // clean: true,
    },
    mode: mode,
    devtool: 'source-map',
    stats: { modules: false, hash: false },
    watchOptions: { ignored: /node_modules/ },
    resolve: {
      alias: {
        // alias:
        core: `${srcDir}/core`,
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        __WINVAR__: JSON.stringify(packageJson.config.windowVar),
        __NAME__: JSON.stringify(packageJson.name),
        __VERSION__: JSON.stringify(packageJson.version),
        __MODE__: JSON.stringify(process.env.NODE_ENV),
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
  // console.log('\x1B[31;7m', `http://localhost:${packageJson.config.port}/${siteIds}.js`, '\x1B[0m');
  return config;
};

module.exports = (env, argv) => {
  console.log(env);
  const config = defaultConfig(env.siteIds);
  return config;
};

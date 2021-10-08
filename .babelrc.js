module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    ['@babel/plugin-proposal-class-properties'],
    [
      '@babel/plugin-transform-runtime',
      // { corejs: 3 }, // false, 2, 3
    ],
  ],
};

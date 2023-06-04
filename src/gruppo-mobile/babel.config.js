module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      require.resolve("expo-router/babel"),
      [
        "module-resolver",
        {
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
          ],
          alias: {
            "@app": "./app",
            "@assets": "./assets",
            "@lib": "./lib",
          },
        }
      ]
    ],
  };
};

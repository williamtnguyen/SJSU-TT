var webpack = require('webpack');

exports.onCreateWebpackConfig = ({ actions, stage, loaders }) => {
  const config = {
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
      })
    ]
  };
  if (stage === 'build-html') {
    config.module = {
      rules: [
        {
          test: require.resolve('bootstrap'),
          use: loaders.null()
        },
        {
          test: require.resolve('jquery'),
          use: loaders.null()
        }
      ]
    };
  }
  actions.setWebpackConfig(config);
};

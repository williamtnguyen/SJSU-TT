const webpack = require('webpack');

exports.onCreateWebpackConfig = ({ actions, stage, loaders }) => {
  const config = {
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery',
      }),
    ],
  };
  if (stage === 'build-html') {
    config.module = {
      rules: [
        {
          test: require.resolve('bootstrap'),
          use: loaders.null(),
        },
        {
          test: require.resolve('jquery'),
          use: loaders.null(),
        },
      ],
    };
  }
  actions.setWebpackConfig(config);
};

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // Only update the `/portal` page.
  if (page.path.match(/^\/portal/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.

    // eslint-disable-next-line no-param-reassign
    page.matchPath = '/portal/*';

    // Update the page.
    createPage(page);
  }
};

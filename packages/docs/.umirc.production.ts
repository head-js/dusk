import { defineConfig } from '@umijs/max';


export default defineConfig({
  outputPath: '.dist',
  publicPath: 'https://head.js.org/dusk/',
  // Hash history routes live after `#` and do not include the deployment
  // directory. Keep the router basename at `/`; publicPath owns `/dusk/`.
  base: '/',

  esbuildMinifyIIFE: true,
  jsMinifier: 'terser',
  cssMinifier: 'cssnano',

  mfsu: false,

  chainWebpack(config: any, options: any) {
    // const { module, optimization, plugins } = config.toConfig();

    config.optimization.set('chunkIds', 'named');
    config.optimization.set('moduleIds', 'named');
    // config.optimization.set('minimize', false);

    config.output
      .filename('[name].[chunkhash:5].js')
      .chunkFilename('[name].[chunkhash:5].js')

    config.plugin('mini-css-extract-plugin').tap(() => [
      {
        filename: '[name].[chunkhash:5].css',
        chunkFilename: '[name].[chunkhash:5].css',
        ignoreOrder: true,
      },
    ]);
  },

  manifest: {
    publicPath: '',
  },
});

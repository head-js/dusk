import { defineConfig } from '@umijs/max';
import routes from './src/routes';


export default defineConfig({
  history: { type: 'hash' },

  model: {},

  initialState: {},

  clientLoader: {},

  routes,

  // request: {},

  // access: {},

  antd: {},

  // // https://github.com/ant-design/ant-design/issues/37423
  // theme: {
  //   'primary-color-hover': '#1890ff',
  //   'primary-color': '#40a9ff',
  // },

  // layout: {
  //   title: '@umijs/max',
  // },

  postcssLoader: {
    plugins: {
      tailwindcss: {},
    },
  },
});

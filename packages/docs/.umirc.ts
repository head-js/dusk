import { readFileSync } from 'fs';
import { defineConfig } from '@umijs/max';
import routes from './src/routes';
import { version } from './package.json';


const mode = process.env.NODE_ENV || 'development';
const profileActive = process.env.SPRING_PROFILES_ACTIVE || 'local';
const context = '/dusk';

// const profileVars = JSON.parse(readFileSync('.profile.local', 'utf-8'));
const profileVars = {};

const headPresetHeadScript = readFileSync(
  './node_modules/@head.js/snippet/preset-head-afde7d.js',
  'utf-8',
)
  .replace('{{ __mode__ }}', mode)
  .replace('{{ __profile__ }}', profileActive)
  .replace('{{ __version__ }}', version)
  .replace('{{ __context__ }}', context)
  .replace('"{{ __profile_vars__ }}"', JSON.stringify(profileVars));

const headPresetBodyScript = readFileSync(
  './node_modules/@head.js/snippet/preset-body-8e5aab.js',
  'utf-8',
);

const headContainerScript = readFileSync(
  './node_modules/@head/container/dist/snippet-334425ecd0.js',
  'utf-8',
);


export default defineConfig({
  history: { type: 'hash' },

  model: {},

  initialState: {},

  clientLoader: {},

  routes,

  headScripts: [
    { content: headPresetHeadScript, id: 'head-js' },
  ],

  scripts: [
    { content: [ headPresetBodyScript, headContainerScript ].join('\n'), id: 'head-js-bridge' },
  ],

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

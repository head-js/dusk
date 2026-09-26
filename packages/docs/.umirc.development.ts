import { defineConfig } from '@umijs/max';


export default defineConfig({
  // The dev server is served from its root URL (http://localhost:3000/).
  // Keep the /dusk/ basename only in the production config where the app is
  // deployed under https://head.js.org/dusk/.
  base: '/',

  publicPath: '/',

  mfsu: false,
});

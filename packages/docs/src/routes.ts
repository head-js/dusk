module.exports = [
  { path: '/', component: '@/pages/home' },
  { path: '/page-v1/:pageTemplateName', component: '@/pages/page-v1' },
  { path: '/page-v1/:pageTemplateName/*', component: '@/pages/page-v1' },
];

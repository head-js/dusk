import React, { Suspense, useEffect } from 'react';
import { matchPath } from 'react-router';
// import { useLocation } from 'react-router-dom';
import { match } from './utils';
import * as effects from './effects';
import { usePageStore } from './store';
import PageFactory from '../../page-factory';


function Render() {
  // console.log('// pages.template.index -> Render');

  const { currentPage } = usePageStore();
  // console.log('[page-v1.Render]', currentPage);
  const { uid, template, layouts, actions } = currentPage;

  return <>
    <Suspense fallback={<div>lazy loading ...</div>}>
      <PageFactory key={uid} template={template.name} layouts={layouts} actions={actions} />
    </Suspense>
  </>;
}


async function onDispatch(action) {
  // console.log(action);
  const { currentPage: { uid: pageUid } } = usePageStore.getState();
  // console.log(pageUid);
  const { type, payload } = action;
  const [ model, effect ] = type.split('/');
  // assert model === 'page'
  // assert effect === 'transition';
  if (model === 'page' && effect === 'transition') {
    const change = await effects[effect](payload, { pageUid });
    console.log(change);
    // usePageStore.setState(change);
  }
}


export default function Page() {
  // console.log('// pages.template.index -> Page');

  useEffect(() => {
    if (typeof head !== 'undefined' && head.container) {
      head.container.script('$', 'dispatch', onDispatch);
    }
  }, []);

  return <Render />;
}


export const routes = [
  '/page-v1/:pageTemplateName',
  '/page-v1/:pageTemplateName/*',
];


export async function clientLoader() {
  // console.log('// pages.template.index -> clientLoader');

  const { pathname, params, query, routepathname } = match(routes);
  // console.log(pathname, params, query, routepathname);

  const { currentPage } = await effects.load({ pathname, params, query, routepathname });
  // console.log(currentPage);
  // console.log(currentPage.route, routepathname);

  const matched = matchPath({ path: currentPage.route }, routepathname) || { params: {} };
  // console.log('[page-v1.clientLoader]', matched);
  const $route = { route: currentPage.route, pathname: routepathname, params: matched.params, query };
  // console.log($route);
  console.assert(currentPage.pathname === $route.pathname);

  usePageStore.setState({ $route, currentPage,
    // factory: currentPage.factory.name,
    template: currentPage.template.name, uid: currentPage.uid, pathname: currentPage.pathname });
  // console.log('// pages.template.index -> clientLoader -> setState');

  if (typeof head !== 'undefined' && head.container) {
    head.container.script('$', 'session', function (update) {
      if (update) {
        // TODO: zustand.setState;
      } else {
        const { currentPage: { route, params } } = usePageStore.getState();
        return { route, params };
      }
    });
  }

  return { _loaded: true };
}

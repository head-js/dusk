import { matchRoutes } from 'react-router';
import { parse } from 'qs';


export function match(routes) {
  const location = window.location.hash
    ? new URL(window.location.hash.slice(1) || '/', window.location.origin)
    : window.location;
  const { pathname, search } = location;
  const matches = matchRoutes(routes.map(r => ({ path: r })), pathname);
  // console.log(matches);
  const { route: { path: matched }, params } = matches[0];
  // console.log(matched);
  const routepathname = '/' + (params['*'] || '');
  delete params['*'];

  const query = parse(search, { ignoreQueryPrefix: true });

  return { pathname, params, query, routepathname };
}


export function resolveimport(name) {
  const [ prettyRemoteName, moduleName ] = name.split('/');
  const remoteName = `wmf${prettyRemoteName.replace(/-/g, '')}`;
  return {
    entry: head.profile.wmf[prettyRemoteName],
    remoteName,
    moduleName,
  };
}

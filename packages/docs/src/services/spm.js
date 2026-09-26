import _merge from 'lodash.merge';
import nunjucks from 'nunjucks';
import $http from '@head/http';


function _template(tpl, locals) {
  return nunjucks.renderString(tpl, locals);
}


async function _callApi({ svc, ep }) {
  const api = `${head.profile.svc[svc]}${ep}`;
  const { data } = await $http.get(api);
  return data;
}


async function _hydrateProp(key, props) {
  // console.log('_hydrateProp', key, props[key]);
  const api = props[key];

  if (!api.svc) {
    return;
  }

  const data = await _callApi(api);
  props[key] = data;
}


function _hydrateSession(props, defaults, session) {
  const locals = _merge(defaults, session);

  const res = {};
  Object.keys(props).forEach((k1) => {
    const v1 = props[k1];
    if (typeof v1 === 'string') {
      res[k1] = _template(v1, locals);
      // console.log('_template', v1, locals, res);
    } else {
      res[k1] = {};
      Object.keys(v1).forEach((k2) => {
        const v2 = v1[k2];
        res[k1][k2] = _template(v2, locals);
        // console.log('_template', v2, locals, res);
      });
    }
  });
  return res;
}


async function _hydrateContainer(container, session) {
  const props = _hydrateSession(container.props, container.defaults, session);
  // console.log('_hydrateContainer', props);
  container.props = props;

  await Promise.all(Object.keys(container.props).map(key => _hydrateProp(key, container.props)));
}


export async function hydrate(page) {
  const { containers = [], session = {} } = page;
  // console.log('hydrate', containers, session);
  await Promise.all(containers.map(cr => _hydrateContainer(cr, session)));
}

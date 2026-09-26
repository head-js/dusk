import database from '../../services/database';


export async function load({ pathname, params, query, routepathname }) {
  const { pageTemplateName } = params;
  const page = database.find(({ template }) => template.name === pageTemplateName);

  if (!page) {
    throw new Error(`Unknown page template: ${pageTemplateName}`);
  }

  return {
    currentPage: {
      ...page,
      params,
      pathname: routepathname,
    },
  };
}

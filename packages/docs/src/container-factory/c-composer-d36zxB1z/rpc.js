import $http from '@head/container/$$/http';


// export async function showPageTemplate(pageTemplateName) {
//   const svc = head.profile.svc['kuiba-campaign'];
//   const ep = `/api/page-templates/${pageTemplateName}`;
//   const { data } = await $http.get(`${svc}${ep}`);
//   return data;
// }


export async function updatePageTemplateCac(pageTemplateName, cac) {
  const svc = head.profile.svc['kuiba-campaign'];
  const ep = `/api/page-templates/${pageTemplateName}/cac`;
  const { data } = await $http.put(`${svc}${ep}`, {}, cac, { 'Content-Type': 'text/plain' });
  // console.log(data);
}

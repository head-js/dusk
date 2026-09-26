import $http from '@head/container/$$/http';


export async function updatePageTemplateLayouts(pageTemplateName, layouts) {
  const svc = head.profile.svc['kuiba-campaign'];
  const ep = `/api/page-templates/${pageTemplateName}/layouts`;
  const { data } = await $http.put(`${svc}${ep}`, {}, layouts);
  // console.log(data);
}

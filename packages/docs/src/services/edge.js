import Application from '@head/edge';
// import { hydrate } from './spm';


const { router, client } = new Application();

// router.verb('GET', '/api/campaign-templates/:template/active-campaign', async (ctx, next) => {
//   const { template } = ctx.params;
//   const { data: { uid: campaignId } } = await rpc.showActiveCampaign(template);

//   ctx.body = { code: 0, message: 'ok', data: { campaignId } };
//   await next();
// });

// router.verb('GET', '/api/campaigns/:campaignId/current-page', async (ctx, next) => {
//   const { campaignId } = ctx.params;

//   const { data: currentPage } = await rpc.showCurrentPage(campaignId);
//   // console.log(currentPage);

//   const { layouts } = currentPage;
//   const containers = Object.keys(layouts).map(k => layouts[k]).flat();
//   // console.log(containers);
//   currentPage.containers = containers;
//   // console.log(currentPage);

//   const data = { currentPage };

//   // console.log('before hydrate');
//   await hydrate(data.currentPage);
//   // console.log('after hydrate', data);

//   ctx.body = { code: 0, message: 'ok', data };
//   await next();
// });

// router.verb('PUT', '/api/campaigns/:campaignId/.transition', async (ctx, next) => {
//   // console.log('PUT', ctx);
//   const { campaignId } = ctx.params;
//   const { body: req } = ctx.req;
//   // console.log(campaignId, req);

//   await rpc.transition(campaignId, req);
//   // console.log(data);

//   ctx.body = { code: 0, message: 'ok' };
//   await next();
// });

// router.verb('GET', '/api/page-templates/:template/active-page', async (ctx, next) => {
//   const { template } = ctx.params;
//   const { data: { uid: pageUid } } = await rpc.showActivePage(template);

//   ctx.body = { code: 0, message: 'ok', data: { pageUid } };
//   await next();
// });


// router.verb('GET', '/api/pages/:pageUid/current-page', async (ctx, next) => {
//   const { pageUid } = ctx.params;

//   const { data: currentPage } = await rpc.showPage(pageUid);
//   // console.log(currentPage);

//   const { layouts } = currentPage;
//   const containers = Object.keys(layouts).map(k => layouts[k]).flat();
//   // console.log(containers);
//   currentPage.containers = containers;
//   // console.log(currentPage);

//   const data = { currentPage };

//   // console.log('before hydrate');
//   await hydrate(data.currentPage);
//   // console.log('after hydrate', data);

//   ctx.body = { code: 0, message: 'ok', data };
//   await next();
// });


// router.verb('PUT', '/api/pages/:pageUid/.transition', async (ctx, next) => {
//   // console.log('PUT', ctx);
//   const { pageUid } = ctx.params;
//   const form = ctx.request.body;
//   // console.log(campaignId, req);

//   await rpc.transition2(pageUid, form);
//   // console.log(data);

//   ctx.body = { code: 0, message: 'ok' };
//   await next();
// });


export default client;

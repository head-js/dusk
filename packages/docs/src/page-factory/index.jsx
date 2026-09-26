import { Suspense } from 'react';
import REGISTRY from './registry';


export default function PageFactory({ template, layouts }) {
  // console.log('[PageFactory]', name, layouts);
  const LazyComponent = REGISTRY[template];

  return <>
    <Suspense fallback={<div>lazy loading ...</div>}>
      {LazyComponent && <LazyComponent {...layouts} />}
    </Suspense>
  </>;
}

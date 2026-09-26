import './global.css';


function getInitialPathname() {
  return window.location.hash
    ? new URL(window.location.hash.slice(1) || '/', window.location.origin).pathname
    : window.location.pathname;
}


// Umi 4.x registers page `clientLoader` functions correctly, but its initial
// hash-history dispatch matches `window.location.pathname` instead of the
// pathname stored in `window.location.hash`. A direct hash URL therefore
// starts at `/` and skips the page loader. Keep this compatibility layer in
// the app runtime until the affected Umi renderer behavior is replaced.
export async function render(oldRender: () => void) {
  const pathname = getInitialPathname();

  // This is intentionally scoped to the current page-v1 entry point. The
  // loader itself remains the single source of page data initialization.
  if (pathname.startsWith('/page-v1/')) {
    const { clientLoader } = await import('./pages/page-v1');
    await clientLoader();
  }

  oldRender();
}

export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

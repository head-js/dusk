import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { loadingAtom } from './state';
import { useContainerStore } from '../store';


export default function Skeleton({ xid }) {
  // console.log('[Skeleton]', xid);
  const setLoading = useSetAtom(loadingAtom);

  useEffect(() => {
    async function load() {
      const $create = useContainerStore.getState().$create;
      const $m = $create(xid);

      setLoading('CONTENTLESS');
    }

    setLoading('SKELETON_LOADING');
    load();
  }, []);

  return <div className="antd-skeleton" />;
}

import { useEffect } from 'react';
import { Skeleton as AntdSkeleton } from 'antd';
import { useSetAtom } from 'jotai';
import { useContainerStore } from '../store';
import { loadingAtom } from './state';


export default function Skeleton({ xid }) {
  // console.log('Skeleton', props);
  const setLoading = useSetAtom(loadingAtom);

  useEffect(() => {
    async function load() {
      const $create = useContainerStore.getState().$create;
      const $m = $create(xid);
      // console.log(xid, $m);

      setLoading('CONTENTLESS');
    }

    setLoading('SKELETON_LOADING');
    load();
  }, []);

  return <AntdSkeleton />;
}

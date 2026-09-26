import React, { useEffect } from 'react';
import { filter, map, debounceTime } from 'rxjs';
import { useSetAtom } from 'jotai';
import { Empty } from 'antd';
import { loadingAtom } from './state';
import { useContainerStore } from '../store';


export default function Contentless({ xid, slots, script }) {
  // console.log('[Contentless]', xid, slots, script);
  const setLoading = useSetAtom(loadingAtom);

  useEffect(() => {
    async function load() {
      const $id = useContainerStore.getState().$id;

    // FIXME:
    const [ FROM_XID, FROM_EVENT, TO_XID, TO_EVENT ] = [ 'xQd2Rcph', 'DOC_CHANGED', xid, 'DOC_CHANGED' ];

    const $s = $id(FROM_XID);
    const $m = $id(TO_XID);
    $s.pipe(
      filter(({ type }) => type === FROM_EVENT),
      debounceTime(1000),
      map(({ payload }) => payload),
    ).subscribe((payload) => $m.next({ type: TO_EVENT, payload }));

      setLoading('CONTENTFUL');
    }

    setLoading('CONTENTLESS_LOADING');
    load();
  }, []);

  return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />;
}

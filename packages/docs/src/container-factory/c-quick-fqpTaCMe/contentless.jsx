import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { Empty } from 'antd';
import { loadingAtom } from './state';


export default function Contentless({ xid, slots, script }) {
  // console.log('Contentless', xid, slots, script);
  const setLoading = useSetAtom(loadingAtom);

  useEffect(() => {
    async function load() {
      setLoading('CONTENTFUL');
    }

    setLoading('CONTENTLESS_LOADING');
    load();
  }, []);

  return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />;
}

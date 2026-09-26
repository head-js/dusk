import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { Empty } from 'antd';
import { loadingAtom } from './state';
// import { useContainerStore } from '../store';


export default function Contentless() {
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

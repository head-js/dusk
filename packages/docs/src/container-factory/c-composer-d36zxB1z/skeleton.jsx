import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { Empty } from 'antd';
import { loadingAtom } from './state';
// import { useContainerStore } from '../store';


export default function Skeleton({ xid }) {
  const [ loading, setLoading ] = useAtom(loadingAtom);

  useEffect(() => {
    const assets = [ '/dusk/unpkg/codemirror@6.5.1/dist/codemirror.js' ];

    head.bridge.require('codemirror@6.5.1', assets, (register) => {
      register(window.CodeMirror);
    });

    // const $create = useContainerStore.getState().$create;
    // const $m = $create(xid);
    // console.log(xid, $m);

    async function load() {
      const [ CodeMirror ] = await head.bridge.initialize([ 'codemirror@6.5.1' ]);
      // console.log(CodeMirror);
      setLoading('CONTENTLESS');
    }

    setLoading('SKELETON_LOADING');
    load();
  }, []);

  return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />;
}

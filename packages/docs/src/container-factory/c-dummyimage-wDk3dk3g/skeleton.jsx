import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { loadingAtom } from './state';


export default function Skeleton() {
  const setLoading = useSetAtom(loadingAtom);

  useEffect(() => {
    async function load() {
      setLoading('CONTENTLESS');
    }

    setLoading('SKELETON_LOADING');
    load();
  }, []);

  return <div>Loading...</div>;
}

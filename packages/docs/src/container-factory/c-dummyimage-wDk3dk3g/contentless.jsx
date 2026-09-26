import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { loadingAtom } from './state';


export default function Contentless(props) {
  const setLoading = useSetAtom(loadingAtom);

  useEffect(() => {
    async function load() {
      setLoading('CONTENTFUL');
    }

    setLoading('CONTENTLESS_LOADING');
    load();
  }, []);

  return (
    <div>Loading...</div>
  );
}

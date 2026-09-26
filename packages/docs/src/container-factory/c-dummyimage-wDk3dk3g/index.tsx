import React, { useMemo } from 'react';
import { Provider, createStore, useAtom } from 'jotai';
import type { DuskContainer } from '../../types/dusk.types';
import { loadingAtom } from './state';
import Skeleton from './skeleton';
import Contentless from './contentless';
import Contentful from './contentful';


function Container(props: DuskContainer) {
  const [ loading ] = useAtom(loadingAtom);

  switch (loading) {
    case 'SKELETON':
    case 'SKELETON_LOADING':
      return <Skeleton xid={props.xid} />;
    case 'CONTENTLESS':
    case 'CONTENTLESS_LOADING':
      return <Contentless {...props} />;
    case 'CONTENTFUL':
    case 'CONTENTFUL_LOADING':
      return <Contentful {...props} />;
    default:
      return null;
  }
}


export default function Stored(props: DuskContainer) {
  const store = useMemo(() => createStore());

  return (
    <Provider store={store}>
      <section data-xid={props.xid} className="vc-container">
        <Container {...props} />
      </section>
    </Provider>
  );
}

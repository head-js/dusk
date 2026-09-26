import React, { useMemo } from 'react';
import { Provider, createStore, useAtom } from 'jotai';
import { loadingAtom } from './state';
import Skeleton from './skeleton';
import Contentless from './contentless';
import Contentful from './contentful';


function Container(props) {
  // console.log('Container', props);
  const [ loading ] = useAtom(loadingAtom);
  // console.log(loading);

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


export default function Stored(props) {
  // console.log('Stored', props);
  const store = useMemo(() => createStore());

  return (
    <Provider store={store}>
      <section data-xid={props.xid} className="vc-container">
        <Container {...props} />
      </section>
    </Provider>
  );
}

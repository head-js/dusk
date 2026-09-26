import React, { useEffect } from 'react';
import { filter, map } from 'rxjs';
import { Card } from 'antd';
import { useAtom, useSetAtom } from 'jotai';
import { cacCopyAtom, frameAtom } from './state';
import { useContainerStore } from '../store';
import { createPageFrame } from './domain';
import styles from './contentful.css';


export default function Contentful({ xid, slots }) {
  const setCacCopy = useSetAtom(cacCopyAtom);
  const [ frame, setFrame ] = useAtom(frameAtom);

  useEffect(() => {
    const $m = useContainerStore.getState().$id(xid);

    $m.pipe(
      filter(({ type }) => type === 'DOC_CHANGED'),
      map(({ payload: { doc } }) => doc),
    ).subscribe((doc) => {
      // console.log(doc);
      const frame = createPageFrame(doc);
      // console.log(frame);

      setCacCopy(doc);
      setFrame(frame);
    });

    return () => $m.unsubscribe();
  }, []);

  return (
    <Card size="small" title="Page Frame" className={styles._}>
      <p>template: {frame.template.name}</p>
      <p>name: {frame.name}</p>
      <p>version: {frame.version}</p>
      <p>desc: {frame.desc}</p>
    </Card>
  );
}

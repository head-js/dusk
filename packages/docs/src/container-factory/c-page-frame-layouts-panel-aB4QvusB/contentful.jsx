import React, { useCallback, useEffect } from 'react';
import { filter, map } from 'rxjs';
import { Card, Tree, Button } from 'antd';
import { useAtom, useSetAtom } from 'jotai';
import { $session } from '@head/container';
import { cacCopyAtom, layoutsAtom } from './state';
import { useContainerStore } from '../store';
import { createLayouts, toFrame } from './domain';
import * as rpc from './rpc';


export default function Contentful({ xid, slots }) {
  const setCacCopy = useSetAtom(cacCopyAtom);
  const [ layouts, setLayouts ] = useAtom(layoutsAtom);

  useEffect(() => {
    const $m = useContainerStore.getState().$id(xid);
    $m.pipe(
      filter(({ type }) => type === 'DOC_CHANGED'),
      map(({ payload: { doc } }) => doc),
    ).subscribe((doc) => {
      // console.log(doc);
      const layouts = createLayouts(doc);
      // console.log(layouts);

      setCacCopy(doc);
      setLayouts(layouts);
    });

    return () => $m.unsubscribe();
  }, []);

  const onDeploy = useCallback(async () => {
    // console.log(layouts);
    const frame = toFrame(layouts);
    // console.log(frame);

    const { params } = $session();
    await rpc.updatePageTemplateLayouts(params.pageTemplateName, frame.layouts);
  }, [ layouts ]);

  return (
    <Card size="small" title="Page Frame - Layouts"
      actions={[ <Button onClick={onDeploy}>Deploy</Button> ]}>
      <Tree treeData={layouts} draggable={true} />
    </Card>
  );
}

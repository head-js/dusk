import React, { useEffect, useCallback, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { Row, Col, Button } from 'antd';
import { $session } from '@head/container';
import * as rpc from './rpc';


export default function WidgetEditor({ xid, docAtom, onDocChanged, deployable = false }) {
  const cmRef = useRef(null);
  const viewRef = useRef(null);

  const doc = useAtomValue(docAtom);

  useEffect(() => {
    if (!cmRef || !cmRef.current) {
      return ;
    }

    const CodeMirror = head.bridge.ready('codemirror');
    // console.log(CodeMirror);

    const view = CodeMirror.createView(cmRef.current, doc, { onDocChanged });
    // console.log(view);
    viewRef.current = view;

    return () => view.destroy();
  }, [ cmRef ]);

  const onDeploy = useCallback(async () => {
    const { params } = $session();
    // console.log(params);

    const view = viewRef.current;
    const doc = view.state.doc.toString();
    // console.log(doc);

    await rpc.updatePageTemplateCac(params.pageTemplateName, doc);
  }, [ xid ]);

  return <>
    <Row>
      <Col span="24">
        <div ref={cmRef} />
      </Col>
    </Row>
    {deployable &&
      <Row>
        <Col span="4" offset="20" className="text-right">
          <Button type="primary" onClick={onDeploy}>Deploy</Button>
        </Col>
      </Row>}
  </>;
}

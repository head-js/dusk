import React from 'react';
import { useSetAtom } from 'jotai';
import { Tabs } from 'antd';
import { cacAtom, jsonAtom } from './state';
// import { useContainerStore } from '../store';
import WidgetEditor from './widget-editor';
import styles from './contentful.css';


export default function Contentful({ xid }) {
  const setCac = useSetAtom(cacAtom);
  const setJson = useSetAtom(jsonAtom);

  function onCacChanged(doc) {
    setCac(doc);

    // const $m = useContainerStore.getState().$id(xid);
    // $m.next({ type: 'DOC_CHANGED', payload: { doc } });
  }

  function onJsonChanged(doc) {
    setJson(doc);
  }

  const items = [
    { label: 'Cac', key: 'cac', children: <WidgetEditor xid={xid} docAtom={cacAtom} onDocChanged={onCacChanged} deployable /> },
    { label: 'Json', key: 'json', children: <WidgetEditor xid={xid} docAtom={jsonAtom} onDocChanged={onJsonChanged} /> },
    { label: 'Yaml', key: 'yaml', children: 'Content of tab 2' },
  ];

  return (
    <div className={styles._}>
      <Tabs items={items} defaultActiveKey="cac" />
    </div>
  );
}

import { Row, Col } from 'antd';
import ContainerFactory from '../container-factory';


function LayoutMenu({ containers }) {
  return <>
    {containers.map(c => <ContainerFactory key={c.xid} xid={c.xid}
                            template={c.template.name} slots={c.slots} script={c.script} />)}
  </>;
}


function LayoutToolbox({ containers }) {
  return <>
    {containers.map(c => <ContainerFactory key={c.xid} xid={c.xid}
                           template={c.template.name} slots={c.slots} script={c.script} />)}
  </>;
}


function LayoutComposer({ containers }) {
  return <>
    {containers.map(c => <ContainerFactory key={c.xid} xid={c.xid}
                           template={c.template.name} slots={c.slots} script={c.script} />)}
  </>;
}


function LayoutPanel({ containers }) {
  // console.log('LayoutPanel', containers);
  return <>
    {containers.map(c => <ContainerFactory key={c.xid} xid={c.xid}
                           template={c.template.name} slots={c.slots} script={c.script} />)}
  </>;
}


export default function Page({ menu, toolbox, composer, panel }) {
  return (
    <div className="flex flex-row">
      <div className="flex-initial">
        <LayoutMenu containers={menu} />
      </div>
      <div className="flex-initial w-2" />
      <div className="flex-1">
        <Row>
          <Col span="3"><LayoutToolbox containers={toolbox} /></Col>
          <Col span="15"><LayoutComposer containers={composer} /></Col>
          <Col span="6"><LayoutPanel containers={panel} /></Col>
        </Row>
      </div>
    </div>
  );
}


export const options = {
  id: 'p-composer-na3w8hpF',
};

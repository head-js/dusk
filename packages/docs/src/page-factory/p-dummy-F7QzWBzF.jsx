import ContainerFactory from '../container-factory';


function LayoutMain({ containers }) {
  // console.log('main', containers);

  return <>
    {containers.map(c => <ContainerFactory key={c.xid} xid={c.xid} template={c.template.name} slots={c.slots} props={c.props} script={c.script}
                         /* @Deprecated */ name={c.template.name} />)}
  </>;
}


export default function Page({ main }) {
  return <>
    <LayoutMain containers={main} />
  </>;
}


export const options = {
  id: 'p-dummy-F7QzWBzF',
};

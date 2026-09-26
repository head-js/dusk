import { useContainerStore } from '../store';
import { WidgetSpace } from './widgets';


export default function Contentful({ xid }) {
  function onCreate() {
    const $c = useContainerStore.getState().$id(xid);
    $c.next({ type: 'CREATE_CLICKED', payload: {} });
  }

  return <WidgetSpace onCreate={onCreate} />;
}

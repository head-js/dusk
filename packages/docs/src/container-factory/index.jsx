import React, { Component, Suspense } from 'react';
import REGISTRY from './registry';


export default class ContainerFactory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log('ContainerFactory', this.props);
    // console.log('ContainerFactory', template, xid, script);
    const template = this.props.template || this.props.name; // @Deprecated:
    const xid = this.props.xid || this.props.name; // @Deprecated:
    const slots = this.props.slots || this.props.props; // @Deprecated:
    const script = this.props.script;

    const LazyComponent = REGISTRY[template];

    return (
      LazyComponent ?
        <Suspense fallback={<div>lazy loading ...</div>}>
          <LazyComponent /* @Deprecated */ {...slots} name={xid}
            key={xid} xid={xid} script={script} slots={slots} />
        </Suspense> :
        <h6>No such container: {template}</h6>
    );
  }
}

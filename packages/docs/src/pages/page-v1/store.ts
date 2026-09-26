import { create } from 'zustand';


type Template = {
  name: string;
  version: string;
}


type ActionEndpoint = {
  xid: string;
  type: string;
}


type Action = {
  from: ActionEndpoint;
  to: ActionEndpoint;
}


type PageFrame = {
  uid: string;
  template: Template;
  route: string;
  params: any;
  pathname: string;
  layouts: any;
  actions?: Action[];
}


export const usePageStore = create((set) => ({

  $route: {},

  factory: '',

  template: '',

  uid: '',

  pathname: '',

  currentPage: {
    uid: '',
    template: {},
    route: '',
    params: {},
    pathname: '',
    layouts: {},
    actions: [],
  } as PageFrame,
}));

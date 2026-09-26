import { parse, visit, types } from 'recast';
import { parse as babelParse } from 'recast/parsers/babel';
import { traverse } from 'estraverse';


const t = types.namedTypes;


function asTree(ast) {
  const root = { type: 'TreeNode', id: 'root', key: 'root', parent: '', name: '<layouts>', title: '<layouts>',
    attributes: { xid: 'layouts' }, children: [],
  };
  const stack = [ root ];

  visit(ast, {
    visitJSXElement(path) {
      const { node } = path;
      const tag = node.openingElement.name.name;
      const loc = node.openingElement.loc;
      const attributes = node.openingElement.attributes.reduce((acc, attr) => {
        acc[attr.name.name] = attr.value.value;
        return acc;
      }, {});
      attributes.tag = tag;

      const title = attributes.name
        ? `<${attributes.name}>`
        : `<${tag}>`;

      const parent = stack[stack.length - 1];

      const key = attributes.xid
        ? attributes.xid
        : (attributes.name                                 // container
           ? parent.attributes.xid + '-' + attributes.name // slot
           : attributes.tag);                              // menu
      // console.log(key);

      const current = { type: 'TreeNode', id: key, key, parent: '', name: title, title, attributes, children: [] };

      current.parent = parent.id;
      parent.children.push(current);

      stack.push(current);

      this.traverse(path);

      stack.pop();

      return false;
    },
  });

  return root.children;
}


export function createLayouts(source) {
  const root = parse(source, { parser: { parse: babelParse } });
  // console.log(root);

  let jsx = null;

  visit(root, {
    visitExportNamedDeclaration(path) {
      if (t.FunctionDeclaration.check(path.node.declaration)) {
        if (path.node.declaration.id.name === 'layouts') {
          this.traverse(path);
        }
      }

      return false;
    },

    visitReturnStatement(path) {
      this.traverse(path);
    },

    visitJSXFragment(path) {
      jsx = path.node;
      this.abort();
    },
  });
  // console.log(jsx);

  const layouts = asTree(jsx);
  // console.log(layouts);

  return layouts;
}


export function toFrame(layouts) {
  const root = { type: 'TreeNode', attributes: { xid: 'layouts', tag: 'layouts' }, children: layouts };

  const frame = {};

  const stack = [ frame ];

  traverse(root, {
    enter(node) {
      // console.log(node);
      const xid = node.attributes.xid;
      const tag = node.attributes.tag;

      const current = {};
      const parent = stack[stack.length - 1];

      switch (tag) {
        case 'container':
          current.name = node.attributes.name;
          current.version = node.attributes.version || '1.0.0';
          current.idx = `${Object.keys(parent).length}`.padStart(2, '0');
          current.slots = {};
          parent[xid] = current;
          break;
        case 'slot':
          parent.slots[node.attributes.name] = node.attributes.fallback || '';
          break;
        default:
          parent[tag] = current;
          break;
      }

      stack.push(current);
    },

    leave() {
      // console.log(node);
      stack.pop();
    },

    keys: {
      TreeNode: [ 'children' ],
    },
  });

  return frame;
}

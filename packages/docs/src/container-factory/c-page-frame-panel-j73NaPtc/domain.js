import { parse, visit, types } from 'recast';
import { parse as babelParse } from 'recast/parsers/babel';


const t = types.namedTypes;


export function createPageFrame(source) {
  const root = parse(source, { parser: { parse: babelParse } });
  // console.log(root);

  const template = {};
  const frame = {};

  visit(root, {
    visitImportDeclaration(path) {
      if (path.node.specifiers.length === 1) {
        if (path.node.specifiers[0].local.name == 'template') {
          const source = path.node.source.value;
          const [ name, version = '1.0.0' ] = source.split('@');
          template.name = name;
          template.version = version;
        }
      }

      return false;
    },

    visitExportNamedDeclaration(path) {
      if (t.VariableDeclaration.check(path.node.declaration)) {
        if (path.node.declaration.kind === 'const') {
          if (path.node.declaration.declarations.length === 1) {
            const { id, init } = path.node.declaration.declarations[0];
            frame[id.name] = init.value;
          }
        }
      }

      return false;
    },
  });
  // console.log(template);
  // console.log(frame);

  return { template, ...frame };
}

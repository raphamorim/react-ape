const ReactApeTree = new Map();

// Root information
// ReactApeTree.set('root', {});

/*
 * Internal usage for testing purpose since it is
 * a major rewrite of getLayout legacy
 */
if (process.env.NODE_ENV !== 'production') {
  window._reactApeTree = ReactApeTree;
}

/*
 * React Ape Tree:
 * - key | value
 * - randomId | ReactApeStyleNode
 *
 * ReactApeElement contains parent key once it's associated to the node
*/

// export type ReactApeStyleNode = {|
//   style: number, // props
// |};

// export type ReactApeNode = {|
//   style: ReactApeStyleNode,
// |};

// export type ReactApeTree = ReactApeNode[];

// Create Style reading parent styles and propagating
export function createStyleNodeByApeElement(apeElement) {
  let styleNode = {};
  if (apeElement.props && apeElement.props.style) {
    styleNode = { ...apeElement.props.style };
  }
  return styleNode;
}

// TODO: Replace ReactApeElement by layout information
export function insertNodeOnApeTree(apeId, apeElement) {
  const node = {
    style: createStyleNodeByApeElement(apeElement),
    parent: null
  };
  ReactApeTree.set(apeId, node);
}

export function associateNodeOnApeTree(parentApeId, childApeId) {
  const child = ReactApeTree.get(childApeId);
  ReactApeTree.set(childApeId, {...child, parent: parentApeId});
}

export function getNodeById(apeId) {
  return ReactApeTree.get(apeId); 
}
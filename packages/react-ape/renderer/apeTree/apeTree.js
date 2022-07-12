const ReactApeTree = new Map();

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
//   styleNode: ReactApeStyleNode,
// |};

// export type ReactApeTree = ReactApeNode[];

function createStyleNodeByApeElement(apeElement) {
  if (apeElement.props) {
    console.log(apeElement.props.style);
  }
  return {

  };
}

// TODO: Replace ReactApeElement by layout information
function insertNodeOnApeTreeFn(apeId, apeElement) {
  // createStyleNodeByApeElement(apeElement);
	ReactApeTree.set(apeId, apeElement);
}

function associateNodeOnApeTreeFn(parentApeId, childApeId) {
	const child = ReactApeTree.get(childApeId);
	ReactApeTree.set(childApeId, {...child, parent: parentApeId });
}

export const insertNodeOnApeTree = insertNodeOnApeTreeFn;
export const associateNodeOnApeTree = associateNodeOnApeTreeFn;
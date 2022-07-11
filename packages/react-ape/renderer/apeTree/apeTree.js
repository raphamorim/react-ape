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
 * - randomId | ReactApeElement
 *
 * ReactApeElement contains parent key once it's associated to the node
*/

function insertNodeOnApeTreeFn(apeId, apeElement) {
	ReactApeTree.set(apeId, apeElement);
}

function associateNodeOnApeTreeFn(parentApeId, childApeId) {
	const child = ReactApeTree.get(childApeId);
	ReactApeTree.set(childApeId, {...child, parent: parentApeId });
}

export const insertNodeOnApeTree = insertNodeOnApeTreeFn;
export const associateNodeOnApeTree = associateNodeOnApeTreeFn;
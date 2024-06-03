
//custom  hook to traverse tree and insert node at a specific folder
const useTraverseTree = () => {
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }
    const updatedItems = tree.items.map((ob) =>
      insertNode(ob, folderId, item, isFolder)
    );
    return { ...tree, items: updatedItems };
  }
  const deleteNode = () =>{}
  const updateNode = () =>{}
  return { insertNode,deleteNode,updateNode};
};

export default useTraverseTree;

import { Store } from '@tanstack/store';
import { useStore } from '@tanstack/react-store';
import type { Node, EditorConfig } from '../types';

interface EditorState {
  hierarchy: Node | null;
  selectedNode: Node | null;
  config: EditorConfig | null;
}

export const editorStore = new Store<EditorState>({
  hierarchy: null,
  selectedNode: null,
  config: null,
});

export const useEditorState = () => useStore(editorStore);

export const setHierarchy = (hierarchy: Node) => {
  editorStore.setState((state) => ({ ...state, hierarchy }));
};

export const setSelectedNode = (node: Node | null) => {
  editorStore.setState((state) => ({ ...state, selectedNode: node }));
};

export const setConfig = (config: EditorConfig) => {
  editorStore.setState((state) => ({ ...state, config }));
};

export const updateNodeMetadata = (nodeId: string, metadata: any) => {
  editorStore.setState((state) => {
    if (!state.hierarchy) return state;

    const updateRecursive = (node: Node): Node => {
      if (node.id === nodeId) {
        return { ...node, metadata: { ...node.metadata, ...metadata }, name: metadata.name || node.name };
      }
      if (node.children) {
        return { ...node, children: node.children.map(updateRecursive) };
      }
      return node;
    };

    const newHierarchy = updateRecursive(state.hierarchy);
    const newSelectedNode = state.selectedNode?.id === nodeId
        ? { ...state.selectedNode, metadata: { ...state.selectedNode.metadata, ...metadata }, name: metadata.name || state.selectedNode.name }
        : state.selectedNode;

    return { ...state, hierarchy: newHierarchy, selectedNode: newSelectedNode };
  });
};

export const addNode = (parentId: string, node: Node) => {
    editorStore.setState((state) => {
        if (!state.hierarchy) return state;

        const addRecursive = (curr: Node): Node => {
            if (curr.id === parentId) {
                return { ...curr, children: [...(curr.children || []), node] };
            }
            if (curr.children) {
                return { ...curr, children: curr.children.map(addRecursive) };
            }
            return curr;
        };

        return { ...state, hierarchy: addRecursive(state.hierarchy) };
    });
};

export const deleteNode = (nodeId: string) => {
    editorStore.setState((state) => {
        if (!state.hierarchy) return state;

        const deleteRecursive = (curr: Node): Node | null => {
            if (curr.id === nodeId) return null;
            if (curr.children) {
                return {
                    ...curr,
                    children: curr.children
                        .map(deleteRecursive)
                        .filter((n): n is Node => n !== null)
                };
            }
            return curr;
        };

        const newHierarchy = deleteRecursive(state.hierarchy);
        return {
            ...state,
            hierarchy: newHierarchy,
            selectedNode: state.selectedNode?.id === nodeId ? null : state.selectedNode
        };
    });
};

import type { DiffTreeNode, FileDiff } from "./types";

/**
 * Convert flat FileDiff array into hierarchical tree for rendering
 *
 * @param diffs - Parsed file diffs
 * @returns Tree structure optimized for UI rendering
 */
export function buildDiffTree(diffs: FileDiff[]): DiffTreeNode[] {
  const treeNodes: DiffTreeNode[] = [];

  for (const fileDiff of diffs) {
    const fileNode: DiffTreeNode = {
      type: "file",
      id: fileDiff.id,
      data: fileDiff,
      collapsed: false,
      children: [],
    };

    for (const [hunkIndex, hunk] of fileDiff.hunks.entries()) {
      const hunkNode: DiffTreeNode = {
        type: "hunk",
        id: `${fileDiff.id}-hunk-${hunkIndex}`,
        data: hunk,
        collapsed: false,
        children: [],
      };

      for (const [lineIndex, line] of hunk.lines.entries()) {
        const lineNode: DiffTreeNode = {
          type: "line",
          id: `${fileDiff.id}-hunk-${hunkIndex}-line-${lineIndex}`,
          data: line,
        };

        hunkNode.children?.push(lineNode);
      }

      fileNode.children?.push(hunkNode);
    }

    treeNodes.push(fileNode);
  }

  return treeNodes;
}

/**
 * Flatten tree back to array for virtualized rendering
 */
export function flattenDiffTree(tree: DiffTreeNode[]): DiffTreeNode[] {
  const flattened: DiffTreeNode[] = [];

  function traverse(nodes: DiffTreeNode[]): void {
    for (const node of nodes) {
      flattened.push(node);

      if (node.children && !node.collapsed) {
        traverse(node.children);
      }
    }
  }

  traverse(tree);
  return flattened;
}

/**
 * Toggle collapsed state for a specific node
 */
export function toggleNodeCollapse(
  tree: DiffTreeNode[],
  nodeId: string
): DiffTreeNode[] {
  function toggleNode(nodes: DiffTreeNode[]): DiffTreeNode[] {
    return nodes.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          collapsed: !node.collapsed,
        };
      }

      if (node.children) {
        return {
          ...node,
          children: toggleNode(node.children),
        };
      }

      return node;
    });
  }

  return toggleNode(tree);
}

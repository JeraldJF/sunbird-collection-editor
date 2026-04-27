import React from 'react';
import { Tree, NodeApi } from 'react-arborist';
import { useEditorState, setSelectedNode, addNode, deleteNode } from '../../store/editorStore';
import { MdFolder, MdInsertDriveFile, MdChevronRight, MdKeyboardArrowDown, MdAdd, MdDelete } from 'react-icons/md';
import { clsx } from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import type { Node } from '../../types';

const SidebarTree: React.FC = () => {
  const { hierarchy } = useEditorState();

  const data = hierarchy ? [hierarchy] : [];

  return (
    <div className="w-80 border-r bg-gray-50 h-full overflow-hidden flex flex-col">
      <div className="p-4 border-b bg-white flex justify-between items-center">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Structure</h2>
      </div>
      <div className="flex-1 overflow-auto p-2">
        <Tree<Node>
          initialData={data}
          openByDefault={true}
          width={300}
          height={800}
          indent={20}
          rowHeight={36}
          onSelect={(nodes) => {
            if (nodes.length > 0) {
              setSelectedNode(nodes[0].data);
            }
          }}
        >
          {NodeRenderer}
        </Tree>
      </div>
    </div>
  );
};

const NodeRenderer = ({ node, style, dragHandle }: { node: NodeApi<Node>, style: React.CSSProperties, dragHandle?: any }) => {
  const isSelected = node.isSelected;
  const isFolder = !node.isLeaf;

  const handleAddUnit = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newUnit = {
        id: uuidv4(),
        name: 'New Unit',
        primaryCategory: 'Textbook Unit',
        mimeType: 'application/vnd.ekstep.content-collection',
        children: []
    };
    addNode(node.data.id, newUnit);
  };

  const handleAddContent = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newContent = {
        id: uuidv4(),
        name: 'New Content',
        primaryCategory: 'Learning Resource',
        mimeType: 'application/pdf',
    };
    addNode(node.data.id, newContent);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.data.root) return;
    deleteNode(node.data.id);
  };

  return (
    <div
      style={style}
      ref={dragHandle}
      className={clsx(
        "group flex items-center gap-1 px-2 rounded-md cursor-pointer transition-colors",
        isSelected ? "bg-primary-light text-primary font-medium" : "hover:bg-gray-200 text-gray-700"
      )}
      onClick={() => {
        node.select();
        if (isFolder && !node.isOpen) {
            node.open();
        }
      }}
    >
      <div className="w-4 flex items-center justify-center">
        {isFolder && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              node.toggle();
            }}
            className="hover:bg-gray-300 rounded p-0.5"
          >
            {node.isOpen ? <MdKeyboardArrowDown /> : <MdChevronRight />}
          </button>
        )}
      </div>

      <span className={clsx(isSelected ? "text-primary" : "text-gray-400")}>
        {isFolder ? <MdFolder size={18} /> : <MdInsertDriveFile size={18} />}
      </span>

      <span className="truncate text-sm flex-1">
        {node.data.name}
      </span>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {isFolder && (
            <>
                <button onClick={handleAddUnit} title="Add Unit" className="p-1 hover:bg-white rounded text-blue-500 shadow-sm border">
                    <MdAdd size={14} />
                </button>
                <button onClick={handleAddContent} title="Add Content" className="p-1 hover:bg-white rounded text-green-500 shadow-sm border">
                    <MdInsertDriveFile size={14} />
                </button>
            </>
        )}
        {!node.data.root && (
            <button onClick={handleDelete} title="Delete" className="p-1 hover:bg-white rounded text-red-500 shadow-sm border">
                <MdDelete size={14} />
            </button>
        )}
      </div>
    </div>
  );
};

export default SidebarTree;

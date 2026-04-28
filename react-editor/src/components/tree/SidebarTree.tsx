import React, { useState } from 'react';
import { useEditorState, setSelectedNode, addNode, deleteNode, moveNode, addSibling, setMode } from '../../store/editorStore';
import { Tree, type NodeApi } from 'react-arborist';
import { MdFolder, MdInsertDriveFile, MdChevronRight, MdKeyboardArrowDown, MdAdd, MdDelete, MdMoreVert } from 'react-icons/md';
import { clsx } from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import type { Node } from '../../types';
import CsvUpload from '../library/CsvUpload';

const SidebarTree: React.FC = () => {
  const { hierarchy, selectedNode } = useEditorState();
  const [showCsv, setShowCsv] = useState(false);

  const data = hierarchy ? [hierarchy] : [];

  return (
    <div className="w-64 border-r bg-gray-50 h-full overflow-hidden flex flex-col">
      <div className="p-4 border-b bg-white flex justify-between items-center">
        <h2 className="text-sm font-medium text-gray-700">Folders</h2>
        <div className="text-[#00529b] cursor-pointer" onClick={() => setShowCsv(true)}>
          <MdMoreVert size={20} />
        </div>
      </div>
      <div className="flex-1 overflow-auto p-2">
        <Tree<Node>
          data={data}
          openByDefault={true}
          width={300}
          height={600}
          indent={20}
          rowHeight={36}
          onSelect={(nodes) => {
            if (nodes.length > 0) {
              setSelectedNode(nodes[0].data);
            }
          }}
          onMove={({ dragIds, parentId, index }) => {
            moveNode(dragIds[0], parentId, index);
          }}
        >
          {NodeRenderer}
        </Tree>
      </div>

      <div className="bg-white border-t flex items-center h-14">
        <div className="flex-1 flex divide-x border-r h-full">
            <button
                onClick={() => {
                    const referenceId = selectedNode?.id;
                    if (!referenceId) return;

                    const newUnit = {
                        id: uuidv4(),
                        name: 'New Unit',
                        primaryCategory: 'Textbook Unit',
                        mimeType: 'application/vnd.ekstep.content-collection',
                        children: []
                    };

                    addSibling(referenceId, newUnit);
                }}
                className="flex-1 flex items-center justify-center gap-1 px-2 text-[#00529b] hover:bg-gray-50 text-[11px] font-medium transition-all disabled:opacity-50"
                disabled={!selectedNode || selectedNode.id === hierarchy?.id}
            >
                <MdAdd size={16} className="text-[#00529b]" /> Add Sibling
            </button>
            <button
                onClick={() => {
                   const targetId = selectedNode?.id || hierarchy?.id;
                   if (!targetId) return;

                   const newContent = {
                        id: uuidv4(),
                        name: 'New Content',
                        primaryCategory: 'Learning Resource',
                        mimeType: 'application/pdf',
                    };
                    addNode(targetId, newContent);
                }}
                className="flex-1 flex items-center justify-center gap-1 px-2 text-[#00529b] hover:bg-gray-50 text-[11px] font-medium transition-all disabled:opacity-50"
                disabled={!hierarchy}
            >
                <MdAdd size={16} className="text-[#00529b]" /> Add Child
            </button>
        </div>
      </div>

      {showCsv && <CsvUpload onClose={() => setShowCsv(false)} />}
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

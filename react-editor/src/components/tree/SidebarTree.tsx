import React, { useState } from 'react';
import { useEditorState, setSelectedNode, addNode, deleteNode, moveNode, addSibling } from '../../store/editorStore';
import { Tree, type NodeApi } from 'react-arborist';
import { MdChevronRight, MdKeyboardArrowDown, MdAdd, MdDelete, MdMoreVert, MdBook, MdFolderOpen, MdDescription } from 'react-icons/md';
import { clsx } from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import type { Node } from '../../types';
import CsvUpload from '../library/CsvUpload';

const SidebarTree: React.FC = () => {
  const { hierarchy, selectedNode } = useEditorState();
  const [showCsv, setShowCsv] = useState(false);

  const data = hierarchy ? [hierarchy] : [];

  return (
    <div className="w-80 border-r bg-white h-full overflow-hidden flex flex-col shadow-sm">
      <div className="p-4 border-b bg-white flex justify-between items-center h-[64px]">
        <h2 className="text-lg font-medium text-gray-700 ml-2">Folders</h2>
        <div className="text-[#00529b] cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors" onClick={() => setShowCsv(true)}>
          <MdMoreVert size={24} />
        </div>
      </div>
      <div className="flex-1 overflow-hidden py-4">
        <Tree<Node>
          data={data}
          openByDefault={true}
          width={320}
          height={800} // Set a reasonable default or use ResizeObserver for full responsiveness
          indent={24}
          rowHeight={40}
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

      <div className="bg-white border-t flex items-center h-16 px-4 gap-2">
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
                className="flex-1 flex items-center justify-center gap-2 h-10 border border-gray-200 rounded text-[#00529b] hover:bg-gray-50 text-sm font-medium transition-all disabled:opacity-50"
                disabled={!selectedNode || selectedNode.id === hierarchy?.id}
            >
                <MdAdd size={20} /> Add Sibling
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
                className="flex-1 flex items-center justify-center gap-2 h-10 border border-gray-200 rounded text-[#00529b] hover:bg-gray-50 text-sm font-medium transition-all disabled:opacity-50"
                disabled={!hierarchy}
            >
                <MdAdd size={20} /> Add Child
            </button>
      </div>

      {showCsv && <CsvUpload onClose={() => setShowCsv(false)} />}
    </div>
  );
};

const NodeRenderer = ({ node, style, dragHandle }: { node: NodeApi<Node>, style: React.CSSProperties, dragHandle?: any }) => {
  const isSelected = node.isSelected;
  const isRoot = node.data.root;
  const isCollection = node.data.mimeType === 'application/vnd.ekstep.content-collection';

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRoot) return;
    deleteNode(node.data.id);
  };

  return (
    <div
      style={style}
      ref={dragHandle}
      className={clsx(
        "group flex items-center gap-2 px-4 cursor-pointer transition-all border-l-4",
        isSelected ? "bg-[#f0f7ff] text-[#004a92] font-semibold border-[#004a92]" : "hover:bg-gray-50 text-gray-700 border-transparent"
      )}
      onClick={() => {
        node.select();
        if (isCollection && !node.isOpen) {
            node.open();
        }
      }}
    >
      <div className="w-4 flex items-center justify-center">
        {isCollection && node.children && node.children.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              node.toggle();
            }}
            className="hover:bg-gray-200 rounded p-0.5"
          >
            {node.isOpen ? <MdKeyboardArrowDown size={18} /> : <MdChevronRight size={18} />}
          </button>
        )}
      </div>

      <span className={clsx(isSelected ? "text-[#004a92]" : "text-gray-500")}>
        {isRoot ? <MdBook size={20} /> : (isCollection ? <MdFolderOpen size={20} /> : <MdDescription size={20} />)}
      </span>

      <span className="truncate text-sm flex-1 ml-1">
        {node.data.name}
      </span>

      {!isRoot && (
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={handleDelete} title="Delete" className="p-1 hover:text-red-500 text-gray-400">
                <MdDelete size={18} />
            </button>
        </div>
      )}
    </div>
  );
};

export default SidebarTree;

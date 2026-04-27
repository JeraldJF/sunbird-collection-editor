import React from 'react';
import { useEditorState } from '../../store/editorStore';
import { MdSave, MdSend, MdPreview, MdArrowBack } from 'react-icons/md';

const Header: React.FC = () => {
  const { selectedNode, hierarchy } = useEditorState();

  return (
    <div className="flex flex-col w-full shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary px-6 py-2 flex items-center justify-between text-white">
        <button className="flex items-center gap-2 hover:bg-white/10 px-3 py-1 rounded transition-colors text-sm font-medium">
          <MdArrowBack size={18} />
          Back
        </button>
      </div>

      {/* Main Toolbar */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-800">
            {hierarchy?.name || 'Loading Editor...'}
          </h1>
          {selectedNode && (
            <p className="text-xs text-gray-500 mt-1">
              Selected: <span className="font-semibold">{selectedNode.name}</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary-light rounded-md transition-all text-sm font-semibold">
            <MdPreview size={20} />
            Preview
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary-light rounded-md transition-all text-sm font-semibold">
            <MdSave size={20} />
            Save as Draft
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded-md transition-all text-sm font-semibold shadow-sm">
            <MdSend size={20} />
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

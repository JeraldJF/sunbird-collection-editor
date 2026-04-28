import React, { useState } from 'react';
import { useEditorState } from '../../store/editorStore';
import { MdSave, MdSend, MdPreview, MdArrowBack, MdTableChart, MdPeople } from 'react-icons/md';
import CsvUpload from '../library/CsvUpload';
import CollaboratorModal from '../library/CollaboratorModal';

const Header: React.FC = () => {
  const { selectedNode, hierarchy } = useEditorState();
  const [showCsv, setShowCsv] = useState(false);
  const [showCollaborators, setShowCollaborators] = useState(false);

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
          <button
            onClick={() => setShowCollaborators(true)}
            className="p-2.5 text-gray-400 hover:text-primary hover:bg-primary-light rounded-xl transition-all shadow-sm border"
            title="Manage Collaborators"
          >
            <MdPeople size={22} />
          </button>
          <button
            onClick={() => setShowCsv(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl transition-all text-sm font-bold shadow-sm"
          >
            <MdTableChart size={20} className="text-emerald-500" />
            Bulk Actions
          </button>
          <div className="h-6 w-px bg-gray-200 mx-2" />
          <button className="flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary-light rounded-xl transition-all text-sm font-bold shadow-sm">
            <MdPreview size={20} />
            Preview
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary-light rounded-xl transition-all text-sm font-bold shadow-sm">
            <MdSave size={20} />
            Save Draft
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white hover:bg-primary-dark rounded-xl transition-all text-sm font-bold shadow-lg active:scale-95">
            <MdSend size={20} />
            Submit
          </button>
        </div>
      </div>

      {showCsv && <CsvUpload onClose={() => setShowCsv(false)} />}
      {showCollaborators && <CollaboratorModal onClose={() => setShowCollaborators(false)} />}
    </div>
  );
};

export default Header;

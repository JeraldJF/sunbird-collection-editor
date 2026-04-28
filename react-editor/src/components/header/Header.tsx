import React, { useState } from 'react';
import { useEditorState } from '../../store/editorStore';
import { MdArrowBack, MdPeople, MdQrCode2, MdKeyboardArrowDown } from 'react-icons/md';
import CsvUpload from '../library/CsvUpload';
import CollaboratorModal from '../library/CollaboratorModal';

const Header: React.FC = () => {
  const { hierarchy } = useEditorState();
  const [showCsv, setShowCsv] = useState(false);
  const [showCollaborators, setShowCollaborators] = useState(false);

  return (
    <div className="flex flex-col w-full shadow-sm">
      {/* Top Bar */}
      <div className="bg-[#00529b] px-6 py-2 flex items-center justify-between text-white">
        <button className="flex items-center gap-2 hover:bg-white/10 px-3 py-1 rounded transition-colors text-sm font-medium">
          <MdArrowBack size={18} />
          Back
        </button>
      </div>

      {/* Main Toolbar */}
      <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium text-gray-800">
            {hierarchy?.name || 'Loading Editor...'}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowCollaborators(true)}
            className="p-1.5 text-blue-900 hover:bg-gray-100 rounded transition-all"
            title="Manage Collaborators"
          >
            <MdPeople size={24} />
          </button>

          <div className="relative group">
            <button className="flex items-center gap-1 px-3 py-1.5 text-blue-900 hover:bg-gray-100 rounded transition-all text-sm font-medium">
              <MdQrCode2 size={20} />
              QR Code
              <MdKeyboardArrowDown size={18} />
            </button>
          </div>

          <div className="h-8 w-px bg-gray-300 mx-1" />

          <button className="flex items-center gap-2 px-6 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded text-sm font-medium transition-all">
            Save as Draft
          </button>
        </div>
      </div>

      {showCsv && <CsvUpload onClose={() => setShowCsv(false)} />}
      {showCollaborators && <CollaboratorModal onClose={() => setShowCollaborators(false)} />}
    </div>
  );
};

export default Header;

import React, { useState, useEffect } from 'react';
import { MdClose, MdSearch, MdArrowDropDown } from 'react-icons/md';

const CollaboratorModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'add' | 'manage'>('add');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const collaborators = [
    { id: '1', name: 'ContentCreator2', org: 'Sunbird Org', initial: 'C' },
    { id: '2', name: 'Content Creator', org: 'Sunbird Org', initial: 'C' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white">
      {/* Header */}
      <div className="bg-[#004a92] text-white p-4 flex items-center justify-between shadow-md relative">
        <h2 className="text-xl font-medium px-4">Collaborators</h2>
        <div className="flex items-center gap-4 flex-1 max-w-xl justify-end">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-white text-gray-800 pl-4 pr-10 py-1.5 rounded text-sm outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MdSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          </div>
        </div>
        <button onClick={onClose} className="ml-4 p-1 hover:bg-white/10 rounded transition-colors self-start absolute top-2 right-2">
          <MdClose size={24} />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-[#f0f7ff] flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="bg-white px-8 pt-6 border-b border-gray-200">
           <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('add')}
                className={`pb-2 px-1 text-base transition-all relative ${activeTab === 'add' ? 'text-[#004a92] font-semibold border-b-2 border-[#004a92]' : 'text-gray-600 hover:text-gray-800'}`}
              >
                Add Collaborators
              </button>
              <button
                onClick={() => setActiveTab('manage')}
                className={`pb-2 px-1 text-base transition-all relative ${activeTab === 'manage' ? 'text-[#004a92] font-semibold border-b-2 border-[#004a92]' : 'text-gray-600 hover:text-gray-800'}`}
              >
                Manage Collaborators
              </button>
           </div>
        </div>

        {/* Results Info and Sort */}
        <div className="px-8 py-4 flex justify-between items-center">
           <div className="text-gray-700 font-medium">
              Showing {collaborators.length} out of {collaborators.length}
           </div>
           <div className="flex items-center bg-white border border-gray-300 rounded px-3 py-1 cursor-pointer">
              <span className="text-sm text-gray-700">Sort By</span>
              <MdArrowDropDown size={20} className="text-gray-500" />
           </div>
        </div>

        {/* Cards Grid */}
        <div className="flex-1 overflow-auto px-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {collaborators.map(person => (
              <div key={person.id} className="bg-white border border-gray-200 p-4 rounded shadow-sm hover:shadow-md transition-all flex items-start gap-4">
                <div className="w-14 h-14 bg-[#2e4a62] text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                  {person.initial}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm">{person.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{person.org}</p>
                  <div className="mt-4 flex justify-end">
                    <button className="text-[#004a92] text-sm font-bold flex items-center gap-1 hover:underline">
                      <span className="text-lg">+</span> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#f0f7ff] p-4 border-t border-gray-200 flex justify-end">
         <button
            onClick={onClose}
            className="bg-[#cccccc] text-white px-8 py-2 rounded font-medium hover:bg-gray-400 transition-colors"
         >
            Done
         </button>
      </div>
    </div>
  );
};

export default CollaboratorModal;

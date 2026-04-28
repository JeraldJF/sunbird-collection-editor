import React, { useState, useEffect } from 'react';
import { MdSearch, MdAdd, MdClose } from 'react-icons/md';
import { useEditorState, addNode } from '../../store/editorStore';
import { v4 as uuidv4 } from 'uuid';

const Library: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedNode } = useEditorState();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const mockLibraryData = [
    { id: 'lib_1', name: 'Newton\'s Laws Video', primaryCategory: 'Explanation Content', mimeType: 'video/mp4' },
    { id: 'lib_2', name: 'Calculus Worksheet', primaryCategory: 'Learning Resource', mimeType: 'application/pdf' },
    { id: 'lib_3', name: 'Quantum Mechanics Intro', primaryCategory: 'Explanation Content', mimeType: 'video/mp4' },
    { id: 'lib_4', name: 'Periodic Table PDF', primaryCategory: 'Learning Resource', mimeType: 'application/pdf' },
  ];

  const filteredData = mockLibraryData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (item: any) => {
    if (selectedNode) {
        addNode(selectedNode.id, { ...item, id: uuidv4() });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl max-h-[80vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between bg-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Add from Library</h2>
            <p className="text-sm text-gray-500">Search and add existing content to your collection</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors" aria-label="Close Library">
            <MdClose size={24} />
          </button>
        </div>

        <div className="p-6 border-b flex items-center gap-4">
          <div className="flex-1 relative">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search content..."
              className="w-full pl-12 pr-4 py-3 border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredData.map(item => (
              <div key={item.id} className="p-4 border rounded-2xl flex items-center justify-between hover:bg-gray-50 transition-colors border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={item.mimeType === 'video/mp4' ? 'p-3 bg-red-50 text-red-500 rounded-xl' : 'p-3 bg-blue-50 text-blue-500 rounded-xl'}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {item.mimeType === 'video/mp4' ? (
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        ) : (
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        )}
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.primaryCategory}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAdd(item)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-all shadow-md active:scale-95"
                >
                  <MdAdd size={18} />
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;

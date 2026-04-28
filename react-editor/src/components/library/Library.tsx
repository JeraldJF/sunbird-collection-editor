import React, { useState, useEffect } from 'react';
import { MdSearch, MdAdd, MdArrowBack } from 'react-icons/md';
import { useEditorState, addNode, setMode } from '../../store/editorStore';
import { v4 as uuidv4 } from 'uuid';

const Library: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedNode } = useEditorState();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') setMode('edit');
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

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
    <div className="flex flex-col h-screen bg-white font-sans antialiased text-gray-900">
        {/* Full-width Blue Header */}
        <div className="bg-[#00529b] px-6 py-4 flex items-center gap-4 text-white">
            <button onClick={() => setMode('edit')} className="p-2 hover:bg-white/10 rounded transition-colors flex items-center gap-2">
                <MdArrowBack size={24} />
                <span className="font-bold">Back</span>
            </button>
            <h1 className="text-xl font-bold">Add from Library</h1>
        </div>

        <div className="p-6 border-b bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Search Content</h2>
            <p className="text-xs text-gray-500">Search and add existing content to your collection</p>
          </div>
          <div className="flex-1 max-w-md relative">
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

        <div className="flex-1 overflow-auto p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map(item => (
              <div key={item.id} className="bg-white p-5 border rounded-3xl flex flex-col gap-6 hover:shadow-xl transition-all border-gray-200 group">
                <div className="flex items-center gap-4">
                  <div className={item.mimeType === 'video/mp4' ? 'p-4 bg-red-50 text-red-600 rounded-2xl group-hover:bg-red-100 transition-colors' : 'p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-100 transition-colors'}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {item.mimeType === 'video/mp4' ? (
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        ) : (
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        )}
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 line-clamp-2 leading-tight">{item.name}</h4>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-[10px] font-bold text-gray-500 rounded uppercase tracking-wider">
                        {item.primaryCategory}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-gray-400">ID: {item.id}</span>
                    <button
                    onClick={() => handleAdd(item)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-2xl text-sm font-black hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 active:scale-95"
                    >
                    <MdAdd size={20} />
                    Add Content
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default Library;

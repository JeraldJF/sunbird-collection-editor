import React, { useState, useEffect } from 'react';
import { MdSearch, MdAdd, MdArrowBack } from 'react-icons/md';
import { useEditorState, addNode, setMode } from '../../store/editorStore';
import { v4 as uuidv4 } from 'uuid';
import SunbirdPlayer from '../players/SunbirdPlayer';
import { clsx } from 'clsx';

const Library: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLibraryItem, setSelectedLibraryItem] = useState<any>(null);
  const { selectedNode } = useEditorState();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') setMode('edit');
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const mockLibraryData = [
    {
      id: 'lib_1',
      name: 'Newton\'s Laws Video',
      primaryCategory: 'Explanation Content',
      mimeType: 'video/mp4',
      metadata: { artifactUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' }
    },
    {
      id: 'lib_2',
      name: 'Calculus Worksheet',
      primaryCategory: 'Learning Resource',
      mimeType: 'application/pdf',
      metadata: { artifactUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
    },
    {
      id: 'lib_3',
      name: 'Quantum Mechanics Intro',
      primaryCategory: 'Explanation Content',
      mimeType: 'video/mp4',
      metadata: { artifactUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' }
    },
    {
      id: 'lib_4',
      name: 'Periodic Table PDF',
      primaryCategory: 'Learning Resource',
      mimeType: 'application/pdf',
      metadata: { artifactUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
    },
  ];

  const filteredData = mockLibraryData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (item: any) => {
    if (selectedNode) {
        addNode(selectedNode.id, { ...item, id: uuidv4() });
    }
  };

  const getPlayerElement = (mimeType?: string) => {
    switch (mimeType) {
      case 'application/pdf':
        return 'sunbird-pdf-player';
      case 'video/mp4':
      case 'video/webm':
        return 'sunbird-video-player';
      case 'application/vnd.sunbird.questionset':
        return 'sunbird-quml-player';
      case 'application/epub+zip':
        return 'sunbird-epub-player';
      default:
        return 'sunbird-content-player';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white font-sans antialiased text-gray-900">
        {/* Header */}
        <div className="bg-[#00529b] px-6 py-4 flex items-center gap-4 text-white">
            <button onClick={() => setMode('edit')} className="p-2 hover:bg-white/10 rounded transition-colors flex items-center gap-2">
                <MdArrowBack size={24} />
                <span className="font-bold">Back</span>
            </button>
            <h1 className="text-xl font-bold">Add from Library</h1>
        </div>

        <div className="flex flex-1 overflow-hidden">
            {/* Left Column: Search and List */}
            <div className="w-1/3 border-r flex flex-col bg-gray-50">
                <div className="p-4 border-b bg-white">
                    <div className="relative">
                        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search content..."
                            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-auto p-2 space-y-2">
                    {filteredData.map(item => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedLibraryItem(item)}
                            className={clsx(
                                "p-3 rounded-xl cursor-pointer transition-all border",
                                selectedLibraryItem?.id === item.id
                                    ? "bg-primary-light border-primary"
                                    : "bg-white border-transparent hover:border-gray-200"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <div className={clsx(
                                    "p-2 rounded-lg shrink-0",
                                    item.mimeType === 'video/mp4' ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                                )}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {item.mimeType === 'video/mp4' ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        )}
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 text-sm truncate">{item.name}</h4>
                                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{item.primaryCategory}</span>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAdd(item);
                                    }}
                                    className="p-1.5 hover:bg-white rounded-lg text-primary shadow-sm border border-transparent hover:border-gray-200"
                                >
                                    <MdAdd size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: Preview */}
            <div className="flex-1 bg-white flex flex-col">
                {selectedLibraryItem ? (
                    <div className="flex-1 flex flex-col p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900">{selectedLibraryItem.name}</h2>
                                <p className="text-sm text-gray-500 mt-1">{selectedLibraryItem.primaryCategory}</p>
                            </div>
                            <button
                                onClick={() => handleAdd(selectedLibraryItem)}
                                className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/25 hover:scale-105 active:scale-95 transition-all"
                            >
                                <MdAdd size={24} />
                                Add to Collection
                            </button>
                        </div>
                        <div className="flex-1 bg-gray-100 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center border-4 border-gray-50">
                            <SunbirdPlayer
                                playerElement={getPlayerElement(selectedLibraryItem.mimeType)}
                                playerConfig={{
                                    context: {},
                                    config: {},
                                    metadata: {
                                        ...selectedLibraryItem,
                                        ...selectedLibraryItem.metadata
                                    }
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50">
                         <div className="bg-white p-8 rounded-full shadow-sm mb-6">
                            <svg className="w-16 h-16 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                            </svg>
                        </div>
                        <p className="text-lg font-medium">Select an item from the list to preview</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default Library;

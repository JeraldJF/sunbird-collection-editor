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
    <div className="flex flex-col h-screen bg-[#edf4f9] font-sans antialiased text-gray-900">
        {/* Header */}
        <div className="bg-[#004a92] px-4 py-3 flex items-center justify-between text-white shadow-md">
            <div className="flex items-center gap-4">
                <button onClick={() => setMode('edit')} className="p-1 hover:bg-white/10 rounded transition-colors">
                    <MdArrowBack size={24} />
                </button>
                <h1 className="text-lg font-semibold">Add from Library</h1>
            </div>
            <div className="flex items-center gap-4 flex-1 max-w-2xl px-8">
                <div className="relative flex-1">
                    <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search Library"
                        className="w-full pl-10 pr-4 py-2 rounded-md border-none focus:ring-2 focus:ring-white/20 outline-none transition-all text-sm text-gray-800"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="text-sm font-medium flex items-center gap-1 hover:underline whitespace-nowrap">
                    Change Filters <span className="text-[10px]">▼</span>
                </button>
            </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
            {/* Left Column: Search and List */}
            <div className="w-[400px] flex flex-col bg-[#edf4f9] p-4">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col">
                        <h2 className="text-[#004a92] font-bold text-lg">Showing ({filteredData.length}) most relevant content</h2>
                        <p className="text-xs text-gray-500">Use search and filters above to find more content</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <span className="text-xs font-medium text-gray-600">Sort By</span>
                        <select className="text-xs border rounded px-2 py-1 bg-white outline-none">
                            <option>A - Z</option>
                            <option>Newest</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-5 bg-gray-300 rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <span className="text-xs font-medium text-gray-700">Show content added to collection</span>
                </div>

                <div className="flex-1 overflow-auto space-y-px rounded-md border border-gray-200 shadow-sm bg-white">
                    {filteredData.map(item => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedLibraryItem(item)}
                            className={clsx(
                                "p-4 cursor-pointer transition-all border-b last:border-b-0 flex flex-col gap-2",
                                selectedLibraryItem?.id === item.id
                                    ? "bg-[#f8faff] border-l-4 border-l-[#004a92]"
                                    : "bg-white border-l-4 border-l-transparent hover:bg-gray-50"
                            )}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1 min-w-0 pr-2">
                                    <h4 className="font-bold text-[#004a92] text-sm truncate">{item.name}</h4>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAdd(item);
                                    }}
                                    className="shrink-0 flex items-center gap-1 px-3 py-1 bg-[#008840] text-white rounded text-xs font-bold hover:bg-[#007035] transition-colors"
                                >
                                    <MdAdd size={14} />
                                    Select content
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: Preview */}
            <div className="flex-1 bg-white flex flex-col m-4 rounded-md shadow-sm overflow-hidden border border-gray-200">
                {selectedLibraryItem ? (
                    <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                            <h2 className="text-xl font-bold text-[#004a92] truncate">{selectedLibraryItem.name}</h2>
                            <button
                                onClick={() => handleAdd(selectedLibraryItem)}
                                className="flex items-center gap-1 px-4 py-2 bg-[#008840] text-white rounded font-bold shadow-sm hover:bg-[#007035] transition-all text-sm"
                            >
                                <MdAdd size={18} />
                                Select content
                            </button>
                        </div>
                        <div className="flex-1 bg-white flex items-center justify-center p-8">
                            <div className="w-full h-full max-w-5xl border shadow-lg rounded overflow-hidden">
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

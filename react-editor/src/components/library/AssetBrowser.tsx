import React, { useState } from 'react';
import { MdClose, MdCloudUpload, MdSearch } from 'react-icons/md';

const AssetBrowser: React.FC<{ onClose: () => void, onSelect: (url: string) => void }> = ({ onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockAssets = [
    { id: 'a1', name: 'Science Icon', url: 'https://placehold.co/100x100?text=Science' },
    { id: 'a2', name: 'Math Icon', url: 'https://placehold.co/100x100?text=Math' },
    { id: 'a3', name: 'Biology Icon', url: 'https://placehold.co/100x100?text=Biology' },
    { id: 'a4', name: 'History Icon', url: 'https://placehold.co/100x100?text=History' },
    { id: 'a5', name: 'Physics Icon', url: 'https://placehold.co/100x100?text=Physics' },
    { id: 'a6', name: 'General Icon', url: 'https://placehold.co/100x100?text=General' },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-3xl max-h-[80vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="p-6 border-b flex items-center justify-between bg-gray-50">
          <h2 className="text-xl font-black text-gray-800 uppercase tracking-widest">Select App Icon</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full">
            <MdClose size={24} />
          </button>
        </div>

        <div className="p-6 border-b flex items-center gap-4 bg-white">
          <div className="flex-1 relative">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search assets..."
              className="w-full pl-12 pr-4 py-3 border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all border">
            <MdCloudUpload size={20} />
            Upload New
          </button>
        </div>

        <div className="flex-1 overflow-auto p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {mockAssets.map(asset => (
                    <div
                        key={asset.id}
                        className="group cursor-pointer space-y-2"
                        onClick={() => {
                            onSelect(asset.url);
                            onClose();
                        }}
                    >
                        <div className="aspect-square bg-gray-50 rounded-2xl border overflow-hidden group-hover:border-primary transition-all ring-primary/20 group-hover:ring-4 relative shadow-sm">
                            <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="bg-white text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">Select</span>
                            </div>
                        </div>
                        <p className="text-center text-xs font-bold text-gray-600 truncate">{asset.name}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AssetBrowser;

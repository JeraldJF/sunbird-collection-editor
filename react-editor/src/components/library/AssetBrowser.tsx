import React, { useState, useEffect } from 'react';
import { MdClose, MdCloudUpload, MdSearch } from 'react-icons/md';

const AssetBrowser: React.FC<{ onClose: () => void, onSelect: (url: string) => void }> = ({ onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const mockAssets = [
    { id: '1', url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=200', name: 'Science Icon' },
    { id: '2', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=200', name: 'Math Icon' },
    { id: '3', url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=200', name: 'History Icon' },
    { id: '4', url: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=200', name: 'English Icon' },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white w-full max-w-4xl rounded shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b flex items-center justify-between bg-[#004a92] text-white">
          <h2 className="text-lg font-bold">Select Asset</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded transition-colors">
            <MdClose size={24} />
          </button>
        </div>

        <div className="p-6 border-b flex gap-4 bg-gray-50 items-center">
          <div className="flex-1 relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search assets..."
              className="w-full pl-10 pr-4 py-2 border rounded focus:ring-1 focus:ring-[#004a92] outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-4 py-2 bg-white border border-[#004a92] text-[#004a92] rounded font-bold text-sm hover:bg-blue-50 transition-all flex items-center gap-2">
            <MdCloudUpload size={18} />
            Upload New
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6">
            {mockAssets.map(asset => (
              <div
                key={asset.id}
                className="group cursor-pointer flex flex-col gap-2"
                onClick={() => {
                  onSelect(asset.url);
                  onClose();
                }}
              >
                <div className="aspect-square bg-white border rounded overflow-hidden group-hover:border-[#004a92] transition-all relative">
                  <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all" />
                </div>
                <p className="text-xs font-medium text-center text-gray-600 truncate">{asset.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-t bg-gray-50 flex justify-end">
           <button onClick={onClose} className="px-6 py-2 border border-gray-300 bg-white rounded font-bold text-sm hover:bg-gray-100 transition-all">
             Cancel
           </button>
        </div>
      </div>
    </div>
  );
};

export default AssetBrowser;

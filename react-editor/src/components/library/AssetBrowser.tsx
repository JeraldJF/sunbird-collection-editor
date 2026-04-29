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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        <div className="p-6 border-b flex items-center justify-between bg-gray-50">
          <div>
            <h2 className="text-xl font-black text-gray-800 uppercase tracking-widest">Select Asset</h2>
            <p className="text-xs text-gray-500 mt-1 font-bold">Choose an icon for your collection</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors shadow-sm bg-white border">
            <MdClose size={20} />
          </button>
        </div>

        <div className="p-6 border-b flex gap-4 bg-white">
          <div className="flex-1 relative">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search assets..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-6 bg-white border-2 border-dashed border-gray-200 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-all flex items-center gap-2">
            <MdCloudUpload size={18} />
            Upload New
          </button>
        </div>

        <div className="flex-1 overflow-auto p-8 bg-gray-50/30">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {mockAssets.map(asset => (
              <div
                key={asset.id}
                className="group cursor-pointer space-y-3"
                onClick={() => {
                  onSelect(asset.url);
                  onClose();
                }}
              >
                <div className="aspect-square bg-white border-2 border-white rounded-2xl shadow-sm overflow-hidden group-hover:shadow-xl group-hover:ring-4 group-hover:ring-primary/20 transition-all">
                  <img src={asset.url} alt={asset.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <p className="text-[10px] font-black text-center text-gray-400 uppercase tracking-widest group-hover:text-primary transition-colors">{asset.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetBrowser;

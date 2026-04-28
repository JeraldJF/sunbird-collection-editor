import React, { useState, useEffect } from 'react';
import { MdClose, MdCloudUpload, MdDownload, MdCheckCircle } from 'react-icons/md';

const CsvUpload: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setComplete(true);
      setTimeout(onClose, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Bulk Upload</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <MdClose size={20} />
          </button>
        </div>

        <div className="p-8">
          {!complete ? (
            <div className="space-y-6">
              <div
                className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 hover:border-primary hover:bg-primary-light/10 transition-all cursor-pointer"
                onClick={() => document.getElementById('csvInput')?.click()}
              >
                <div className="p-4 bg-primary-light text-primary rounded-2xl shadow-sm">
                    <MdCloudUpload size={32} />
                </div>
                <div className="text-center">
                    <p className="font-bold text-gray-700">Click to upload CSV</p>
                    <p className="text-xs text-gray-400 mt-1">or drag and drop file here</p>
                </div>
                <input
                    id="csvInput"
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>

              {file && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg">
                            <MdCheckCircle size={20} />
                         </div>
                         <span className="text-sm font-bold text-gray-700 truncate max-w-[200px]">{file.name}</span>
                    </div>
                    <button onClick={() => setFile(null)} className="text-xs font-black text-red-500 uppercase tracking-widest">Remove</button>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className="w-full py-3.5 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-primary-dark transition-all disabled:bg-gray-200 disabled:shadow-none active:scale-95"
                >
                    {uploading ? 'Processing...' : 'Start Upload'}
                </button>
                <button className="w-full py-3.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                    <MdDownload size={18} />
                    Download Sample CSV
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
               <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center shadow-inner">
                    <MdCheckCircle size={40} />
               </div>
               <div>
                    <h3 className="text-xl font-bold text-gray-800">Upload Successful</h3>
                    <p className="text-sm text-gray-500 mt-1">Your collection is being updated</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CsvUpload;

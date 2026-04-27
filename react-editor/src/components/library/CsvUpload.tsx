import React, { useState } from 'react';
import { MdClose, MdCloudUpload, MdDownload, MdCheckCircle } from 'react-icons/md';

const CsvUpload: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    // Mock upload delay
    setTimeout(() => {
        setIsUploading(false);
        setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="p-6 border-b flex items-center justify-between bg-gray-50">
          <h2 className="text-xl font-black text-gray-800 uppercase tracking-widest">Bulk Operations</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full">
            <MdClose size={24} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
             <div>
                <h4 className="font-bold text-blue-900">Download Template</h4>
                <p className="text-xs text-blue-700">Download the CSV structure for this collection</p>
             </div>
             <button className="p-3 bg-white text-blue-600 rounded-xl shadow-sm hover:shadow-md transition-all">
                <MdDownload size={24} />
             </button>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-xs text-gray-400 uppercase tracking-widest">Upload CSV</h4>
            <div
                className="border-2 border-dashed border-gray-200 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors cursor-pointer bg-gray-50/50"
                onClick={() => document.getElementById('csvInput')?.click()}
            >
                <div className="p-4 bg-white rounded-2xl shadow-sm">
                    <MdCloudUpload size={32} className="text-primary" />
                </div>
                <div className="text-center">
                    <p className="font-bold text-gray-700">{file ? file.name : 'Select or drop CSV file'}</p>
                    <p className="text-xs text-gray-400 mt-1">Maximum size: 5MB</p>
                </div>
                <input
                    id="csvInput"
                    type="file"
                    accept=".csv"
                    hidden
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
            </div>
          </div>

          {isSuccess ? (
            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
                <MdCheckCircle size={24} />
                <span className="font-bold">Hierarchy updated successfully!</span>
            </div>
          ) : (
            <button
                disabled={!file || isUploading}
                onClick={handleUpload}
                className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:bg-primary-dark disabled:bg-gray-200 transition-all shadow-lg active:scale-95"
            >
                {isUploading ? 'Processing...' : 'Upload & Update'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CsvUpload;

import React, { useState, useEffect } from 'react';
import { MdClose, MdPersonAdd, MdDelete, MdSearch } from 'react-icons/md';

const CollaboratorModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const collaborators = [
    { id: '1', name: 'Amit Kumar', role: 'Reviewer', email: 'amit@example.com' },
    { id: '2', name: 'Sarah Jones', role: 'Editor', email: 'sarah@example.com' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-6 border-b flex items-center justify-between bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Manage Collaborators</h2>
            <p className="text-xs text-gray-500 mt-1">Add or remove people who can edit this collection</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <MdClose size={20} />
          </button>
        </div>

        <div className="p-6 border-b space-y-4">
          <div className="flex gap-3">
             <div className="flex-1 relative">
                <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search by name or email"
                    className="w-full pl-12 pr-4 py-3 border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <button className="px-6 bg-primary text-white rounded-2xl font-bold text-sm shadow-md hover:bg-primary-dark transition-all flex items-center gap-2">
                <MdPersonAdd size={18} />
                Add
             </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-3">
            {collaborators.map(person => (
              <div key={person.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-light text-primary font-black rounded-xl flex items-center justify-center text-lg shadow-inner">
                    {person.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{person.name}</h4>
                    <p className="text-xs text-gray-500">{person.email} • <span className="font-bold text-primary">{person.role}</span></p>
                  </div>
                </div>
                <button className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                  <MdDelete size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaboratorModal;

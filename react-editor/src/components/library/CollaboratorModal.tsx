import React, { useState } from 'react';
import { MdClose, MdPersonAdd, MdDelete, MdSearch } from 'react-icons/md';

const CollaboratorModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [collaborators, setCollaborators] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Owner' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Collaborator' },
  ]);

  const handleAdd = () => {
    if (email) {
      setCollaborators([...collaborators, {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        role: 'Collaborator'
      }]);
      setEmail('');
    }
  };

  const handleDelete = (id: string) => {
    setCollaborators(collaborators.filter(c => c.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="p-6 border-b flex items-center justify-between bg-gray-50">
          <h2 className="text-xl font-black text-gray-800 uppercase tracking-widest">Manage Collaborators</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full">
            <MdClose size={24} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
                <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="email"
                    placeholder="Enter email address..."
                    className="w-full pl-12 pr-4 py-3 border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button
                onClick={handleAdd}
                className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-all flex items-center gap-2 shadow-lg active:scale-95"
            >
                <MdPersonAdd size={20} />
                Add
            </button>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-xs text-gray-400 uppercase tracking-widest">Current Team</h4>
            <div className="divide-y border rounded-3xl overflow-hidden shadow-sm">
                {collaborators.map(person => (
                    <div key={person.id} className="p-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
                                {person.name[0]}
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">{person.name}</p>
                                <p className="text-xs text-gray-500">{person.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold px-3 py-1 bg-gray-100 rounded-full text-gray-600">
                                {person.role}
                            </span>
                            {person.role !== 'Owner' && (
                                <button
                                    onClick={() => handleDelete(person.id)}
                                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                >
                                    <MdDelete size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaboratorModal;

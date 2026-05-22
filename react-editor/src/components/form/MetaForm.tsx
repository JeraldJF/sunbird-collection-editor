import React, { useEffect, useState } from 'react';
import { useEditorState, updateNodeMetadata, setMode } from '../../store/editorStore';
import DynamicForm from './DynamicForm';
import type { FormField } from './DynamicForm';
import { MdImage, MdQrCode } from 'react-icons/md';
import AssetBrowser from '../library/AssetBrowser';

interface MetaFormProps {
  hideHeader?: boolean;
}

const MetaForm: React.FC<MetaFormProps> = ({ hideHeader = false }) => {
  const { selectedNode } = useEditorState();
  const [formConfig, setFormConfig] = useState<FormField[]>([]);
  const [showAssetBrowser, setShowAssetBrowser] = useState(false);

  useEffect(() => {
    const mockConfig: FormField[] = [
      { code: 'name', name: 'Title', inputType: 'text', editable: true, required: true, placeholder: 'Enter title' },
      { code: 'description', name: 'Description', inputType: 'textarea', editable: true, required: false, placeholder: 'Enter description' },
      { code: 'keywords', name: 'Keywords', inputType: 'text', editable: true, required: false, placeholder: 'Enter keywords' },
      { code: 'primaryCategory', name: 'Primary Category', inputType: 'select', editable: true, required: false, range: ['Digital Textbook', 'Course Assessment', 'Learning Resource'] },
      { code: 'board', name: 'Board/Syllabus', inputType: 'select', editable: true, required: false, range: ['CBSE', 'NCERT', 'State Board (Maharashtra)'] },
      { code: 'medium', name: 'Medium', inputType: 'select', editable: true, required: false, range: ['English', 'Hindi', 'Marathi'] },
      { code: 'gradeLevel', name: 'Class', inputType: 'select', editable: true, required: false, range: ['Class 1', 'Class 2', 'Class 3'] },
      { code: 'subject', name: 'Subject', inputType: 'select', editable: true, required: false, range: ['Mathematics', 'Science', 'English'] },
      { code: 'author', name: 'Author', inputType: 'text', editable: true, required: false, placeholder: 'Enter author name' },
      { code: 'license', name: 'License', inputType: 'select', editable: true, required: false, range: ['CC BY 4.0', 'CC BY-NC 4.0'] },
    ];
    setFormConfig(mockConfig);
  }, [selectedNode]);

  if (!selectedNode) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400 italic bg-gray-50 p-10 text-center">
        <div className="bg-white p-6 rounded-full shadow-sm mb-4">
             <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
             </svg>
        </div>
        <p className="text-lg font-medium">Select a node from the structure to edit its properties</p>
      </div>
    );
  }

  const defaultValues = {
    name: selectedNode.name,
    description: selectedNode.metadata?.description || '',
    keywords: selectedNode.metadata?.keywords || '',
    primaryCategory: selectedNode.metadata?.primaryCategory || (selectedNode.root ? 'Digital Textbook' : ''),
    board: selectedNode.metadata?.board || 'NCERT',
    medium: selectedNode.metadata?.medium || 'English',
    gradeLevel: selectedNode.metadata?.gradeLevel || 'Class 1',
    subject: selectedNode.metadata?.subject || 'Mathematics',
    author: selectedNode.metadata?.author || '',
    license: selectedNode.metadata?.license || 'CC BY 4.0',
  };

  const isCollection = selectedNode?.mimeType === 'application/vnd.ekstep.content-collection';

  return (
    <div className="flex-1 flex flex-col">
      {!hideHeader && (
          /* Top Header Bar */
          <div className="h-[64px] border-b flex items-center justify-between px-8 bg-white shrink-0">
            <h2 className="text-lg font-bold text-gray-800 truncate max-w-md">{selectedNode.name}</h2>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-gray-600 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer transition-colors">
                    <MdQrCode size={24} />
                    <span className="text-sm font-medium">QR Code</span>
                    <span className="text-xs">▼</span>
                </div>
                <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>
                <button className="px-6 py-2 border border-[#004a92] text-[#004a92] rounded font-medium hover:bg-blue-50 transition-colors">
                    Save as Draft
                </button>
                <button className="px-6 py-2 bg-[#004a92] text-white rounded font-medium hover:bg-[#003d7a] transition-colors">
                    Send for Review
                </button>
            </div>
          </div>
      )}

      <div className="flex-1 px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 max-w-6xl mx-auto">
             {/* Icon Section */}
             <div className="md:col-span-3">
                <label className="block text-[11px] font-bold text-gray-500 mb-3 uppercase tracking-wider">Content Icon</label>
                <div
                  onClick={() => setShowAssetBrowser(true)}
                  className="aspect-square w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#004a92] hover:bg-blue-50 transition-all text-gray-400 group relative overflow-hidden bg-white"
                >
                    {selectedNode.metadata?.appIcon ? (
                        <img src={selectedNode.metadata.appIcon} alt="Icon" className="w-full h-full object-cover" />
                    ) : (
                        <>
                            <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-white transition-colors border">
                                <MdImage size={32} className="text-gray-400 group-hover:text-[#004a92]" />
                            </div>
                            <span className="text-xs mt-3 font-bold group-hover:text-[#004a92] uppercase">Add Icon</span>
                        </>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                         <span className="text-white text-[10px] font-bold bg-[#004a92] px-3 py-1 rounded">CHANGE</span>
                    </div>
                </div>
                <p className="text-[10px] text-gray-400 mt-2 italic text-center">400x400px (1:1)</p>
             </div>

             <div className="md:col-span-9">
                <DynamicForm
                    key={selectedNode.id}
                    config={formConfig}
                    defaultValues={defaultValues}
                    onSubmit={(data) => updateNodeMetadata(selectedNode.id, data)}
                />
             </div>
        </div>
      </div>

      {!hideHeader && isCollection && (
          <div className="p-4 bg-[#f8fafc] border-t flex justify-end px-8 shrink-0">
                <button
                    onClick={() => setMode('library')}
                    className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 bg-white text-gray-700 rounded font-bold text-sm hover:bg-gray-50 transition-all shadow-sm"
                >
                    <span className="text-lg text-[#004a92]">+</span>
                    Add from library
                </button>
          </div>
      )}

      {showAssetBrowser && (
          <AssetBrowser
            onClose={() => setShowAssetBrowser(false)}
            onSelect={(url) => updateNodeMetadata(selectedNode.id, { appIcon: url })}
          />
      )}

    </div>
  );
};

export default MetaForm;

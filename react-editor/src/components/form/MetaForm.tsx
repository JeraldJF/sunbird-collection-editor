import React, { useEffect, useState } from 'react';
import { useEditorState, updateNodeMetadata } from '../../store/editorStore';
import DynamicForm from './DynamicForm';
import type { FormField } from './DynamicForm';
import { MdImage } from 'react-icons/md';
import AssetBrowser from '../library/AssetBrowser';

const MetaForm: React.FC = () => {
  const { selectedNode } = useEditorState();
  const [formConfig, setFormConfig] = useState<FormField[]>([]);
  const [showAssetBrowser, setShowAssetBrowser] = useState(false);

  useEffect(() => {
    const mockConfig: FormField[] = [
      { code: 'name', name: 'Title', inputType: 'text', editable: true, required: true, placeholder: 'Enter title' },
      { code: 'description', name: 'Description', inputType: 'textarea', editable: true, required: false, placeholder: 'Enter description for Course' },
      { code: 'keywords', name: 'Keywords', inputType: 'text', editable: true, required: false, placeholder: 'Enter Keywords' },
      { code: 'category', name: 'Category', inputType: 'select', editable: true, required: false, range: ['Course', 'Digital Textbook', 'Learning Resource'] },
      { code: 'additionalCategory', name: 'Additional Category', inputType: 'select', editable: true, required: false, range: ['Select Additional Category'] },
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
        <p className="text-lg">Select a node from the structure to edit its properties</p>
      </div>
    );
  }

  const defaultValues = {
    name: selectedNode.name,
    description: selectedNode.metadata?.description || '',
    keywords: selectedNode.metadata?.keywords || '',
    author: selectedNode.metadata?.author || '',
    license: selectedNode.metadata?.license || 'CC BY 4.0',
    copyright: selectedNode.metadata?.copyright || '',
  };

  return (
    <div className="flex-1 bg-white p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header Name */}
        <div className="mb-10 text-xl font-medium text-gray-700">
           {selectedNode.name}
        </div>
        <div className="space-y-6">
             {/* Icon Section */}
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <div
                  onClick={() => setShowAssetBrowser(true)}
                  className="w-32 h-32 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all text-gray-400"
                >
                    {selectedNode.metadata?.appIcon ? (
                        <img src={selectedNode.metadata.appIcon} alt="Icon" className="w-full h-full object-cover" />
                    ) : (
                        <>
                            <MdImage size={32} />
                            <span className="text-[11px] mt-2">Add an image</span>
                        </>
                    )}
                </div>
             </div>

             <DynamicForm
                key={selectedNode.id}
                config={formConfig}
                defaultValues={defaultValues}
                onSubmit={(data) => updateNodeMetadata(selectedNode.id, data)}
             />
        </div>
      </div>

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

import React, { useEffect, useState } from 'react';
import { useEditorState, updateNodeMetadata } from '../../store/editorStore';
import SunbirdPlayer from '../players/SunbirdPlayer';
import DynamicForm from './DynamicForm';
import type { FormField } from './DynamicForm';
import { MdQrCode2, MdCheckCircle, MdError, MdImage } from 'react-icons/md';
import AssetBrowser from '../library/AssetBrowser';

const MetaForm: React.FC = () => {
  const { selectedNode } = useEditorState();
  const [formConfig, setFormConfig] = useState<FormField[]>([]);
  const [dialCode, setDialCode] = useState('');
  const [dialStatus, setDialStatus] = useState<'idle' | 'validating' | 'success' | 'error'>('idle');
  const [showAssetBrowser, setShowAssetBrowser] = useState(false);

  useEffect(() => {
    const mockConfig: FormField[] = [
      { code: 'name', name: 'Title', inputType: 'text', editable: true, required: true, placeholder: 'Enter title' },
      { code: 'description', name: 'Description', inputType: 'textarea', editable: true, required: false, placeholder: 'Enter description' },
      { code: 'keywords', name: 'Keywords', inputType: 'text', editable: true, required: false, placeholder: 'e.g. math, science' },
      { code: 'author', name: 'Author', inputType: 'text', editable: true, required: false },
      { code: 'copyright', name: 'Copyright', inputType: 'text', editable: true, required: false },
      { code: 'license', name: 'License', inputType: 'select', editable: true, required: true, range: ['CC BY 4.0', 'CC BY-NC 4.0', 'CC BY-SA 4.0'] },
    ];
    setFormConfig(mockConfig);
    setDialCode(selectedNode?.metadata?.dialCode || '');
    setDialStatus('idle');
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

  const isCollection = selectedNode.mimeType === 'application/vnd.ekstep.content-collection';
  const isPdf = selectedNode.mimeType === 'application/pdf';
  const isRoot = selectedNode.root;

  const defaultValues = {
    name: selectedNode.name,
    description: selectedNode.metadata?.description || '',
    keywords: selectedNode.metadata?.keywords || '',
    author: selectedNode.metadata?.author || '',
    license: selectedNode.metadata?.license || 'CC BY 4.0',
    copyright: selectedNode.metadata?.copyright || '',
  };

  const handleDialUpdate = () => {
    setDialStatus('validating');
    setTimeout(() => {
        if (dialCode.length === 6) {
            setDialStatus('success');
            updateNodeMetadata(selectedNode.id, { dialCode });
        } else {
            setDialStatus('error');
        }
    }, 1000);
  };

  return (
    <div className="flex-1 bg-white p-8 overflow-auto">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Edit {isCollection ? 'Unit' : 'Content'}</h2>
                <p className="text-sm text-gray-500 mt-1">{selectedNode.primaryCategory}</p>
            </div>
            <div className="flex items-center gap-4">
                 <div className="text-xs font-mono bg-gray-100 px-3 py-1.5 rounded-lg text-gray-500 border shadow-sm">ID: {selectedNode.id}</div>
            </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          <div className="xl:col-span-7 order-2 xl:order-1 space-y-8">
             {/* Root specific actions: App Icon */}
             {isRoot && (
                 <div className="bg-gray-50 border rounded-3xl p-8 flex items-center justify-between shadow-sm border-gray-100">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-white rounded-2xl border shadow-inner flex items-center justify-center overflow-hidden ring-4 ring-gray-100">
                            {selectedNode.metadata?.appIcon ? (
                                <img src={selectedNode.metadata.appIcon} alt="App Icon" className="w-full h-full object-cover" />
                            ) : (
                                <MdImage size={40} className="text-gray-200" />
                            )}
                        </div>
                        <div>
                            <h3 className="font-black text-gray-800 uppercase tracking-widest text-sm">Collection Icon</h3>
                            <p className="text-xs text-gray-500 mt-1">Recommended size: 100x100px</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowAssetBrowser(true)}
                        className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-primary hover:bg-primary-light hover:border-primary transition-all shadow-sm active:scale-95"
                    >
                        Choose Icon
                    </button>
                 </div>
             )}

             {/* DIAL Code Section */}
             <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <MdQrCode2 size={120} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest text-primary-light mb-4">QR Code Integration</h3>
                <div className="flex flex-col md:flex-row gap-4 relative z-10">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Enter 6-digit DIAL Code"
                            className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-white placeholder-white/40 focus:ring-4 focus:ring-primary/30 focus:border-primary outline-none transition-all uppercase font-mono tracking-widest"
                            value={dialCode}
                            onChange={(e) => setDialCode(e.target.value)}
                            maxLength={6}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            {dialStatus === 'success' && <MdCheckCircle className="text-emerald-400" size={20} />}
                            {dialStatus === 'error' && <MdError className="text-red-400" size={20} />}
                        </div>
                    </div>
                    <button
                        onClick={handleDialUpdate}
                        disabled={dialStatus === 'validating'}
                        className="px-8 py-3 bg-white text-gray-900 rounded-2xl font-black uppercase tracking-widest hover:bg-primary-light transition-all shadow-lg active:scale-95 disabled:opacity-50"
                    >
                        {dialStatus === 'validating' ? 'Checking...' : 'Link QR'}
                    </button>
                </div>
                {dialStatus === 'error' && <p className="text-xs text-red-300 mt-2 font-bold">Invalid code. Must be 6 characters.</p>}
             </div>

             <DynamicForm
                key={selectedNode.id}
                config={formConfig}
                defaultValues={defaultValues}
                onSubmit={(data) => updateNodeMetadata(selectedNode.id, data)}
             />
          </div>

          <div className="xl:col-span-5 order-1 xl:order-2 flex flex-col gap-4">
            <div className="sticky top-4">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Live Preview</h3>
                <div className="aspect-video">
                    {!isCollection ? (
                        <SunbirdPlayer
                            playerElement={isPdf ? 'sunbird-pdf-player' : 'sunbird-video-player'}
                            playerConfig={{
                                context: { pdata: { id: 'sunbird.portal', ver: '1.0' } },
                                config: {},
                                metadata: selectedNode.metadata
                            }}
                        />
                    ) : (
                        <div className="w-full h-full bg-primary-light/20 border-2 border-dashed border-primary/20 rounded-2xl flex flex-col items-center justify-center text-primary gap-4 shadow-inner">
                            <div className="p-5 bg-white rounded-2xl shadow-sm text-primary ring-1 ring-primary/10">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <p className="font-black text-lg">Collection Unit</p>
                                <p className="text-sm opacity-60">Metadata only node</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
          </div>
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

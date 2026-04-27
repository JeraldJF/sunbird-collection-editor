import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEditorState, updateNodeMetadata } from '../../store/editorStore';
import SunbirdPlayer from '../players/SunbirdPlayer';

const schema = z.object({
  name: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  keywords: z.string().optional(),
  author: z.string().optional(),
  license: z.string().optional(),
  copyright: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const MetaForm: React.FC = () => {
  const { selectedNode } = useEditorState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: selectedNode?.name || '',
      description: selectedNode?.metadata?.description || '',
      keywords: selectedNode?.metadata?.keywords || '',
      author: selectedNode?.metadata?.author || '',
      license: selectedNode?.metadata?.license || 'CC BY 4.0',
      copyright: selectedNode?.metadata?.copyright || '',
    },
  });

  useEffect(() => {
    if (selectedNode) {
      reset({
        name: selectedNode.name,
        description: selectedNode.metadata?.description || '',
        keywords: selectedNode.metadata?.keywords || '',
        author: selectedNode.metadata?.author || '',
        license: selectedNode.metadata?.license || 'CC BY 4.0',
        copyright: selectedNode.metadata?.copyright || '',
      });
    }
  }, [selectedNode, reset]);

  const onSubmit = (data: FormData) => {
    if (selectedNode) {
      updateNodeMetadata(selectedNode.id, data);
    }
  };

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

  return (
    <div className="flex-1 bg-white p-8 overflow-auto">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Edit {isCollection ? 'Unit' : 'Content'}</h2>
                <p className="text-sm text-gray-500 mt-1">{selectedNode.primaryCategory}</p>
            </div>
            <div className="text-xs font-mono bg-gray-100 px-3 py-1.5 rounded-lg text-gray-500 border shadow-sm">ID: {selectedNode.id}</div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          {/* Left Column: Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 xl:col-span-7 order-2 xl:order-1">
            <div className="bg-white p-8 rounded-2xl border shadow-sm space-y-6">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b pb-2">Basic Information</h3>

                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register('name')}
                            className="w-full px-4 py-2.5 border rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                            placeholder="e.g. Introduction to Physics"
                        />
                        {errors.name && (
                            <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            {...register('description')}
                            rows={4}
                            className="w-full px-4 py-2.5 border rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none"
                            placeholder="Provide a brief overview..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Keywords
                        </label>
                        <input
                            {...register('keywords')}
                            className="w-full px-4 py-2.5 border rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                            placeholder="Separate with commas..."
                        />
                    </div>
                </div>

                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b pb-2 pt-4">Attribution & Legal</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Author
                        </label>
                        <input
                            {...register('author')}
                            className="w-full px-4 py-2.5 border rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Copyright
                        </label>
                        <input
                            {...register('copyright')}
                            className="w-full px-4 py-2.5 border rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                            placeholder="e.g. 2024 NCERT"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => reset()}
                className="px-6 py-3 border rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all active:scale-95"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={!isDirty}
                className="px-10 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95"
              >
                Update Metadata
              </button>
            </div>
          </form>

          {/* Right Column: Player Preview */}
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
    </div>
  );
};

export default MetaForm;

import { useEffect } from 'react';
import Header from './components/header/Header';
import SidebarTree from './components/tree/SidebarTree';
import MetaForm from './components/form/MetaForm';
import SunbirdPlayer from './components/players/SunbirdPlayer';
import Library from './components/library/Library';
import { useEditorState, setHierarchy, setConfig, setSelectedNode, setMode } from './store/editorStore';
import { MdPersonAdd, MdQrCode } from 'react-icons/md';
import { mockHierarchy } from './services/mockData';
import CollaboratorModal from './components/library/CollaboratorModal';
import { useState } from 'react';

function App() {
  const { hierarchy, selectedNode, mode } = useEditorState();
  const [showCollaborators, setShowCollaborators] = useState(false);

  useEffect(() => {
    setHierarchy(mockHierarchy);
    setSelectedNode(mockHierarchy);
    setConfig({
      context: {
        identifier: 'do_123',
        channel: 'sunbird',
        framework: 'ncert',
        user: { id: 'user_1', name: 'John Doe' }
      },
      config: {
        objectType: 'Collection',
        primaryCategory: 'Digital Textbook',
        mode: 'edit'
      }
    });
  }, []);

  if (!hierarchy) return <div className="p-10 text-center">Loading Editor...</div>;

  const isCollection = selectedNode?.mimeType === 'application/vnd.ekstep.content-collection';

  const getPlayerElement = (mimeType?: string) => {
    switch (mimeType) {
      case 'application/pdf':
        return 'sunbird-pdf-player';
      case 'video/mp4':
      case 'video/webm':
        return 'sunbird-video-player';
      case 'application/vnd.sunbird.questionset':
        return 'sunbird-quml-player';
      case 'application/epub+zip':
        return 'sunbird-epub-player';
      default:
        return 'sunbird-content-player';
    }
  };

  if (mode === 'library') {
    return <Library />;
  }

  return (
    <div className="flex flex-col h-screen bg-[#edf4f9] font-sans antialiased text-gray-900">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SidebarTree />
        <main className="flex-1 overflow-hidden bg-white border-l flex flex-col relative">
           {selectedNode && (
             <>
               {/* Fixed Header in Main Area */}
               <div className="h-[64px] border-b flex items-center justify-between px-8 bg-white shrink-0 shadow-sm z-10">
                <h2 className="text-lg font-bold text-gray-800 truncate max-w-md">{selectedNode.name}</h2>
                <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowCollaborators(true)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors" title="Collaborators"
                    >
                        <MdPersonAdd size={24} />
                    </button>
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

              <div className="flex-1 overflow-auto bg-[#f9fbff]">
                {!isCollection ? (
                   <div className="flex flex-col">
                      <div className="bg-white border-b flex items-center justify-center p-12 min-h-[500px]">
                        <div className="w-full h-full max-w-5xl shadow-2xl rounded overflow-hidden border">
                          <SunbirdPlayer
                              playerElement={getPlayerElement(selectedNode.mimeType)}
                              playerConfig={{
                                  context: {},
                                  config: {},
                                  metadata: {
                                    ...selectedNode,
                                    ...selectedNode.metadata
                                  }
                              }}
                          />
                        </div>
                      </div>
                      <div className="p-8 max-w-5xl mx-auto w-full">
                        <MetaForm hideHeader />
                      </div>
                   </div>
                ) : (
                  <div className="p-8 max-w-5xl mx-auto w-full">
                    <MetaForm hideHeader />
                  </div>
                )}
              </div>

              {/* Sticky Footer for Add from Library */}
              {isCollection && (
                <div className="p-3 bg-white border-t flex justify-end px-8 shrink-0">
                  <button
                      onClick={() => setMode('library')}
                      className="flex items-center gap-2 px-4 py-1.5 border border-gray-300 bg-white text-gray-600 rounded font-medium text-xs hover:bg-gray-50 transition-all shadow-sm"
                  >
                      <span className="text-lg text-[#004a92] font-bold">+</span>
                      Add from library
                  </button>
                </div>
              )}
             </>
           )}
           {!selectedNode && (
             <div className="flex-1 flex items-center justify-center text-gray-400 italic">
                Select a node to view or edit
             </div>
           )}
        </main>
      </div>
      {showCollaborators && (
          <CollaboratorModal onClose={() => setShowCollaborators(false)} />
      )}
    </div>
  );
}

export default App;

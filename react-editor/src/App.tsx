import { useEffect } from 'react';
import Header from './components/header/Header';
import SidebarTree from './components/tree/SidebarTree';
import MetaForm from './components/form/MetaForm';
import SunbirdPlayer from './components/players/SunbirdPlayer';
import Library from './components/library/Library';
import { useEditorState, setHierarchy, setConfig, setSelectedNode } from './store/editorStore';
import { mockHierarchy } from './services/mockData';

function App() {
  const { hierarchy, selectedNode, mode } = useEditorState();

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

  const isFolder = selectedNode?.children !== undefined;
  const isRoot = selectedNode?.root === true;

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
    <div className="flex flex-col h-screen bg-gray-50 font-sans antialiased text-gray-900">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SidebarTree />
        <main className="flex-1 overflow-hidden bg-white border-l flex flex-col">
          {!isFolder && !isRoot && selectedNode && (
            <div className="flex-1 overflow-auto p-4 border-b bg-gray-100">
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
          )}
          <div className="flex-1 overflow-auto">
            <MetaForm />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

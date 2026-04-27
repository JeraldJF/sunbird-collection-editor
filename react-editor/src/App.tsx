import { useEffect } from 'react';
import Header from './components/header/Header';
import SidebarTree from './components/tree/SidebarTree';
import MetaForm from './components/form/MetaForm';
import { useEditorState, setHierarchy, setConfig } from './store/editorStore';
import { mockHierarchy } from './services/mockData';

function App() {
  const { hierarchy } = useEditorState();

  useEffect(() => {
    setHierarchy(mockHierarchy);
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

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans antialiased text-gray-900">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SidebarTree />
        <main className="flex-1 overflow-auto bg-white border-l">
          <MetaForm />
        </main>
      </div>
    </div>
  );
}

export default App;

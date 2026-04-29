import React, { useEffect, useRef } from 'react';

interface PlayerProps {
  playerConfig: any;
  playerElement: string; // e.g. 'sunbird-pdf-player'
}

const SunbirdPlayer: React.FC<PlayerProps> = ({ playerConfig, playerElement }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // In a real environment, we'd ensure the web components are registered
      // and potentially use a more robust way to pass complex objects.
      const element = document.createElement(playerElement);

      // Use direct property assignment if the web component supports it,
      // otherwise fallback to attribute with stringified JSON.
      if ('playerConfig' in element) {
        (element as any).playerConfig = playerConfig;
      } else {
        element.setAttribute('player-config', JSON.stringify(playerConfig));
      }

      const handleEvent = (event: any) => {
        console.log(`${playerElement} event:`, event.detail || event);
      };

      element.addEventListener('playerEvent', handleEvent);
      element.addEventListener('telemetryEvent', handleEvent);

      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(element);

      return () => {
        element.removeEventListener('playerEvent', handleEvent);
        element.removeEventListener('telemetryEvent', handleEvent);
      };
    }
  }, [playerConfig, playerElement]);

  return (
    <div className="w-full h-full bg-slate-900 flex items-center justify-center rounded-xl overflow-hidden shadow-xl border border-slate-800">
      <div ref={containerRef} className="w-full h-full min-h-[400px] relative">
         {/* Web component will be mounted here */}
         <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-6 bg-slate-900">
            <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative p-6 bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl">
                    <svg className="w-16 h-16 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </div>
            <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-slate-200">Content Preview</h3>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-[0.2em]">{playerConfig?.metadata?.name || 'Loading Asset...'}</p>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] text-slate-600 font-mono">
                <span>ID: {playerConfig?.metadata?.identifier || 'TEMP_ID'}</span>
                <span>ELEMENT: {playerElement}</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SunbirdPlayer;

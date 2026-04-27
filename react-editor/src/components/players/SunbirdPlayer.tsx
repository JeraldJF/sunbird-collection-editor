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
    <div className="w-full h-full bg-gray-900 flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800 ring-8 ring-gray-50/50">
      <div ref={containerRef} className="w-full h-full min-h-[500px]">
         {/* Web component will be mounted here */}
         <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4 bg-gradient-to-b from-gray-800 to-gray-900">
            <div className="p-4 bg-gray-700/50 rounded-2xl animate-pulse">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
            </div>
            <div className="text-center">
                <p className="font-black uppercase tracking-widest text-xs opacity-40">Initializing Player</p>
                <p className="text-[10px] mt-1 opacity-30">{playerElement}</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SunbirdPlayer;

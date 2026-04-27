import React, { useEffect, useRef } from 'react';

interface PlayerProps {
  playerConfig: any;
  playerElement: string; // e.g. 'sunbird-pdf-player'
}

const SunbirdPlayer: React.FC<PlayerProps> = ({ playerConfig, playerElement }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const element = document.createElement(playerElement);
      element.setAttribute('player-config', JSON.stringify(playerConfig));

      element.addEventListener('playerEvent', (event: any) => {
        console.log(`${playerElement} event:`, event);
      });

      element.addEventListener('telemetryEvent', (event: any) => {
        console.log(`${playerElement} telemetry:`, event);
      });

      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(element);
    }
  }, [playerConfig, playerElement]);

  return (
    <div className="w-full h-full bg-gray-900 flex items-center justify-center rounded-lg overflow-hidden shadow-lg border-4 border-gray-800">
      <div ref={containerRef} className="w-full h-full min-h-[500px]">
         {/* Web component will be mounted here */}
         <div className="flex items-center justify-center h-full text-gray-400">
            <p>Player {playerElement} Placeholder (requires external scripts)</p>
         </div>
      </div>
    </div>
  );
};

export default SunbirdPlayer;

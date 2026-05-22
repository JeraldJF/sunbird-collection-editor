import React from 'react';
import { MdArrowBack } from 'react-icons/md';

const Header: React.FC = () => {

  return (
    <div className="flex flex-col w-full shadow-sm z-30">
      {/* Top Bar */}
      <div className="bg-[#004a92] px-6 py-2 flex items-center justify-between text-white">
        <button className="flex items-center gap-2 hover:bg-white/10 px-3 py-1 rounded transition-colors text-sm font-medium">
          <MdArrowBack size={18} />
          Back
        </button>
      </div>
    </div>
  );
};

export default Header;

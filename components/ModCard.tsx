
import React from 'react';
import { Link } from 'react-router-dom';
import { Download, ChevronRight } from 'lucide-react';
import { Mod } from '../types';

interface ModCardProps {
  mod: Mod;
}

export const ModCard: React.FC<ModCardProps> = ({ mod }) => {
  return (
    <div className="bg-[#2c1f16] border border-[#3d2b1f] rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl hover:border-amber-500/50 transition-all duration-500 group">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={mod.imageUrl} 
          alt={mod.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 shadow-xl">
            {mod.version}
          </span>
          <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 shadow-xl ${
            mod.loader === 'Forge' ? 'bg-orange-600/90' : 
            mod.loader === 'Fabric' ? 'bg-blue-600/90' : 'bg-purple-600/90'
          }`}>
            {mod.loader}
          </span>
        </div>
      </div>
      
      <div className="p-7">
        <h3 className="text-2xl font-black mb-3 group-hover:text-amber-400 transition-colors truncate italic tracking-tighter uppercase">
          {mod.name}
        </h3>
        <p className="text-zinc-400 text-sm font-medium line-clamp-2 mb-8 italic opacity-80 leading-relaxed">
          {mod.description}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a 
            href={mod.downloadUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-2xl transition-all active:scale-95 shadow-xl shadow-amber-500/10 uppercase italic text-xs tracking-tighter"
          >
            <Download size={18} /> {mod.buttonText || 'BAIXAR'}
          </a>
          <Link 
            to={`/mod/${mod.id}`}
            className="flex items-center justify-center gap-2 bg-[#1a120b] hover:bg-zinc-800 text-zinc-300 font-black py-4 rounded-2xl transition-all border border-[#3d2b1f] uppercase italic text-xs tracking-tighter"
          >
            DETALHES <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

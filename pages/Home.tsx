
import React from 'react';
import { ModCard } from '../components/ModCard';
import { useMods } from '../context/ModContext';
import { Sparkles, ArrowDown, Youtube, Loader2 } from 'lucide-react';

export const Home: React.FC = () => {
  const { mods, siteSettings, isLoading } = useMods();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-amber-500 gap-4">
        <Loader2 size={48} className="animate-spin" />
        <p className="font-black uppercase italic tracking-widest animate-pulse">Carregando mods do Chaouz...</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="text-center mb-16 pt-12 pb-16 rounded-[60px] bg-gradient-to-b from-[#3d2b1f] to-[#1a120b] border border-[#3d2b1f] shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative inline-block mb-10 z-10">
          <div className="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full border-4 border-amber-500 p-2 bg-zinc-900 shadow-2xl overflow-hidden group">
            <img 
              src={siteSettings.profileImage} 
              alt="Chaouz" 
              className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700 ease-out"
              onError={(e) => { e.currentTarget.src = 'https://i.pinimg.com/736x/8a/a5/63/8aa56306561e1b7f0e9b46e8c755359a.jpg'; }}
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-amber-500 text-black p-4 rounded-3xl shadow-2xl ring-8 ring-[#1a120b] animate-bounce">
            <Sparkles size={24} />
          </div>
        </div>
        
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase italic leading-[0.9]">
            FALA RAPAZIADA! <br/> <span className="text-amber-500">BEM-VINDOS!</span>
          </h1>
          <p className="text-zinc-400 max-w-3xl mx-auto px-6 text-xl md:text-2xl leading-relaxed font-bold italic opacity-90">
            "Aqui estão todos os mods que eu uso nos meus vídeos pra você baixar e testar também! Os Modpacks mais TOP pra você jogar Minecraft igualzinho a mim."
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a 
              href="https://www.tiktok.com/@_chaouz" 
              target="_blank" 
              className="bg-[#ff0050] text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-xl flex items-center gap-2"
            >
              ME SEGUE NO TIKTOK
            </a>
            <a 
              href="https://www.youtube.com/@chaouzy" 
              target="_blank" 
              className="bg-[#ff0000] text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-xl flex items-center gap-2"
            >
              <Youtube size={20} /> CANAL DO YOUTUBE
            </a>
          </div>
        </div>
        
        <div className="mt-16 flex justify-center items-center gap-4 text-amber-500/30 font-black uppercase tracking-[0.5em] text-[10px]">
          <span className="w-12 h-[1px] bg-amber-500/20"></span>
          <span>Bora ver os mods?</span>
          <ArrowDown size={14} className="animate-bounce" />
          <span className="w-12 h-[1px] bg-amber-500/20"></span>
        </div>
      </section>

      <section>
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 px-4 gap-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter italic flex items-center gap-4">
            <span className="w-4 h-12 bg-amber-500 rounded-xl shadow-lg shadow-amber-500/20"></span>
            Mods & Modpacks
          </h2>
          <div className="flex gap-4">
            <span className="bg-[#2c1f16] px-6 py-3 rounded-2xl text-[10px] font-black text-amber-500 border border-[#3d2b1f] shadow-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              TEMOS {mods.length} MODS INSANOS
            </span>
          </div>
        </div>
        
        {mods.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {mods.map(mod => (
              <ModCard key={mod.id} mod={mod} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-[#2c1f16] rounded-[40px] border-4 border-dashed border-[#3d2b1f] shadow-inner">
            <p className="text-zinc-500 text-xl font-black italic uppercase tracking-widest">Tô preparando mais novidade pra vocês!</p>
          </div>
        )}
      </section>

      <section className="mt-32 p-12 md:p-20 rounded-[60px] bg-amber-500 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-[0_35px_60px_-15px_rgba(245,158,11,0.3)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none group-hover:scale-125 transition-transform duration-[30s]">
          <img src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200" alt="bg" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 text-center lg:text-left">
          <h3 className="text-black text-5xl md:text-6xl font-black mb-6 tracking-tighter italic leading-none uppercase">Nunca usou mods?</h3>
          <p className="text-amber-950 font-black text-xl md:text-2xl opacity-90 max-w-2xl">Fica tranquilo! Fiz um guia rapidão pra você aprender a instalar tudo sem fritar seu PC.</p>
        </div>
        <a 
          href="#/como-instalar"
          className="relative z-10 bg-black text-white px-12 py-8 rounded-[32px] font-black text-2xl hover:scale-110 hover:-rotate-2 transition-all active:scale-95 shadow-2xl hover:shadow-black/50 uppercase italic tracking-tighter"
        >
          ME ENSINA AÍ!
        </a>
      </section>
    </div>
  );
};

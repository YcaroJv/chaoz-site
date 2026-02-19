
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMods } from '../context/ModContext';
import { ArrowLeft, Download, ShieldCheck, Info } from 'lucide-react';

export const ModDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMod } = useMods();
  
  const mod = id ? getMod(id) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!mod) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Mod não encontrado!</h2>
        <Link to="/" className="text-amber-500 underline">Voltar para a home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-500 pb-20">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-zinc-500 hover:text-amber-500 mb-8 transition-colors font-black uppercase text-[10px] tracking-[0.3em] bg-[#2c1f16] px-6 py-3 rounded-full border border-[#3d2b1f]"
      >
        <ArrowLeft size={16} /> VOLTAR PARA A LISTA
      </button>

      <div className="bg-[#2c1f16] border border-[#3d2b1f] rounded-[48px] overflow-hidden shadow-2xl relative">
        <div className="relative h-64 md:h-[500px]">
          <img 
            src={mod.imageUrl} 
            alt={mod.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2c1f16] via-[#2c1f16]/20 to-transparent"></div>
          <div className="absolute bottom-10 left-10 right-10">
            <div className="flex flex-wrap gap-3 mb-4">
               <span className="bg-amber-500 text-black px-4 py-1.5 rounded-xl text-[10px] font-black uppercase shadow-xl tracking-widest">
                MINE {mod.version}
              </span>
              <span className="bg-zinc-900/80 backdrop-blur-md text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase border border-white/10 shadow-xl tracking-widest">
                LOADER: {mod.loader}
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter drop-shadow-2xl uppercase italic leading-none">
              {mod.name}
            </h1>
          </div>
        </div>

        <div className="p-10 md:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3 uppercase italic tracking-tighter">
                <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
                POR QUE ESSE MOD?
              </h2>
              <p className="text-zinc-400 leading-relaxed text-xl font-bold italic opacity-90">
                {mod.description}
              </p>
              
              <div className="mt-12 p-8 bg-zinc-900/50 rounded-[32px] border border-white/5 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="text-green-500" size={28} />
                  </div>
                  <div>
                    <p className="font-black text-white uppercase italic tracking-tighter">Verificado pelo Chaouz</p>
                    <p className="text-zinc-500 text-sm font-bold">Mod testado, sem vírus e funcionando 100%.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-[#3d2b1f] p-8 rounded-[40px] border border-[#5d4037] shadow-xl">
                <h3 className="font-black mb-6 text-center uppercase tracking-[0.3em] text-[10px] text-amber-500/50">Downloads</h3>
                <a 
                  href={mod.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-black font-black py-6 rounded-[24px] transition-all shadow-xl shadow-amber-500/10 mb-4 uppercase italic tracking-tighter text-lg"
                >
                  <Download size={24} /> {mod.buttonText || 'BAIXAR AGORA'}
                </a>
                <Link 
                  to="/como-instalar"
                  className="flex items-center justify-center gap-2 bg-zinc-800/80 hover:bg-zinc-800 text-zinc-400 hover:text-white font-black py-5 rounded-[24px] transition-all border border-white/5 uppercase italic text-xs tracking-widest"
                >
                  <Info size={18} /> COMO INSTALAR
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

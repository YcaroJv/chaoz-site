
import React from 'react';
import { useMods } from '../context/ModContext';
import { CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';

export const InstallationGuide: React.FC = () => {
  const { siteSettings } = useMods();

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase italic">
          COMO INSTALAR <span className="text-amber-500">SEM ERRO</span>
        </h1>
        <p className="text-zinc-400 text-lg font-bold italic">
          "Segue esse passo a passo que eu preparei pra você deixar seu Minecraft IGUAL ao meu. É facinho!"
        </p>
      </div>

      <div className="space-y-12">
        {siteSettings.installSteps.map((step, index) => (
          <div key={index} className="relative flex flex-col md:flex-row gap-8 items-start group">
            <div className="flex-shrink-0 w-16 h-16 bg-amber-500 text-black flex items-center justify-center rounded-2xl font-black text-3xl shadow-xl z-10 group-hover:scale-110 transition-transform italic">
              {index + 1}
            </div>
            
            <div className="flex-grow bg-[#2c1f16] border border-[#3d2b1f] p-6 md:p-8 rounded-[32px] shadow-xl transition-all hover:border-amber-500/30">
              <h3 className="text-2xl font-black mb-3 text-amber-500 uppercase italic">{step.title}</h3>
              <p className="text-zinc-300 mb-6 text-lg leading-relaxed font-medium italic opacity-80">
                {step.description}
              </p>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-inner h-64">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                />
              </div>
            </div>

            {index < siteSettings.installSteps.length - 1 && (
              <div className="hidden md:block absolute left-8 top-16 bottom-0 w-1 border-l-4 border-dashed border-[#3d2b1f] -z-0"></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-20 space-y-6">
        <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-[32px] flex gap-6 items-center">
          <AlertTriangle className="text-red-500 flex-shrink-0" size={40} />
          <div>
            <h4 className="text-red-500 font-black uppercase text-lg mb-1 italic">SE LIGA NO AVISO!</h4>
            <p className="text-zinc-400 font-bold italic">Pelo amor de Deus, não mistura mod de Fabric com mod de Forge na mesma pasta! O jogo vai crashar e você vai ficar com raiva. Escolha um lado e seja feliz!</p>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 p-8 rounded-[32px] flex gap-6 items-center">
          <CheckCircle2 className="text-blue-500 flex-shrink-0" size={40} />
          <div>
            <h4 className="text-blue-500 font-black uppercase text-lg mb-1 italic">DICA DE OURO</h4>
            <p className="text-zinc-400 font-bold italic">Sempre que puder, usa o mod <strong>Sodium</strong> ou o <strong>Embeddium</strong>. Eles dão aquele boost nervoso no FPS pra você poder gravar seus próprios vídeos também!</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-24 pb-16">
        <p className="text-zinc-500 mb-8 font-black uppercase italic tracking-widest">Tudo pronto? Então bora baixar os mods!</p>
        <a 
          href="#/"
          className="inline-flex items-center gap-4 bg-amber-500 text-black px-12 py-6 rounded-[32px] font-black text-2xl hover:bg-amber-400 hover:scale-105 transition-all active:scale-95 shadow-2xl shadow-amber-500/20 uppercase italic tracking-tighter"
        >
          QUERO MEUS MODS <ChevronRight size={32} />
        </a>
      </div>
    </div>
  );
};

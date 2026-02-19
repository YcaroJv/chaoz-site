
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, MessageCircle, Lock, LogOut, Youtube } from 'lucide-react';
import { useMods } from '../context/ModContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { siteSettings } = useMods();
  const isAdmin = localStorage.getItem('chaouz_auth') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('chaouz_auth');
    navigate('/');
    window.location.reload();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-[#1a120b] text-zinc-100 selection:bg-amber-500 selection:text-black">
      <header className="sticky top-0 z-50 bg-[#3d2b1f]/95 backdrop-blur-md border-b border-[#5d4037] shadow-xl">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-[#1a120b] flex items-center justify-center overflow-hidden border-2 border-amber-500 shadow-2xl transition-transform group-hover:rotate-12 duration-300">
              <img 
                src={siteSettings.profileImage} 
                alt="Chaouz Logo" 
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/pig/100/100'; }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter uppercase leading-none italic">
                Chaouz<span className="text-amber-500">Mods</span>
              </span>
              <span className="text-[9px] text-zinc-400 font-black tracking-[0.2em] uppercase mt-1">Official Gaming Hub</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className={`transition-all font-black uppercase text-xs tracking-widest flex items-center gap-2 ${isActive('/') ? 'text-amber-500' : 'text-zinc-400 hover:text-white'}`}>
              <Home size={16} /> Início
            </Link>
            <Link to="/como-instalar" className={`transition-all font-black uppercase text-xs tracking-widest flex items-center gap-2 ${isActive('/como-instalar') ? 'text-amber-500' : 'text-zinc-400 hover:text-white'}`}>
              <BookOpen size={16} /> Como Instalar
            </Link>
            {isAdmin && (
              <Link to="/admin" className={`transition-all font-black uppercase text-xs tracking-widest flex items-center gap-2 px-4 py-2 rounded-xl ${isActive('/admin') ? 'bg-amber-500 text-black' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500 hover:text-black'}`}>
                <Lock size={14} /> Painel Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
             <a 
              href="https://www.youtube.com/@chaouzy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex bg-red-600 text-white px-5 py-3 rounded-2xl text-[10px] font-black hover:bg-red-500 transition-all items-center gap-2 shadow-xl active:scale-95 italic tracking-tighter"
            >
              <Youtube size={14} /> YOUTUBE
            </a>
            <a 
              href="https://www.tiktok.com/@_chaouz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-3 rounded-2xl text-[10px] font-black hover:bg-amber-400 transition-all flex items-center gap-2 shadow-xl active:scale-95 italic tracking-tighter"
            >
              <MessageCircle size={14} /> TIKTOK
            </a>
            {isAdmin && (
              <button onClick={handleLogout} className="text-zinc-500 hover:text-red-400 transition-colors p-2 bg-zinc-900 rounded-xl border border-white/5">
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-[#120c07] border-t border-[#3d2b1f] py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-10">
             <div className="w-20 h-20 rounded-full overflow-hidden grayscale opacity-30 border-2 border-zinc-700">
                <img src={siteSettings.profileImage} alt="Footer Logo" className="w-full h-full object-cover" />
             </div>
          </div>
          
          <div className="mb-10">
            <h4 className="text-white font-black italic mb-4 uppercase tracking-tighter text-lg">Vem ver esses mods em ação!</h4>
            <div className="flex justify-center gap-4">
               <a href="https://www.tiktok.com/@_chaouz" className="text-zinc-400 hover:text-white transition-all flex items-center gap-2 font-bold uppercase text-xs tracking-widest">
                TikTok
              </a>
               <span className="text-zinc-800">•</span>
               <a href="https://www.youtube.com/@chaouzy" className="text-zinc-400 hover:text-white transition-all flex items-center gap-2 font-bold uppercase text-xs tracking-widest">
                YouTube
              </a>
            </div>
          </div>

          <p className="text-zinc-600 text-[10px] font-black mb-10 tracking-[0.2em] uppercase max-w-xl mx-auto leading-relaxed">
            Feito com carinho pelo Chaouz pra comunidade mais braba do Mine. © {new Date().getFullYear()}
          </p>
          
          <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black uppercase tracking-[0.3em]">
            <Link to="/" className="text-zinc-600 hover:text-amber-500 transition-colors">Início</Link>
            <Link to="/como-instalar" className="text-zinc-600 hover:text-amber-500 transition-colors">Tutorial</Link>
            <Link to="/login" className="text-zinc-800 hover:text-zinc-600 transition-colors flex items-center gap-2">
              <Lock size={10} /> Admin Login
            </Link>
          </div>
        </div>
      </footer>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 bg-[#3d2b1f]/90 backdrop-blur-xl border border-[#5d4037] rounded-3xl flex justify-around py-4 z-50 shadow-2xl">
        <Link to="/" className={`flex flex-col items-center transition-colors ${isActive('/') ? 'text-amber-500' : 'text-zinc-500'}`}>
          <Home size={22} />
        </Link>
        <Link to="/como-instalar" className={`flex flex-col items-center transition-colors ${isActive('/como-instalar') ? 'text-amber-500' : 'text-zinc-500'}`}>
          <BookOpen size={22} />
        </Link>
        {isAdmin && (
          <Link to="/admin" className={`flex flex-col items-center transition-colors ${isActive('/admin') ? 'text-amber-500' : 'text-zinc-500'}`}>
            <Lock size={22} />
          </Link>
        )}
      </nav>
      <div className="md:hidden h-24"></div>
    </div>
  );
};

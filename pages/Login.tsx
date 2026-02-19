
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Key, AlertCircle } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Credenciais solicitadas: chaouz6767@gmail.com / 6767chaouz7676
    if (email === 'chaouz6767@gmail.com' && password === '6767chaouz7676') {
      localStorage.setItem('chaouz_auth', 'true');
      navigate('/admin');
      window.location.reload();
    } else {
      setError('E-mail ou senha incorretos.');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#2c1f16] border border-[#3d2b1f] p-8 rounded-[32px] shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/20">
            <Lock className="text-black" size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tight uppercase">Área do Admin</h1>
          <p className="text-zinc-500 mt-2 text-sm font-medium">Acesso restrito para o Chaouz</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2 ml-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1a120b] border border-[#3d2b1f] rounded-2xl py-4 pl-12 pr-4 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all outline-none font-bold"
                placeholder="exemplo@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2 ml-1">Senha</label>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1a120b] border border-[#3d2b1f] rounded-2xl py-4 pl-12 pr-4 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all outline-none font-bold"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl text-sm font-bold border border-red-400/20">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-2xl shadow-xl shadow-amber-500/10 transition-all active:scale-95 uppercase tracking-widest text-sm"
          >
            Entrar no Painel
          </button>
        </form>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMods } from '../context/ModContext';
import { Mod } from '../types';
import { Plus, Edit2, Trash2, Save, X, Upload, Check, User as UserIcon, BookOpen, Layout as LayoutIcon, Loader2, AlertCircle, CloudCheck, Globe, Wifi, WifiOff, RefreshCw } from 'lucide-react';

export const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { mods, addMod, updateMod, deleteMod, siteSettings, updateSiteSettings, isLoading, setIsEditing, lastSynced, syncStatus } = useMods();
  const [editingMod, setEditingMod] = useState<Partial<Mod> | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [showSettings, setShowSettings] = useState(false);
  const [tempProfileImg, setTempProfileImg] = useState(siteSettings.profileImage);
  const [tempSteps, setTempSteps] = useState([...siteSettings.installSteps]);

  useEffect(() => {
    const auth = localStorage.getItem('chaouz_auth');
    if (auth !== 'true') navigate('/login');
  }, [navigate]);

  useEffect(() => {
    setIsEditing(showSettings || !!editingMod);
  }, [showSettings, editingMod, setIsEditing]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'mod' | 'profile' | number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 100 * 1024) {
      alert("ARQUIVO REJEITADO! Este arquivo tem mais de 100KB. O servidor não vai aceitar e os outros usuários não verão a mudança. Use um LINK de imagem em vez de subir o arquivo.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      if (type === 'image') setEditingMod(prev => ({ ...prev, imageUrl: base64 }));
      else if (type === 'mod') setEditingMod(prev => ({ ...prev, downloadUrl: base64, isLocalFile: true }));
      else if (type === 'profile') setTempProfileImg(base64);
      else if (typeof type === 'number') {
        const newSteps = [...tempSteps];
        newSteps[type].image = base64;
        setTempSteps(newSteps);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveMod = async () => {
    if (!editingMod?.name) return alert('Dê um nome ao mod!');
    setIsSaving(true);
    const modData = {
      ...editingMod,
      id: editingMod.id || Date.now().toString(),
      loader: editingMod.loader || 'Forge',
      version: editingMod.version || '1.20.1',
      imageUrl: editingMod.imageUrl || 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800',
      downloadUrl: editingMod.downloadUrl || '#'
    } as Mod;

    if (isAdding) await addMod(modData);
    else await updateMod(modData);
    
    setEditingMod(null);
    setIsAdding(false);
    setIsSaving(false);
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-amber-500 font-black italic">CARREGANDO BANCO DE DADOS...</div>;

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4 pt-10">
      <div className="bg-[#2c1f16] p-10 rounded-[48px] border border-[#3d2b1f] shadow-2xl mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">Portal <span className="text-amber-500">Chaouz</span></h1>
            <div className="flex items-center gap-4 mt-4">
              {syncStatus === 'synced' ? (
                <span className="bg-green-500/10 text-green-500 text-[10px] font-black uppercase px-4 py-2 rounded-full border border-green-500/20 flex items-center gap-2">
                  <CloudCheck size={14} /> PUBLICADO PARA TODOS
                </span>
              ) : syncStatus === 'error' ? (
                <span className="bg-red-500/10 text-red-500 text-[10px] font-black uppercase px-4 py-2 rounded-full border border-red-500/20 flex items-center gap-2">
                  <AlertCircle size={14} /> ERRO: Ninguém verá suas mudanças!
                </span>
              ) : (
                <span className="bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase px-4 py-2 rounded-full border border-amber-500/20 flex items-center gap-2">
                  <RefreshCw size={14} className="animate-spin" /> SINCRONIZANDO...
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setShowSettings(true)} className="bg-zinc-800 text-white px-8 py-4 rounded-2xl font-black text-xs hover:bg-zinc-700 transition-all">CONFIGURAR SITE</button>
            <button onClick={() => { setIsAdding(true); setEditingMod({}); }} className="bg-amber-500 text-black px-10 py-4 rounded-2xl font-black text-xs hover:bg-amber-400 transition-all">NOVO MODPACK</button>
          </div>
        </div>
        
        {syncStatus === 'error' && (
          <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl">
            <p className="text-red-400 text-xs font-bold italic">
              Ocorreu um erro ao salvar na nuvem. Provavelmente você subiu uma imagem pesada demais. 
              Remova a imagem que você subiu por último e use um LINK (URL) da internet no lugar.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {mods.map(mod => (
          <div key={mod.id} className="bg-[#2c1f16] border border-[#3d2b1f] p-8 rounded-[40px] flex flex-col md:flex-row items-center gap-8 group hover:border-amber-500/40 transition-all">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-black flex-shrink-0">
              <img src={mod.imageUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="" />
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter">{mod.name} <span className="text-amber-500 text-sm ml-2">{mod.version}</span></h3>
              <p className="text-zinc-500 text-sm italic line-clamp-1">{mod.description}</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => { setIsAdding(false); setEditingMod(mod); }} className="p-4 rounded-2xl bg-zinc-800 text-white hover:bg-amber-500 hover:text-black transition-all"><Edit2 size={20} /></button>
              <button onClick={() => { if(confirm('Apagar modpack?')) deleteMod(mod.id); }} className="p-4 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={20} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Modais de Edição (Mesma estrutura, mas integrados com ModContext aprimorado) */}
      {(editingMod || showSettings) && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-[#2c1f16] w-full max-w-2xl rounded-[40px] border border-[#3d2b1f] p-10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black uppercase italic">Configurações</h2>
              <button onClick={() => { setEditingMod(null); setShowSettings(false); }} className="p-2 bg-zinc-800 rounded-full"><X /></button>
            </div>

            {editingMod && (
              <div className="space-y-6">
                <input 
                  className="w-full bg-[#1a120b] border border-[#3d2b1f] rounded-2xl p-4 font-bold outline-none focus:border-amber-500" 
                  placeholder="Nome do Mod" 
                  value={editingMod.name || ''} 
                  onChange={e => setEditingMod({...editingMod, name: e.target.value})}
                />
                <textarea 
                  className="w-full bg-[#1a120b] border border-[#3d2b1f] rounded-2xl p-4 font-bold outline-none focus:border-amber-500 h-32" 
                  placeholder="Descrição..." 
                  value={editingMod.description || ''} 
                  onChange={e => setEditingMod({...editingMod, description: e.target.value})}
                />
                <input 
                  className="w-full bg-[#1a120b] border border-[#3d2b1f] rounded-2xl p-4 font-bold outline-none focus:border-amber-500" 
                  placeholder="Link da Capa (RECOMENDADO)" 
                  value={editingMod.imageUrl && !editingMod.imageUrl.startsWith('data:') ? editingMod.imageUrl : ''} 
                  onChange={e => setEditingMod({...editingMod, imageUrl: e.target.value})}
                />
                <div className="flex gap-4">
                  <label className="flex-1 bg-zinc-800 p-4 rounded-2xl text-center font-black cursor-pointer hover:bg-amber-500 hover:text-black transition-all">
                    SUBIR FOTO (MAX 100KB)
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleFileChange(e, 'image')} />
                  </label>
                </div>
                <button 
                  onClick={handleSaveMod}
                  className="w-full bg-amber-500 text-black py-6 rounded-3xl font-black uppercase italic text-lg shadow-xl"
                >
                  PUBLICAR AGORA
                </button>
              </div>
            )}

            {showSettings && (
              <div className="space-y-6">
                <div className="bg-[#1a120b] p-6 rounded-3xl border border-[#3d2b1f]">
                  <h3 className="font-black mb-4">Avatar Principal</h3>
                  <input 
                    className="w-full bg-[#2c1f16] border border-[#3d2b1f] rounded-xl p-3 text-xs mb-4" 
                    placeholder="Link do Avatar..." 
                    value={tempProfileImg.startsWith('data:') ? '' : tempProfileImg} 
                    onChange={e => setTempProfileImg(e.target.value)}
                  />
                  <label className="block bg-zinc-800 p-4 rounded-xl text-center font-black text-xs cursor-pointer">
                    TROCAR FOTO
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleFileChange(e, 'profile')} />
                  </label>
                </div>
                <button 
                  onClick={async () => {
                    setIsSaving(true);
                    await updateSiteSettings({ profileImage: tempProfileImg, installSteps: tempSteps });
                    setIsSaving(false);
                    setShowSettings(false);
                  }}
                  className="w-full bg-amber-500 text-black py-6 rounded-3xl font-black uppercase italic"
                >
                  SALVAR TUDO
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
